export type DowntimeReason =
    | "maintenance"
    | "material"
    | "operator" 
    | "failure"
    | "unknown";

export interface DowntimeEvent {
    id: number;
    machineId: number;
    startTime: Date;
    endTime?: Date;
    reason?: DowntimeReason;
    comment?: string;
}