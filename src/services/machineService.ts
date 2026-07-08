import type { Machine } from "../types/machine"

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
        idealCycleTime: Math.floor(Math.random() * (3000 - 1500) + 1500)
    }
}