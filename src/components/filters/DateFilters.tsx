import { Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pl";

interface DateFiltersProps {
    from: Date;
    to: Date;
    onApply: (from: Date, to: Date) => void;
}

export const DateFilters = ({from, to, onApply}: DateFiltersProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
            <Box sx={{ display: "flex", gap: 2 }}>
                <DateTimePicker
                    label="From"
                    ampm={false}
                    format="L HH:mm"
                    timeSteps={{minutes: 1}}
                    maxDateTime={dayjs(to)}
                    value={from ? dayjs(from) : null}
                    onChange={(value) => {
                        if (value) {
                            onApply(value.toDate(), to);
                        }
                    }}
                />

                <DateTimePicker
                    label="To"
                    ampm={false}
                    format="L HH:mm"
                    timeSteps={{minutes: 1}}
                    minDateTime={dayjs(from)}
                    value={to ? dayjs(to) : null}
                    onChange={(value) => {
                        if (value) {
                            onApply(from, value.toDate());
                        }
                    }}
                />
            </Box>
        </LocalizationProvider>
    );
};