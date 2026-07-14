import type { Machine, MachineHistory } from "../types/machine"

export const getMachine = (): Machine => {
    return {
        id: 1,
        name: "Assembly Machine 01",
        status: "running",
        temperature: 72,
        okCount: 850,
        nokCount: 150,
        targetCount: 10000,
        startedAt: new Date(Date.now() - 1000 * 60 * 45),
        idealCycleTimeMs: Math.floor(Math.random() * (3000 - 1500) + 1500),
    }
}

export const getMachineHistory = (): MachineHistory => {
    return {
        id: 1,
        temperatureHistory: [{
            time: new Date(),
            value: 72
        }],
        downtimeEvents: []
    }
}