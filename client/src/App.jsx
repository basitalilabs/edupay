import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import FeeStructure from './pages/FeeStructure'
import FeeRecords from './pages/FeeRecords'
import Staff from './pages/Staff'
import InstituteProfile from './pages/InstituteProfile'
import Challan from './pages/Challan'
import StudentPortal from './pages/StudentPortal'

// components
import Layout from './components/Layout'

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth()

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>

  if (!user) return <Navigate to="/login" />

  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" />} />

          <Route path="dashboard" element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="students" element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Students />
            </ProtectedRoute>
          } />

          <Route path="fee-structure" element={
            <ProtectedRoute roles={['admin']}>
              <FeeStructure />
            </ProtectedRoute>
          } />

          <Route path="fee-records" element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <FeeRecords />
            </ProtectedRoute>
          } />

          <Route path="staff" element={
            <ProtectedRoute roles={['admin']}>
              <Staff />
            </ProtectedRoute>
          } />

          <Route path="profile" element={
            <ProtectedRoute roles={['admin']}>
              <InstituteProfile />
            </ProtectedRoute>
          } />

          <Route path="challan" element={
            <ProtectedRoute roles={['admin', 'accountant']}>
              <Challan />
            </ProtectedRoute>
          } />

          <Route path="my-fees" element={
            <ProtectedRoute roles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}