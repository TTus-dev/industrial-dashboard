import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import "./charts/chartConfig"

createRoot(document.getElementById('root')!).render(
    <App />
)
