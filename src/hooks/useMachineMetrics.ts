import type { Machine } from "../types/machine";
import type { DowntimeEvent } from "../types/event";
import type { MachineMetrics } from "../types/metrics";

export const useMachineMetrics = (
    machine: Machine,
    downtimeEvents: DowntimeEvent[]
): MachineMetrics => {

    const now = new Date();

    const plannedTime =
        now.getTime() - machine.startedAt.getTime();

    const downtime = downtimeEvents.reduce((total, event) => {
        const end = event.endTime ?? now;

        return total + (end.getTime() - event.startTime.getTime());
    }, 0);

    const operatingTime = plannedTime - downtime;

    const availability =
        plannedTime > 0
            ? operatingTime / plannedTime
            : 1;

    const totalCount = machine.okCount + machine.nokCount;

    const quality =
        totalCount > 0
            ? machine.okCount / totalCount
            : 0;
    
    const performance =
        operatingTime > 0
            ? (machine.idealCycleTimeMs * totalCount) / operatingTime
            : 0;

    return {
        availability,
        performance,
        quality,
        oee: availability * performance * quality,
    };
};