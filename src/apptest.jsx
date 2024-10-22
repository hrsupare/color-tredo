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
import UserIdPage from "./pages/superAdminPages/rechargeuser/UserIdPage";
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute>
                <SuperAdminAllFeatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/admin/1"
            element={
              <ProtectedRoute>
                <AdminIdPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/admin/1/name"
            element={
              <ProtectedRoute>
                <AdminName />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/admin/1/name/amount"
            element={
              <ProtectedRoute>
                <AdminAmountPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/1/name"
            element={
              <ProtectedRoute>
                <AdminName />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/1/name/amount"
            element={
              <ProtectedRoute>
                <AdminAmountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/user/1"
            element={
              <ProtectedRoute>
                <UserIdPage />
              </ProtectedRoute>
            }
          />
{/*           <Route
            path="/superadmin/user/1/name"
            element={
              <ProtectedRoute>
                <UserName />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/superadmin/user/1/name/amount"
            element={
              <ProtectedRoute>
                <UserAmountPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/paymenthistory"
            element={
              <ProtectedRoute>
                <PaymentHistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/paymenthistory"
            element={
              <ProtectedRoute>
                <PaymentHistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/user/1"
            element={
              <ProtectedRoute>
                <AdminUserRechargeUserIdPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/user/1/name"
            element={
              <ProtectedRoute>
                <AdminUserRechargeUserNamePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/user/1/name/amount"
            element={
              <ProtectedRoute>
                <AdminUserRechargeAmountPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/paymenthistory"
            element={
              <ProtectedRoute>
                <PaymentHistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/name/history"
            element={
              <ProtectedRoute>
                <AdminRechargeHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/name/recharge/user"
            element={
              <ProtectedRoute>
                <AdminRechargeUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/withdraw"
            element={
              <ProtectedRoute>
                <AdminWithdraw />
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/admin-signup"
            element={
              <ProtectedRoute>
                <AdminSignUp />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/referral" element={<Referral />} />
      </Routes>
    </>
  );
};

export default App;
