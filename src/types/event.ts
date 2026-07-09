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
    reportTime?: Date;
    reason?: DowntimeReason;
    comment?: string;
}