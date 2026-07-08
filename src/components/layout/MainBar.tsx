import {AppBar, Box, IconButton, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {DarkMode, PrecisionManufacturing} from "@mui/icons-material";
import {navigationItems} from "../app/navigation";

export const MainBar = () => (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', gap: 3 }}>
            {/* Logo Section */}
            <Link component={RouterLink} to='/' underline="none" sx={{ color: 'primary.contrastText', display: 'flex', alignItems: 'center', gap: 1 }}>
                <PrecisionManufacturing sx={{ fontSize: '3rem' }} />
                <Typography variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
                    Manufacturing
                </Typography>
            </Link>

            {/* Navigation Items Section */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                {navigationItems.map((item) => (
                    <Link
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        underline="none"
                        sx={{
                            color: 'primary.contrastText',
                            '&:hover': { opacity: 0.8 }
                        }}
                    >
                        {item.title}
                    </Link>
                ))}
            </Box>
            
            <Box sx={{ ml: "auto" }}>
                <IconButton color="inherit">
                    <DarkMode />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
);