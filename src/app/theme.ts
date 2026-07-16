import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,

            primary: {
                main: mode === "light"
                    ? "#2c3e50"
                    : "#90caf9",

                light: mode === "light"
                    ? "#546a7b"
                    : "#bbdefb",

                dark: mode === "light"
                    ? "#1a252f"
                    : "#42a5f5",
            },

            divider: mode === "light"
                ? "#d0d7de"
                : "#37474f",

            background: {
                default: mode === "light"
                    ? "#eef2f5"
                    : "#12181d",

                paper: mode === "light"
                    ? "#ffffff"
                    : "#1e272e",
            },

            text: {
                primary: mode === "light"
                    ? "#263238"
                    : "#eceff1",

                secondary: mode === "light"
                    ? "#607d8b"
                    : "#b0bec5",
            },
        },

        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

            h3: {
                fontWeight: 600,
            },
            h4: {
                fontWeight: 600,
            },
            h5: {
                fontWeight: 600,
            },
        },

        shape: {
            borderRadius: 8,
        },
    });