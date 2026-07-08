import {createBrowserRouter} from "react-router-dom";
import {navigationItems} from "./navigation";
import {MainLayout} from "../layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: navigationItems.map(item => ({
            path: item.path,
            element: <item.component />
        }))
    }
]);