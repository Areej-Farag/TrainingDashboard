import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
// Router imports
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Cities from "./Pages/Cities";
import Dashboard from "./Pages/Dashboard";
import Form from "./Pages/Form";
import Admins from "./Pages/Admins";
import GeoChart from "./Pages/GeoChart";
import PieChart from "./Pages/PieChart";
import LineChart from "./Pages/LineChart";
import BarsChar from "./Pages/BarsChar";
import Users from "./Pages/Users";
import FAQ from "./Pages/FAQ";
import Calender from "./Pages/Calender";
import Login from "./Auth/Login";
import AdminPageForm from "./Components/Forms/AdminPageForm";
import UserPageForm from "./Components/Forms/UserPageForm";
import Countries from "./Pages/Countries";
import ProtectedRoute from "./utilis/ProtectedRoutes";

// Get token
const Token = localStorage.getItem("token");
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={localStorage.getItem("token") ? <Dashboard /> : <Login />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cities" element={<Cities />} />
        <Route path="countries" element={<Countries />} />
        <Route path="form" element={<Form />} />
        <Route path="admins" element={<Admins />} />
        <Route path="geo" element={<GeoChart />} />
        <Route path="pie" element={<PieChart />} />
        <Route path="line" element={<LineChart />} />
        <Route path="bar" element={<BarsChar />} />
        <Route path="users" element={<Users />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="calender" element={<Calender />} />
        <Route path="/admin/add" element={<AdminPageForm />} />
        <Route path="/admin/edit/:id" element={<AdminPageForm />} />
        <Route path="/user/add" element={<UserPageForm />} />
        <Route path="/user/edit/:id" element={<UserPageForm />} />
      </Route>

      {/* صفحة تسجيل الدخول مفتوحة */}
      <Route path="login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
