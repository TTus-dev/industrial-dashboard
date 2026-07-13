import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";
import type { DowntimeEvent } from "../../types/event";
import { formatDuration } from "../../utils/DateFormatter";
import type { Machine } from "../../types/machine";

interface ReportPieChartProps {
    machine: Machine;
    events: DowntimeEvent[];
    colorArray: string[];
    from: Date;
    to: Date;
    reportTime: Date;
}

export const ReportPieChart = ({
                                   machine,
                                   events,
                                   from,
                                   to, 
                                   reportTime,
                                   colorArray}: ReportPieChartProps) => {

    const actualFrom = Math.max(
        from.getTime(),
        machine.startedAt.getTime()
    );

    const actualTo = Math.min(
        to.getTime(),
        reportTime.getTime()
    );

    const totalTime = Math.max(
        actualTo - actualFrom,
        0
    );

    const downtime = events.reduce((total, event) => {
        const downtimeStart = Math.max(
            event.startTime.getTime(),
            actualFrom
        );

        const downtimeEnd = Math.min(
            (event.endTime?.getTime() ?? to.getTime()),
            actualTo
        );

        return total + Math.max(
            downtimeEnd - downtimeStart,
            0
        );
    }, 0);

    const running = Math.max(totalTime - downtime, 0);

    const runningPercentage = totalTime > 0 ? (running / totalTime) * 100 : 0;

    const downtimePercentage = totalTime > 0 ? (downtime / totalTime) * 100 : 0;

    const data = {
        labels: [
            "Running",
            "Downtime",
        ],
        datasets: [
            {
                data: [
                    runningPercentage,
                    downtimePercentage,
                ],
                backgroundColor: colorArray
            },
        ],
    };

    return (
        <Box sx={{ display: "flex", flex: 1, gap: "5rem", p: 2 }}>
            <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Box>
                    {totalTime > 0 ? (
                        <Pie
                            data={data}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value = context.raw as number;
                                                return `${context.label}: ${value.toFixed(1)}%`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <Box sx={{}}>
                            No machine data available for selected period
                        </Box>
                    )}
                </Box>
            </Box>
            <Box sx={{ 
                display: "flex", 
                flex: 1.5, 
                flexDirection: "column", 
                justifyContent: "space-around",
                fontSize: "1.5rem",
                padding: "1rem",
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Total:
                    </Box>
                    <Box>
                        {formatDuration(totalTime)}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Running:
                    </Box>
                    <Box>
                        {formatDuration(running)}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Downtime:
                    </Box>
                    <Box>
                        {formatDuration(downtime)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};