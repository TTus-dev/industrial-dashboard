import { Outlet } from 'react-router-dom';
import { Box } from "@mui/material";
import { MainBar } from "../components/layout/MainBar";

export const MainLayout = () => (
    <Box
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
        }}
    >
        <MainBar />

        <Box
            component="main"
            sx={{
                flex: 1,
                minHeight: 0,
            }}
        >
            <Outlet />
        </Box>
    </Box>
);