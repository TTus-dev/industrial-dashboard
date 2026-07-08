import {useEffect, useState} from "react";
import {getMachine} from "../services/machineService";
import type {Machine} from "../types/machine";

export const useMachineTelemetry = () => {
    const [machine, setMachine] = useState<Machine>(getMachine());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setMachine(previous => ({
                ...previous,
                temperature: previous.temperature + (Math.random() - 0.5) * 2,
                productionCount: previous.productionCount + 1,
            }));
        }, 2000);
        
        return () => clearInterval(interval);
    }, []);
    
    return machine;
}