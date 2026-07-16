import { useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { router } from "./app/router";
import { TelemetryProvider } from "./context/TelemetryContext";
import { getTheme } from "./app/theme";
import { ThemeContext } from "./context/ThemeContext";

function App() {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const theme = useMemo(
        () => getTheme(mode),
        [mode]
    );

    const toggleTheme = () => {
        setMode(prev =>
            prev === "light" ? "dark" : "light"
        );
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <TelemetryProvider>
                    <RouterProvider router={router} />
                </TelemetryProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;