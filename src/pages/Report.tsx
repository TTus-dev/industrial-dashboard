import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { DateFilters } from "../components/filters/DateFilters.tsx";
import { ReportPieChart } from "../components/report/ReportPieChart.tsx";
import { useTelemetry } from "../context/TelemetryContext.tsx";

const Report = () => {
    const [from, setFrom] = useState<Date>(new Date(Date.now() - 60 * 60 * 1000));
    const [to, setTo] = useState<Date>(new Date());
    
    const { machine, history } = useTelemetry()

    const [reportData, setReportData] = useState(() => ({
        machine: structuredClone(machine),
        downtimeEvents: structuredClone(history.downtimeEvents),
        reportTime: new Date()
    }));
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 2,
                height: "100%",
            }}
        >
            <DateFilters
                from={from}
                to={to}
                onApply={(newFrom, newTo) => {
                    if (newFrom > newTo) {
                        return;
                    }

                    setReportData({
                        machine: structuredClone(machine),
                        downtimeEvents: structuredClone(history.downtimeEvents),
                        reportTime: new Date()
                    });

                    setFrom(newFrom);
                    setTo(newTo);
                }}
            />
            
            {/* Overview */}
            <Box sx={{ display: "flex", flex: 1.75, gap: 2 }}>
                <Paper sx={{ display: "flex", flex: 1 }}>
                    <ReportPieChart
                        machine={reportData.machine}
                        events={reportData.downtimeEvents}
                        from={from}
                        to={to}
                        reportTime={reportData.reportTime}
                        colorArray={['green', 'red']}
                    />
                </Paper>

                <Paper sx={{ flex: 2, p: 2 }}>
                    Longest / Most common chart
                </Paper>
            </Box>

            {/* Temperature */}
            <Paper sx={{ display: "flex", flex: 2, p: 2, height: 350 }}>
                Temperature history
            </Paper>

            {/* Timeline */}
            <Paper sx={{ p: 2, height: 140 }}>
                Timeline
            </Paper>
        </Box>
    );
};

export default Report;