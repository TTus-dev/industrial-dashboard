import { Box } from "@mui/material";
import { MachineStatusDisplay } from "../components/machine/MachineStatusDisplay";
import { MachineOee } from "../components/machine/MachineOee";
import { useMachineMetrics } from "../hooks/useMachineMetrics";
import { TemperatureSection } from "../components/machine/TemperatureCard";
import { useTelemetry } from "../context/TelemetryContext";
import { DowntimeDialog } from "../dialogs/DowntimeDialog";
import type { DowntimeReason } from "../types/event";

const Dashboard = () => {
    const { machine, history, activeDowntime, reportDowntime } = useTelemetry();
    
    const metrics = useMachineMetrics(machine, history.downtimeEvents);

    const handleDowntimeReport = (
        reason: DowntimeReason,
        comment: string
    ) => {
        reportDowntime(reason, comment);
    };
    
    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "column", p: "0.75rem", height: "100%", gap: "1rem" }}>
            <DowntimeDialog open={activeDowntime !== null} event={activeDowntime} onSubmit={handleDowntimeReport} />
            <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <Box sx={{ flex: 1 }}>
                    <MachineStatusDisplay machine={machine} />
                </Box>
                <Box sx={{ flex: 2, minWidth: 0, minHeight: 0 }}>
                    <MachineOee metrics={metrics} />
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                minHeight: 0,
                gap: "1rem"
            }}>
                <TemperatureSection history={history.temperatureHistory.slice(-100)} />
            </Box>
        </Box>
    );
};

export default Dashboard;