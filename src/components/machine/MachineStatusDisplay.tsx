import { Box, capitalize, Paper, Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";
import type { Machine, MachineStatus } from "../../types/machine.ts";

interface MachineStatusProps {
    machine: Machine;
}

const getStatusColor = (status: MachineStatus) => {
    switch(status) {
        case "running":
            return "green";
        case "stopped":
            return "red";
        default:
            return "grey";
    }
};

export const MachineStatusDisplay = ({machine} : MachineStatusProps) => {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", p: "2rem", height: "100%"}}>
            <Typography variant="h3">
                {machine.name}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", fontSize: "1.5rem", mt: "0.5rem", gap: "1rem" }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    Status:
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Circle sx={{ color: getStatusColor(machine.status) }}/>
                        {capitalize(machine.status)}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    Target:
                    <Box>
                        {machine.targetCount}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    OK:
                    <Box>
                        {machine.okCount}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    NOK:
                    <Box>
                        {machine.nokCount}
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}