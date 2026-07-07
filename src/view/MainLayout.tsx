import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const MainLayout = () => (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1 }}>
            <Outlet /> {}
        </main>
    </div>
);