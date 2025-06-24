import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Routers imports
import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route} from 'react-router'
import Invoices from './Pages/Invoices'
import Dashboard from './Pages/Dashboard'
import Form from './Pages/Form'
import Teams from './Pages/Teams'
import GeoChart from './Pages/GeoChart'
import PieChart from './Pages/PieChart'
import LineChart from './Pages/LineChart'
import BarsChar from './Pages/BarsChar'
import Contacts from './Pages/Contacts'
import FAQ from './Pages/FAQ'
import Calender from './Pages/Calender'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} > 
    <Route index element={<Dashboard />} /> ,
    <Route path="/invoices" element={<Invoices />} /> ,
    <Route path="/form" element={<Form />} /> ,
    <Route path="/teams" element={<Teams />} /> , 
    <Route path="/geo" element={<GeoChart />} /> ,
    <Route path="/pie" element={<PieChart />} /> , 
    <Route path="/line" element={<LineChart />} /> ,
    <Route path="/bar" element={<BarsChar />} /> ,
    <Route path="/contacts" element={<Contacts />} /> ,
    <Route path="/faq" element={<FAQ />} /> , 
    <Route path="/calender" element={<Calender />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
