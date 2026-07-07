import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from '@mui/icons-material/List';
import Dashboard from '../view/Dashboard';
import MachineList from '../view/MachineList';

export const navigationItems = [
    { title: 'Dashboard', path: '/', icon: DashboardIcon, component: Dashboard },
    { title: 'Lista Maszyn', path: '/machines', icon: ListIcon, component: MachineList },
];