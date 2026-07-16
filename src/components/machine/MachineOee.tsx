import { Box, Paper, useTheme } from "@mui/material";
import type { MachineMetrics } from "../../types/metrics";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

interface MachineOeeProps {
    metrics: MachineMetrics;
}

export const MachineOee = ({metrics} : MachineOeeProps) => {
    const theme = useTheme();
    
    const doughnutOptions = {
        events: [],
        plugins: {
            tooltip: {
                enabled: false,
            }
        }
    }
    
    const doughnutData = useMemo(() => ({
        labels: [],
        datasets: [
            {
                data: [
                    metrics.oee,
                    1 - metrics.oee,
                ],
                backgroundColor: [
                    theme.palette.primary.main,
                    theme.palette.primary.light,
                ],
            },
        ],
        
    }), [metrics.oee]);
    
    return (
        <Paper sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-evenly",
            minWidth: 0,
            minHeight: 0,
            overflow: "hidden",
        }}>
            <Box
                sx={{
                    position: "relative",
                    width: "clamp(150px, 15vw, 250px)",
                    aspectRatio: "1 / 1",
                    flexShrink: 0,
                }}
            >
                <Doughnut
                    data={doughnutData}
                    options={{
                        ...doughnutOptions,
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                    }}
                >
                    <Box>OEE</Box>
                    <Box>{(metrics.oee * 100).toFixed(1)}%</Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "2rem", 
                justifyContent: "space-around", textAlign: "center", p: "3rem" }}
            >
                <Box>
                    <Box>Availability</Box>
                    <Box>{(metrics.availability * 100).toFixed(1)}%</Box>
                </Box>
                <Box>
                    <Box>Performance</Box>
                    <Box>{(metrics.performance * 100).toFixed(1)}%</Box>
                </Box>
                <Box>
                    <Box>Quality</Box>
                    <Box>{(metrics.quality * 100).toFixed(1)}%</Box>
                </Box>
            </Box>
        </Paper>
    )
}
