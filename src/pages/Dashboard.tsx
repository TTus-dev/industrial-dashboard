import { Box } from "@mui/material";
import { MachineStatusDisplay } from "../components/machine/MachineStatusDisplay";
import { useMachineTelemetry } from "../hooks/useMachineTelemetry";
import { MachineOee } from "../components/machine/MachineOee.tsx";
import { useMachineMetrics } from "../hooks/useMachineMetrics.ts";
import {TemperatureSection} from "../components/machine/TemperatureCard.tsx";

const Dashboard = () => {
    const {machine, downtimeEvents} = useMachineTelemetry();
    
    const metrics = useMachineMetrics(machine, downtimeEvents);
    
    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", p: "0.75rem", height: "100%", gap: "1rem" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                    <MachineStatusDisplay machine={machine} />
                </Box>
                <Box sx={{ flex: 2 }}>
                    <MachineOee metrics={metrics} />
                </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
                <TemperatureSection history={machine.temperatureHistory} />
            </Box>
        </Box>
    );
};

export default Dashboard;