import type { Machine, MachineHistory } from "../types/machine"

const now = new Date();

export const getMachine = (): Machine => {
    return {
        id: 1,
        name: "Assembly Machine 01",
        status: "running",
        temperature: 72,
        okCount: 850,
        nokCount: 150,
        targetCount: 10000,
        startedAt: new Date(now.getTime() - 60 * 60 * 1000),
        idealCycleTimeMs: 2200,
    }
}

export const getMachineHistory = (): MachineHistory => {
    return {
        id: 1,

        temperatureHistory: [
            {
                time: new Date(now.getTime() - 60 * 60 * 1000),
                value: 68
            },
            {
                time: new Date(now.getTime() - 45 * 60 * 1000),
                value: 71
            },
            {
                time: new Date(now.getTime() - 30 * 60 * 1000),
                value: 74
            },
            {
                time: new Date(now.getTime() - 15 * 60 * 1000),
                value: 72
            },
            {
                time: now,
                value: 73
            }
        ],

        downtimeEvents: [
            {
                id: 1,
                startTime: new Date(now.getTime() - 45 * 60 * 1000),
                endTime: new Date(now.getTime() - 43 * 60 * 1000),
                reason: "maintenance",
                temperature: 69,
                comment: "Routine inspection"
            },
            {
                id: 2,
                startTime: new Date(now.getTime() - 35 * 60 * 1000),
                endTime: new Date(now.getTime() - 31 * 60 * 1000),
                reason: "material",
                temperature: 75,
                comment: "Material replacement"
            },
            {
                id: 3,
                startTime: new Date(now.getTime() - 25 * 60 * 1000),
                endTime: new Date(now.getTime() - 24 * 60 * 1000),
                reason: "unknown",
                temperature: 73,
                comment: undefined
            },
            {
                id: 4,
                startTime: new Date(now.getTime() - 5 * 60 * 1000),
                endTime: new Date(now.getTime() - 4 * 60 * 1000),
                reason: "maintenance",
                temperature: 76,
                comment: "Sensor recalibration"
            },
        ]
    };
};