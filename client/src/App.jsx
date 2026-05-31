import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// landing pages
import Home from "./pages/landing/Home";
import Features from "./pages/landing/Features";
import Pricing from "./pages/landing/Pricing";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";

// auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// dashboard pages
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import FeeStructure from "./pages/FeeStructure";
import FeeRecords from "./pages/FeeRecords";
import Staff from "./pages/Staff";
import InstituteProfile from "./pages/InstituteProfile";
import Challan from "./pages/Challan";
import StudentPortal from "./pages/StudentPortal";

// components
import Layout from "./components/Layout";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ─── PUBLIC LANDING ROUTES ─── */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ─── AUTH ROUTES ─── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ─── PROTECTED DASHBOARD ROUTES ─── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Route>

        <Route
          path="/students"
          element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Students />} />
        </Route>

        <Route
          path="/fee-structure"
          element={
            <ProtectedRoute roles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FeeStructure />} />
        </Route>

        <Route
          path="/fee-records"
          element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FeeRecords />} />
        </Route>

        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Staff />} />
        </Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={['admin']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InstituteProfile />} />
        </Route>

        <Route
          path="/challan"
          element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Challan />} />
        </Route>

        <Route
          path="/my-fees"
          element={
            <ProtectedRoute roles={['student']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentPortal />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}