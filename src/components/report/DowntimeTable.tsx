import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, TableSortLabel,
} from "@mui/material";
import type { DowntimeEvent } from "../../types/event";
import { formatTime24WithSeconds } from "../../utils/DateFormatter";
import { useState } from "react";

interface Props {
    events: DowntimeEvent[];
    reportTime: Date;
    endOfReport: Date;
}

type SortColumn =
    | keyof DowntimeEvent
    | "duration";

export const DowntimeTable = ({ events, reportTime, endOfReport }: Props) => {
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [orderBy, setOrderBy] = useState<SortColumn>("startTime");

    const getDuration = (event: DowntimeEvent) => {
        const end =
            event.endTime?.getTime()
            ?? Math.min(reportTime.getTime(), endOfReport.getTime());

        return end - event.startTime.getTime();
    };
    
    const formatDuration = (event: DowntimeEvent) => {
        const end = event.endTime?.getTime() ?? Math.min(reportTime.getTime(), endOfReport.getTime());

        const seconds = Math.round(
            (end - event.startTime.getTime()) / 1000
        );

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}m ${remainingSeconds}s`;
    };

    const sortedEvents = [...events].sort((a, b) => {
        // special case: ongoing events
        if (orderBy === "endTime") {
            const aValue = a.endTime?.getTime() ?? Infinity;
            const bValue = b.endTime?.getTime() ?? Infinity;

            return order === "asc"
                ? aValue - bValue
                : bValue - aValue;
        }

        let aValue;
        let bValue;

        if (orderBy === "duration") {
            aValue = getDuration(a);
            bValue = getDuration(b);
        } else {
            aValue = a[orderBy];
            bValue = b[orderBy];
        }

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (typeof aValue === "number" && typeof bValue === "number") {
            return order === "asc"
                ? aValue - bValue
                : bValue - aValue;
        }

        if (aValue instanceof Date && bValue instanceof Date) {
            return order === "asc"
                ? aValue.getTime() - bValue.getTime()
                : bValue.getTime() - aValue.getTime();
        }

        return order === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
    });

    const handleSort = (property: SortColumn) => {
        const isAsc = orderBy === property && order === "asc";

        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    return (
        <TableContainer sx={{ flex: 1, overflow: "auto" }} component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel 
                                active={orderBy === "startTime"} 
                                direction={orderBy === "startTime" ? order : "asc"} 
                                onClick={() => handleSort("startTime")}
                            >
                                Start
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel 
                                active={orderBy === "endTime"}
                                direction={orderBy === "endTime" ? order : "asc"}
                                onClick={() => handleSort("endTime")}
                            >
                                End
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "duration"}
                                direction={orderBy === "duration" ? order : "asc"}
                                onClick={() => handleSort("duration")}
                            >
                                Duration
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel 
                                active={orderBy === "reason"} 
                                direction={orderBy === "reason" ? order : "asc"} 
                                onClick={() => handleSort("reason")}
                            >
                                Reason
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "temperature"}
                                direction={orderBy === "temperature" ? order : "asc"}
                                onClick={() => handleSort("temperature")}
                            >
                                Temperature
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Comment</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedEvents.map(event => (
                        <TableRow key={event.id}>
                            <TableCell>
                                {formatTime24WithSeconds(event.startTime)}
                            </TableCell>

                            <TableCell>
                                {event.endTime
                                    ? event.endTime.toLocaleTimeString()
                                    : "Ongoing"}
                            </TableCell>

                            <TableCell>
                                {formatDuration(event)}
                            </TableCell>

                            <TableCell>
                                {event.reason ?? "unknown"}
                            </TableCell>

                            <TableCell>
                                {event.temperature?.toFixed(1) ?? "-"} C
                            </TableCell>

                            <TableCell>
                                {event.comment ?? "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};