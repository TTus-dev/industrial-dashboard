import { Link as RouterLink } from 'react-router-dom';
import { Button, Drawer, Link, List, ListItem, ListItemText } from '@mui/material';
import { navigationItems } from "../routes/sidebarNavigation.ts";
import { useState } from "react";

export const Sidebar = () => {
    // 1. Hooks MUST be inside the component function
    const [drawerOpened, setDrawer] = useState(false);

    // 2. This function is now properly scoped to the component
    const toggleDrawer = (newState: boolean) => () => {
        setDrawer(newState);
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open Menu</Button>
            <Drawer open={drawerOpened} onClose={toggleDrawer(false)}>
                <nav>
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.path}>
                                <Link component={RouterLink} to={item.path} underline="none">
                                    <Icon />
                                    <span>{item.title}</span>
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </Drawer>
        </div>
    );
};