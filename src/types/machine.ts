export type MachineStatus = "running" | "warning" | "stopped";

export interface Machine {
    id: number;
    name: string;
    status: MachineStatus;
    temperature: number;
    productionCount: number;
    targetCount: number;
}