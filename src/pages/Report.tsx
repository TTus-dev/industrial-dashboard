import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { DateFilters } from "../components/filters/DateFilters";
import { ReportPieChart } from "../components/report/ReportPieChart";
import { useTelemetry } from "../context/TelemetryContext";
import { calculateAvailability, calculateDowntimeStats } from "../utils/reportCalculation";
import { Bar, Line } from "react-chartjs-2";
import { formatTime24WithSeconds, normalizeMinute } from "../utils/DateFormatter";
import { DowntimeTable } from "../components/report/DowntimeTable";
import type { DowntimeEvent } from "../types/event";
import { DowntimeDurationChart } from "../components/report/DowntimeDurationChart";

const Report = () => {
    const theme = useTheme();
    
    const [from, setFrom] = useState<Date>(() => {
        const date = new Date(Date.now() - 60 * 60 * 1000);
        return normalizeMinute(date);
    });
    const [to, setTo] = useState<Date>(() => {
        const date = new Date();
        return normalizeMinute(date);
    });

    const prepareDowntimeEvents = (
        events: DowntimeEvent[],
        from: Date,
        to: Date
    ) => {
        return events
            .filter(event =>
                event.startTime <= to &&
                (!event.endTime || event.endTime >= from)
            )
            .map(event => ({
                ...event,
                startTime: event.startTime < from
                    ? from
                    : event.startTime,

                endTime: event.endTime && event.endTime > to
                    ? to
                    : event.endTime,
            }));
    };
    
    const { machine, history } = useTelemetry()

    const [reportData, setReportData] = useState(() => ({
        machine: structuredClone(machine),

        downtimeEvents: prepareDowntimeEvents(
            history.downtimeEvents,
            from,
            to
        ),

        temperatureHistory: structuredClone(
            history.temperatureHistory.filter(
                point => point.time >= from && point.time <= to
            )
        ),

        reportTime: new Date()
    }));

    const availability = calculateAvailability(
        reportData.machine,
        reportData.downtimeEvents,
        from,
        to,
        reportData.reportTime
    );

    const downtimeStats = calculateDowntimeStats(
        reportData.downtimeEvents,
        from,
        to,
        reportData.reportTime
    );
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                height: "100%",
                width: "100%",
            }}
        >
            <DateFilters
                from={from}
                to={to}
                onApply={(newFrom, newTo) => {
                    if (newFrom > newTo) {
                        return;
                    }

                    setReportData({
                        machine: structuredClone(machine),

                        downtimeEvents: prepareDowntimeEvents(
                            history.downtimeEvents,
                            newFrom,
                            newTo
                        ),

                        temperatureHistory: structuredClone(
                            history.temperatureHistory.filter(
                                point => point.time >= newFrom && point.time <= newTo
                            )
                        ),

                        reportTime: new Date()
                    });

                    setFrom(newFrom);
                    setTo(newTo);
                }}
            />
            
            <Box sx={{ display: "flex", flex: 1.2, gap: 2, maxWidth: "100%" }}>
                {/* Overview */}
                <Paper sx={{ display: "flex", flex: 1, flexDirection: "column", p: 2, gap: 1 }}>
                    <Typography variant="h5">Summary</Typography>
                    <ReportPieChart
                        availability={availability}
                        colorArray={['green', 'red']}
                    />
                </Paper>

                {/* Temperature */}
                <Paper sx={{ display: "flex", flex: 1.5, flexDirection: "column", gap: 1, p: 2, minWidth: 0, minHeight: 0 }}>
                    <Typography variant="h5">Temperature History</Typography>
                    <Box sx={{ display: "flex", flex: 1 }}>
                        <Line
                            data={{
                                labels: reportData.temperatureHistory.map(
                                    point => formatTime24WithSeconds(point.time)
                                ),
                                datasets: [
                                    {
                                        label: "Temperature",
                                        data: reportData.temperatureHistory.map(point => point.value),
                                        borderColor: "red",
                                        pointBackgroundColor: "red",
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false,
                                animation: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: theme.palette.text.secondary,
                                        },
                                        grid: {
                                            color: theme.palette.divider,
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: theme.palette.text.secondary,
                                        },
                                        grid: {
                                            color: theme.palette.divider,
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                </Paper>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    gap: 2,
                    minHeight: 0,
                    minWidth: 0,
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flex: 1.5,
                        flexDirection: "column",
                        px: 3,
                        py: 2,
                        minWidth: 0,
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h6">Longest Reasons</Typography>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            minHeight: 0,
                            position: "relative",
                        }}
                    >
                        <DowntimeDurationChart data={downtimeStats.byReasonDuration}/>
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        display: "flex",
                        flex: 1.5,
                        flexDirection: "column",
                        px: 3,
                        py: 2,
                        minWidth: 0,
                        minHeight: 0,
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h6">Most Occurences</Typography>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            minHeight: 0,
                            position: "relative",
                        }}
                    >
                        <Bar
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: theme.palette.text.secondary,
                                        },
                                        grid: {
                                            color: theme.palette.divider,
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: theme.palette.text.secondary,
                                        },
                                        grid: {
                                            color: theme.palette.divider,
                                        },
                                    },
                                },
                            }}
                            data={{
                                labels: downtimeStats.byReasonCount.map(
                                    item => item.reason
                                ),
                                datasets: [
                                    {
                                        label: "Occurrences",
                                        data: downtimeStats.byReasonCount.map(
                                            item => item.count
                                        ),
                                        backgroundColor: theme.palette.primary.main
                                    }
                                ]
                            }}
                        />
                    </Box>
                </Paper>
            </Box>

            {/* Event History */}
            <Paper
                sx={{
                    display: "flex",
                    flex: 1.5,
                    flexDirection: "column",
                    gap: 2,
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                <Typography sx={{ m: 2 }}>Event History</Typography>
                <DowntimeTable
                    events={reportData.downtimeEvents}
                    endOfReport={to}
                    reportTime={reportData.reportTime}
                />
            </Paper>
        </Box>
    );
};

export default Report;