import { useEffect, useRef, useState } from "react";
import { getMachine, getMachineHistory } from "../services/machineService";
import type {Machine, MachineHistory} from "../types/machine";
import type { DowntimeEvent, DowntimeReason } from "../types/event";

const OK_PROBABILITY = 0.8;
const FAILURE_CHANCE = 0.02;
const RECOVERY_CHANCE = 0.3;

export const useMachineSimulation = () => {
    const [machine, setMachine] = useState<Machine>(() => getMachine());
    const [history, setHistory] = useState<MachineHistory>(() => getMachineHistory());
    
    const [activeDowntime, setActiveDowntime] = useState<DowntimeEvent | null>(null);
    const activeDowntimeRef = useRef<DowntimeEvent | null>(null);
    const reportedDowntimeRef = useRef(true);
    const nextDowntimeId = useRef(1);

    useEffect(() => {
        const interval = setInterval(() => {
            const isOk = Math.random() < OK_PROBABILITY;
            const shouldFail = Math.random() < FAILURE_CHANCE;

            setMachine(previous => {
                const nextStatus =
                    previous.status === "stopped"
                        ? Math.random() < RECOVERY_CHANCE && reportedDowntimeRef.current
                            ? "running"
                            : "stopped"
                        : shouldFail
                            ? "stopped"
                            : "running";

                if (
                    previous.status === "running" &&
                    nextStatus === "stopped" &&
                    !activeDowntimeRef.current
                ) {
                    const event: DowntimeEvent = {
                        id: nextDowntimeId.current++,
                        startTime: new Date(),
                        reason: "unknown",
                        temperature: previous.temperature,
                    };

                    activeDowntimeRef.current = event;
                    reportedDowntimeRef.current = false;
                    setActiveDowntime(event);

                    setHistory(previous => ({
                        ...previous,
                        downtimeEvents: [...previous.downtimeEvents, event]
                    }))
                }

                else if (
                    previous.status === "stopped" &&
                    nextStatus === "running"
                ) {
                    setHistory(previous => ({
                        ...previous,
                        downtimeEvents: previous.downtimeEvents.map(event => 
                            event.id === activeDowntimeRef.current?.id
                            ? {
                            ...event,
                                endTime: new Date()
                            } : event
                        )
                    }))
                    
                    activeDowntimeRef.current = null
                }
                
                const newTemperature = Math.min(
                    Math.max(previous.temperature + (Math.random() - 0.5) * 2, 0), 100
                )
                
                setHistory(previous => ({
                    ...previous,
                    temperatureHistory: [
                        ...previous.temperatureHistory,
                        {
                            time: new Date(),
                            value: newTemperature
                        }
                    ]
                }))

                return {
                    ...previous,
                    temperature: newTemperature,
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
        if (!activeDowntimeRef.current) return;

        setHistory(previous => ({
            ...previous,
            downtimeEvents: previous.downtimeEvents.map(event =>
                event.id === activeDowntimeRef.current?.id
                    ? {
                        ...event,
                        reason,
                        comment,
                        reportTime: new Date(),
                    }
                    : event
            )
        }))

        reportedDowntimeRef.current = true;
        setActiveDowntime(null);
    };

    return {
        machine,
        history,
        activeDowntime,
        reportDowntime,
    };
};