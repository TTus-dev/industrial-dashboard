import { Pie } from "react-chartjs-2";
import { Box } from "@mui/material";
import { formatDuration } from "../../utils/DateFormatter";

interface ReportPieChartProps {
    availability: {
        totalTime: number;
        downtime: number;
        running: number;
        runningPercentage: number;
        downtimePercentage: number;
    }
    colorArray: string[];
}

export const ReportPieChart = ({
                                   availability,
                                   colorArray}: ReportPieChartProps) => {
    
    const { totalTime, downtime, running, runningPercentage, downtimePercentage } = availability;

    const data = {
        labels: ["Running", "Downtime"],
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
        <Box sx={{ display: "flex", flex: 1, gap: "5rem" }}>
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
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Total Operating Time:
                    </Box>
                    <Box>
                        {formatDuration(totalTime)}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Active Production:
                    </Box>
                    <Box>
                        {formatDuration(running)}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        Downtimes:
                    </Box>
                    <Box>
                        {formatDuration(downtime)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};