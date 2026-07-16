import type { DowntimeEvent } from "./event";

export interface DowntimeStats {
    byReasonDuration: {
        reason: string;
        duration: number;
    }[];

    byReasonCount: {
        reason: string;
        count: number;
    }[];

    timeline: {
        event: DowntimeEvent;
        duration: number;
    }[];
}