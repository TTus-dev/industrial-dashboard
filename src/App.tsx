import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import {Box, CssBaseline} from "@mui/material";
import { theme } from "./app/theme";
import { router } from "./app/router";
import {TelemetryProvider} from "./context/TelemetryContext.tsx";


function App() {
    return (
        <Box sx={{ height: "100%" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <TelemetryProvider>
                    <RouterProvider router={router} />
                </TelemetryProvider>
            </ThemeProvider>
        </Box>
    )
}

export default App;