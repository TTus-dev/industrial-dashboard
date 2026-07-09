import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";
import { useState } from "react";
import type { DowntimeEvent, DowntimeReason } from "../types/event";

interface DowntimeDialogProps {
    open: boolean;
    event: DowntimeEvent | null;
    onSubmit: (
        reason: DowntimeReason,
        comment: string
    ) => void;
}

export const DowntimeDialog = ({
                                   open,
                                   event,
                                   onSubmit,
                               }: DowntimeDialogProps) => {

    const [reason, setReason] = useState<DowntimeReason>("unknown");
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (!event) return;

        onSubmit(reason, comment);

        setComment("");
        setReason("unknown");
    };

    return (
        <Dialog open={open} 
                onClose={(_, reason) => {
                    if (reason === "backdropClick") {
                        return;
                    }
        }}>
            <DialogTitle>
                Downtime detected
            </DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem", p: "2rem" }}>

                <TextField
                    select
                    label="Reason"
                    value={reason}
                    onChange={(e) =>
                        setReason(e.target.value as DowntimeReason)
                    }
                    sx={{ mt: "0.5rem" }}
                >
                    <MenuItem value="maintenance">
                        Maintenance
                    </MenuItem>

                    <MenuItem value="material">
                        Material
                    </MenuItem>

                    <MenuItem value="operator">
                        Operator
                    </MenuItem>

                    <MenuItem value="failure">
                        Failure
                    </MenuItem>

                    <MenuItem value="unknown">
                        Unknown
                    </MenuItem>
                </TextField>

                <TextField
                    label="Comment"
                    multiline
                    rows={5}
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                />

                {event && (
                    <div>
                        Started:
                        {" "}
                        {event.startTime.toLocaleTimeString()}
                    </div>
                )}

            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};