import { Box } from "@mui/material";
import { MachineStatusDisplay } from "../components/machine/MachineStatusDisplay";
import { useMachineTelemetry } from "../hooks/useMachineTelemetry";
import { MachineOee } from "../components/machine/MachineOee.tsx";
import {useMachineMetrics} from "../hooks/useMachineMetrics.ts";

const Dashboard = () => {
    const {machine, downtimeEvents} = useMachineTelemetry();
    
    const metrics = useMachineMetrics(machine, downtimeEvents);
    
    return (
        <Box sx={{ display: "flex",  flex: 1, p: "0.75rem" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <MachineStatusDisplay machine={machine} />
                <MachineOee metrics={metrics} />
            </Box>
        </Box>
    );
};

export default Dashboard;