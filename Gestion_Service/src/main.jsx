import { createRoot } from 'react-dom/client'

import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import App from './App'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
