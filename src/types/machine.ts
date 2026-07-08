export type MachineStatus = "running" | "stopped";

export interface Machine {
    id: number;
    name: string;
    status: MachineStatus;
    temperature: number;
    okCount: number;
    nokCount: number;
    targetCount: number;
    startedAt: Date;
    idealCycleTime: number;
}