import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./Layouts/AppLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Referral from "./pages/Referral";
import SuperAdminAllFeatures from "./pages/superAdminPages/SuperAdminAllFeatures";
import AdminIdPage from "./pages/superAdminPages/AdminIdPage";
import AdminName from "./pages/superAdminPages/AdminName";
import AdminAmountPage from "./pages/superAdminPages/AdminAmountPage";
 import UserName from "./pages/superAdminPages/rechargeuser/UserName";
import UserAmountPage from "./pages/superAdminPages/rechargeuser/UserAmountPage";
import PaymentHistoryPage from "./pages/superAdminPages/patmentHistory/PaymentHistoryPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminRechargeAdmin from "./pages/admin/AdminRechargeAdmin";
import AdminRechargeHistory from "./pages/admin/AdminRechargeHistory";
import AdminWithdraw from "./pages/admin/AdminWithdraw";
import AdminRechargeUser from "./pages/admin/AdminRechargeUser";
import AdminSignUp from "./pages/AdminSignUp";
import AdminUserRechargeUserIdPage from "./pages/admin/rechargeuser/AdminUserRechargeUserIdPage";
import AdminUserRechargeUserNamePage from "./pages/admin/rechargeuser/AdminUserRechargeUserNamePage";
import AdminUserRechargeAmountPage from "./pages/admin/rechargeuser/AdminUserRechargeAmountPage";
import UserIdPage from "./pages/superAdminPages/rechargeuser/UserIdPage";
import Orders from "./pages/Orders";
import Balance from "./pages/Balance";

// ProtectedRoute component for role-based authentication
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role"); // Fetch the user role from localStorage using 'role' key

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Redirect to unauthorized page if role doesn't match
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-100 gap-8 p-2  w-full max-w-md mx-auto transition-all duration-500">
      <Routes > 
        <Route element={<AppLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN", "USER"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <SuperAdminAllFeatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/admin/1"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <AdminIdPage />
              </ProtectedRoute>
            }
          />
{/*           <Route
            path="/superadmin/admin/1/name"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <AdminName />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/superadmin/admin/1/name/amount"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <AdminAmountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/user/1"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <UserIdPage />
              </ProtectedRoute>
            }
          />
  {/*         <Route
            path="/superadmin/user/1/name"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <UserName />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/superadmin/user/1/name/amount"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <UserAmountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/1/name"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminName />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/1/name/amount"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminAmountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymenthistory"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <PaymentHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/name/history"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminRechargeHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/name/recharge/user"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminRechargeUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/withdraw"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminWithdraw />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/admin-signup"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <AdminSignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/1"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminUserRechargeUserIdPage />
              </ProtectedRoute>
            }
          />

         {/*  <Route
            path="/admin/user/1/name"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminUserRechargeUserNamePage />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/admin/user/1/name/amount"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
                <AdminUserRechargeAmountPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </div>
  );
};

export default App;