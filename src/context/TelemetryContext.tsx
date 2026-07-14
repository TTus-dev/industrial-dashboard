import { createContext, useContext } from "react";
import { useMachineSimulation } from "../hooks/useMachineSimulation";
import * as React from "react";

const TelemetryContext = createContext<ReturnType<typeof useMachineSimulation> | null>(null);

export const TelemetryProvider = ({ children }: { children: React.ReactNode }) => {
    const telemetry = useMachineSimulation();

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