import { Line } from "react-chartjs-2"
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { formatTime24WithSeconds } from "../../utils/DateFormatter";
import type { TemperaturePoint } from "../../types/machine";

interface TemperatureSectionProps {
    history: TemperaturePoint[];
}

export const TemperatureSection = ({ history }: TemperatureSectionProps) => {
    const theme = useTheme();
    
    const data = {
        labels: history.map(point => formatTime24WithSeconds(point.time)),
        datasets: [
            {
                label: "Temperature",
                data: history.map(point => point.value),
                borderColor: "red",
                pointBackgroundColor: "red",
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        animation: false as const,
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
    };

    return (
        <Paper sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            p: "2rem",
            minHeight: 0,
            overflow: "hidden",
        }}
        >
            <Typography variant="h4">
                Temperature
            </Typography>

            <Box sx={{ flex: 1, minHeight: 0 }}>
                <Line data={data} options={options} />
            </Box>
        </Paper>
    );
};