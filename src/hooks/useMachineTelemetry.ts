import {useEffect, useRef, useState} from "react";
import { getMachine } from "../services/machineService";
import type { Machine } from "../types/machine";
import type { DowntimeEvent, DowntimeReason } from "../types/event";

const OK_PROBABILITY = 0.8;
const FAILURE_CHANCE = 0.02;
const RECOVERY_CHANCE = 0.3;

export const useMachineTelemetry = () => {
    const [machine, setMachine] = useState<Machine>(() => getMachine());
    const [downtimeEvents, setDowntimeEvents] = useState<DowntimeEvent[]>([]);
    const [activeDowntime, setActiveDowntime] = useState<DowntimeEvent | null>(null);
    const activeDowntimeFlag = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const isOk = Math.random() < OK_PROBABILITY;
            const shouldFail = Math.random() < FAILURE_CHANCE;

            setMachine(previous => {
                const nextStatus =
                    previous.status === "stopped"
                        ? Math.random() < RECOVERY_CHANCE && !activeDowntimeFlag.current
                            ? "running"
                            : "stopped"
                        : shouldFail
                            ? "stopped"
                            : "running";

                if (
                    previous.status === "running" &&
                    nextStatus === "stopped"
                ) {
                    setDowntimeEvents(events => {
                        const event: DowntimeEvent = {
                            id: events.length > 0
                                ? events[events.length - 1].id + 1
                                : 1,
                            machineId: previous.id,
                            startTime: new Date(),
                        };

                        setActiveDowntime(event);
                        activeDowntimeFlag.current = true

                        return [
                            ...events,
                            event,
                        ];
                    });
                }

                else if (
                    previous.status === "stopped" &&
                    nextStatus === "running"
                ) {
                    setDowntimeEvents(events => {
                        const lastEvent = events[events.length - 1];

                        if (!lastEvent || lastEvent.endTime) {
                            return events;
                        }

                        return [
                            ...events.slice(0, -1),
                            {
                                ...lastEvent,
                                endTime: new Date(),
                            },
                        ];
                    });
                }
                
                const newTemperature = Math.min(
                    Math.max(previous.temperature + (Math.random() - 0.5) * 2, 0), 100
                )

                return {
                    ...previous,
                    temperature: newTemperature,
                    temperatureHistory: [
                        ...previous.temperatureHistory,
                        {
                            time: new Date(),
                            value: newTemperature
                        }].slice(-100),
                    okCount:
                        nextStatus === "running" && isOk
                            ? previous.okCount + 1
                            : previous.okCount,
                    nokCount:
                        nextStatus === "running" && !isOk
                            ? previous.nokCount + 1
                            : previous.nokCount,
                    status: nextStatus,
                };
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const reportDowntime = (
        reason: DowntimeReason,
        comment: string
    ) => {
        if (!activeDowntime) return;

        setDowntimeEvents(events =>
            events.map(event =>
                event.id === activeDowntime.id
                    ? {
                        ...event,
                        reason,
                        comment,
                        reportTime: new Date(),
                    }
                    : event
            )
        );

        setActiveDowntime(null);
        activeDowntimeFlag.current = false;
    };

    return {
        machine,
        downtimeEvents,
        activeDowntime,
        reportDowntime,
    };
};