export const formatTime24WithSeconds = (date: Date) =>
    date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        second: "2-digit",
    });

export const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.round(milliseconds / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 && days === 0 && hours === 0) {
        parts.push(`${seconds}s`);
    }

    return parts.length > 0 ? parts.join(" ") : "0m";
};

export const normalizeMinute = (date: Date) => {
    const result = new Date(date);
    result.setSeconds(0, 0);
    return result;
};