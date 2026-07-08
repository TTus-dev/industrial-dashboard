import {Box, Paper} from "@mui/material";
import type { MachineMetrics } from "../../types/metrics";

interface MachineOeeProps {
    metrics: MachineMetrics;
}

export const MachineOee = ({metrics} : MachineOeeProps) => {
    return (
        <Paper sx={{ display: "flex", flexDirection: "row", gap: "1rem", p: "0.75rem", }}>
            Gauge
            <Box sx={{ gap: "1rem" }}>
                <Box>Availability {(metrics.availability * 100).toFixed(1)}%</Box>
                <Box>Performance {(metrics.performance * 100).toFixed(1)}%</Box>
                <Box>Quality {(metrics.quality * 100).toFixed(1)}%</Box>
            </Box>
        </Paper>
    )
}
