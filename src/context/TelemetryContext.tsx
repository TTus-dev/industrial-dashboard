import { createContext, useContext } from "react";
import { useMachineTelemetry } from "../hooks/useMachineTelemetry";

const TelemetryContext = createContext<ReturnType<typeof useMachineTelemetry> | null>(null);

export const TelemetryProvider = ({ children }: { children: React.ReactNode }) => {
    const telemetry = useMachineTelemetry();

    return (
        <TelemetryContext.Provider value={telemetry}>
            {children}
        </TelemetryContext.Provider>
    );
};

export const useTelemetry = () => {
    const context = useContext(TelemetryContext);

    if (!context) {
        throw new Error("useTelemetry must be used inside TelemetryProvider");
    }

    return context;
};