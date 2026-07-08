import { Outlet } from 'react-router-dom';
import { Box } from "@mui/material";
import { MainBar } from "../components/layout/MainBar";

export const MainLayout = () => (
    <Box>
        <MainBar />
        <Box component="main">
            <Outlet />
        </Box>
    </Box>
);