import type { Machine } from "../types/machine"

export const getMachine = (): Machine => {
    return {
        id: 1,
        name: "Assembly Machine 01",
        status: "running",
        temperature: 72,
        productionCount: 850,
        targetCount: 850,
    }
}