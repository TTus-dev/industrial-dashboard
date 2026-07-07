import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './view/MainLayout';
import {navigationItems} from "./routes/sidebarNavigation.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: navigationItems.map(item => ({
            path: item.path,
            element: <item.component />
        }))
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;