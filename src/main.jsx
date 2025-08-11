import { StrictMode, lazy, Suspense } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProtectedRoute from "./utilis/ProtectedRoutes";

const Cities = lazy(() => import("./Pages/Cities"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Form = lazy(() => import("./Pages/Form"));
const Admins = lazy(() => import("./Pages/Admins"));
const GeoChart = lazy(() => import("./Pages/GeoChart"));
const PieChart = lazy(() => import("./Pages/PieChart"));
const LineChart = lazy(() => import("./Pages/LineChart"));
const BarsChar = lazy(() => import("./Pages/BarsChar"));
const Users = lazy(() => import("./Pages/Users"));
const FAQ = lazy(() => import("./Pages/FAQ"));
const Calender = lazy(() => import("./Pages/Calender"));
const PrivateChat = lazy(() => import("./Pages/PrivateChat"));
const Verification = lazy(() => import("./Pages/Verification"));
const Login = lazy(() => import("./Auth/Login"));
const Countries = lazy(() => import("./Pages/Countries"));
const UserPageForm = lazy(() => import("./Components/Forms/UserPageForm"));
const AdminPageForm = lazy(() => import("./Components/Forms/AdminPageForm"));
const Settings = lazy(() => import("./Pages/Settings"));
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
        <Route path="/user/verify/:id" element={<Verification />} />
        <Route path="/privatechats" element={<PrivateChat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>

      {/* صفحة تسجيل الدخول مفتوحة */}
      <Route path="login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense
      fallback={
        <Box sx={{ display: "flex" , justifyContent: "center" , alignItems: "center" , width: "100%" , height: "100vh"}}>
          <CircularProgress color="secondary" />
        </Box>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
