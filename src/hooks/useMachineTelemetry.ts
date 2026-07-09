import { useEffect, useRef, useState } from "react";
import { getMachine } from "../services/machineService";
import type {Machine, MachineStatus} from "../types/machine";
import type { DowntimeEvent } from "../types/event";

const OK_PROBABILITY = 0.8;
const FAILURE_CHANCE = 0.001;
const RECOVERY_CHANCE = 0.3;

export const useMachineTelemetry = () => {
    const [machine, setMachine] = useState<Machine>(() => getMachine());
    const [downtimeEvents, setDowntimeEvents] = useState<DowntimeEvent[]>([]);

    const previousStatus = useRef<MachineStatus>(machine.status);

    useEffect(() => {
        const interval = setInterval(() => {
            const isOk = Math.random() < OK_PROBABILITY;
            const shouldFail = Math.random() < FAILURE_CHANCE;

            setMachine(previous => {
                const nextStatus =
                    previous.status === "stopped"
                        ? Math.random() < RECOVERY_CHANCE
                            ? "running"
                            : "stopped"
                        : shouldFail
                            ? "stopped"
                            : "running";

                if (
                    previousStatus.current === "running" &&
                    nextStatus === "stopped"
                ) {
                    setDowntimeEvents(events => [
                        ...events,
                        {
                            id: events.length > 0
                                ? events[events.length - 1].id + 1
                                : 1,
                            machineId: previous.id,
                            startTime: new Date(),
                        },
                    ]);
                }

                else if (
                    previousStatus.current === "stopped" &&
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

                previousStatus.current = nextStatus;
                
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

    return {
        machine,
        downtimeEvents,
    };
};