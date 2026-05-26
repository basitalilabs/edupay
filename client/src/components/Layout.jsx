import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdReceipt,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdAccountBalance,
  MdPerson,
  MdBusiness
} from 'react-icons/md'


const adminMenu = [
  { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/students', label: 'Students', icon: MdPeople },
  { path: '/fee-structure', label: 'Fee Structure', icon: MdAccountBalance },
  { path: '/fee-records', label: 'Fee Records', icon: MdPayment },
  { path: '/challan', label: 'Challan', icon: MdReceipt },
  { path: '/staff', label: 'Staff', icon: MdPerson },
  { path: '/profile', label: 'Institute Profile', icon: MdBusiness },
]

const accountantMenu = [
  { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/students', label: 'Students', icon: MdPeople },
  { path: '/fee-records', label: 'Fee Records', icon: MdPayment },
  { path: '/challan', label: 'Challan', icon: MdReceipt },
]

const studentMenu = [
  { path: '/my-fees', label: 'My Fees', icon: MdPayment },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getMenu = () => {
    if (user?.role === 'admin') return adminMenu
    if (user?.role === 'accountant') return accountantMenu
    return studentMenu
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menu = getMenu()

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-primary flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        {/* logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white border-opacity-10">
          <div>
            <h1 className="text-white text-xl font-bold">EduPay</h1>
            <p className="text-white text-opacity-50 text-xs mt-0.5">Fee Management</p>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* user info */}
        <div className="px-6 py-4 border-b border-white border-opacity-10">
          <p className="text-white font-medium text-sm truncate">{user?.name}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-white capitalize mt-1 inline-block">
            {user?.role}
          </span>
        </div>

        {/* menu */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white font-medium'
                    : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* logout */}
        <div className="px-4 py-4 border-t border-white border-opacity-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-white w-full transition-all duration-200"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* main content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* topbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden text-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu size={24} />
          </button>
          <h2 className="text-primary font-semibold text-lg hidden md:block">
            Welcome back, {user?.name} 👋
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}