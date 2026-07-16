import { AppBar, Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DarkMode, LightMode, PrecisionManufacturing } from "@mui/icons-material";
import { navigationItems } from "../../app/navigation";
import { useThemeMode } from "../../context/ThemeContext";

export const MainBar = () => {
    const { mode, toggleTheme } = useThemeMode();
    
    return (
        <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={{display: 'flex', gap: 3}}>
                {/* Logo Section */}
                <Link component={RouterLink} to='/' underline="none"
                      sx={{color: "#eceff1", display: 'flex', alignItems: 'center', gap: 1}}>
                    <PrecisionManufacturing sx={{fontSize: '3rem'}}/>
                    <Typography variant="h5" component="span" sx={{fontWeight: 'bold'}}>
                        Manufacturing
                    </Typography>
                </Link>
    
                {/* Navigation Items Section */}
                <Box sx={{display: 'flex', gap: 2}}>
                    {navigationItems.map((item) => (
                        <Link
                            key={item.path}
                            component={RouterLink}
                            to={item.path}
                            underline="none"
                            sx={{
                                color: "#eceff1",
                                "&:hover": {opacity: 0.8}
                            }}
                        >
                            {item.title}
                        </Link>
                    ))}
                </Box>

                <Box sx={{ ml: "auto" }}>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {mode === "dark" ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
};