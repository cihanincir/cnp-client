import { v4 as uuidv4 } from "uuid";

export const thread = {
    sleep: (ms: number) => new Promise(res => setTimeout(res, ms)),
    convertRemToPixels: (rem: number) => {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    },
    uuid: uuidv4
}