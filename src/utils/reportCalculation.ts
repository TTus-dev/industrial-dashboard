import type { Machine } from "../types/machine";
import type { DowntimeEvent } from "../types/event";
import type { DowntimeStats } from "../types/report";

export const calculateAvailability = (
    machine: Machine,
    events: DowntimeEvent[],
    from: Date,
    to: Date,
    reportTime: Date,
) => {
    const actualFrom = Math.max(
        from.getTime(),
        machine.startedAt.getTime()
    );

    const actualTo = Math.min(
        to.getTime(),
        reportTime.getTime()
    );

    const totalTime = Math.max(
        actualTo - actualFrom,
        0
    );

    const downtime = events.reduce((total, event) => {
        const downtimeStart = Math.max(
            event.startTime.getTime(),
            actualFrom
        );

        const downtimeEnd = Math.min(
            event.endTime?.getTime() ?? reportTime.getTime(),
            actualTo
        );

        return total + Math.max(
            downtimeEnd - downtimeStart,
            0
        );
    }, 0);

    const running = Math.max(totalTime - downtime, 0);

    return {
        totalTime,
        downtime,
        running,
        runningPercentage: totalTime > 0
            ? (running / totalTime) * 100
            : 0,
        downtimePercentage: totalTime > 0
            ? (downtime / totalTime) * 100
            : 0,
    };
};

export const calculateDowntimeStats = (
    events: DowntimeEvent[],
    from: Date,
    to: Date,
    reportTime: Date,
): DowntimeStats => {

    const actualTo = Math.min(
        to.getTime(),
        reportTime.getTime()
    );

    const timeline = events
        .map(event => {
            const start = Math.max(
                event.startTime.getTime(),
                from.getTime()
            );

            const end = Math.min(
                event.endTime?.getTime() ?? actualTo,
                actualTo
            );

            return {
                event,
                duration: Math.max(end - start, 0)
            };
        })
        .filter(item => item.duration > 0);


    const durationMap = timeline.reduce((map, item) => {
        const reason = item.event.reason ?? "unknown";

        map.set(
            reason,
            (map.get(reason) ?? 0) + item.duration
        );

        return map;
    }, new Map<string, number>());


    const byReasonDuration = Array.from(durationMap.entries())
        .map(([reason, duration]) => ({
            reason,
            duration
        }))
        .sort((a, b) => b.duration - a.duration);


    const countMap = timeline.reduce((map, item) => {
        const reason = item.event.reason ?? "unknown";

        map.set(
            reason,
            (map.get(reason) ?? 0) + 1
        );

        return map;
    }, new Map<string, number>());


    const byReasonCount = Array.from(countMap.entries())
        .map(([reason, count]) => ({
            reason,
            count
        }))
        .sort((a, b) => b.count - a.count);


    return {
        byReasonDuration,
        byReasonCount,
        timeline
    };
};