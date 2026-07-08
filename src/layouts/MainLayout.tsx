import { Outlet } from 'react-router-dom';
import { Box } from "@mui/material";
import { MainBar } from "../components/MainBar";

export const MainLayout = () => (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <MainBar />
        <Box component="main" sx={{ flex: 1 }}>
            <Outlet />
        </Box>
    </Box>
);