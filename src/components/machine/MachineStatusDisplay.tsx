import {Box, capitalize, Paper, Typography} from "@mui/material";
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
        <Paper sx={{ p: "0.75rem" }}>
            <Typography variant="h3">
                {machine.name}
            </Typography>
            <Box sx={{ fontSize: "1.5rem", mt: "0.5rem" }}>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    Status:
                    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Circle sx={{ color: getStatusColor(machine.status) }}/>
                        {capitalize(machine.status)}
                    </Box>
                </Box>
                { /* same here seperate containers */ }
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    Target:
                    <Box>
                        {machine.targetCount}
                    </Box>
                </Box>
                { /* same here seperate containers */ }
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    OK:
                    <Box>
                        {machine.okCount}
                    </Box>
                </Box>
                { /* same here seperate containers */ }
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