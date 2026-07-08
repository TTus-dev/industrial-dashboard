import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from "@mui/material";
import { theme } from "./app/theme";
import { router } from "./app/router";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App;