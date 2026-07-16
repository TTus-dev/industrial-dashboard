import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material";

interface Props {
    data: {
        reason: string;
        duration: number;
    }[]
}

const getDurationUnit = (data: {duration: number}[]) => {
    const maxDuration = Math.max(
        ...data.map(item => item.duration)
    );

    if (maxDuration < 60_000) {
        return "seconds";
    }

    if (maxDuration < 3_600_000) {
        return "minutes";
    }

    return "hours";
};

export const DowntimeDurationChart = ({data}: Props) => {
    const theme = useTheme();
    
    const unit = getDurationUnit(data);

    const unitLabel =
        unit === "seconds"
            ? "seconds"
            : unit === "minutes"
                ? "minutes"
                : "hours";
    
    const formattedData = data.map(item => {
        let value = item.duration;

        switch (unit) {
            case "seconds":
                value /= 1000;
                break;
            case "minutes":
                value /= 1000 * 60;
                break;
            case "hours":
                value /= 1000 * 60 * 60;
                break;
        }

        return value;
    });

    const formatDuration = (
        milliseconds: number,
        compact = false
    ) => {
        const totalSeconds = Math.round(milliseconds / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const parts = [];

        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        
        if (seconds > 0 && (!compact || hours === 0 && minutes === 0)) {
            parts.push(`${seconds}s`);
        }

        return parts.length ? parts.join(" ") : "0s";
    };

    return (
        <Bar
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const item = data[context.dataIndex];

                                return `${item.reason}: ${formatDuration(item.duration)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: theme.palette.text.secondary,
                        },
                        grid: {
                            color: theme.palette.divider,
                        },
                    },
                    y: {
                        ticks: {
                            color: theme.palette.text.secondary,
                        },
                        grid: {
                            color: theme.palette.divider,
                        },
                    },
                },
            }}
            data={{
                labels: data.map(item => item.reason),
                datasets: [
                    {
                        label: `Downtime duration (${unitLabel})`,
                        data: formattedData,
                        backgroundColor: theme.palette.primary.main
                    }
                ]
            }}
        />
    );
};