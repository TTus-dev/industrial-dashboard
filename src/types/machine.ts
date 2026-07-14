import type { DowntimeEvent } from "./event.ts";

export type MachineStatus = "running" | "stopped";


export interface TemperaturePoint {
    time: Date;
    value: number;
}

export interface Machine {
    id: number;
    name: string;
    status: MachineStatus;
    temperature: number;
    okCount: number;
    nokCount: number;
    targetCount: number;
    startedAt: Date;
    idealCycleTimeMs: number;
}

export interface MachineHistory {
    id: number;
    temperatureHistory: TemperaturePoint[];
    downtimeEvents: DowntimeEvent[];
}