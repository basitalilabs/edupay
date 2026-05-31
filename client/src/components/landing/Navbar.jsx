import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdMenu, MdClose } from 'react-icons/md'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#2c3e50] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-[#2c3e50] font-bold text-xl">EduPay</span>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-600 hover:text-[#2c3e50] text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#2c3e50] px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold text-white bg-[#2c3e50] px-5 py-2.5 rounded-xl hover:bg-[#3d5166] transition-all shadow-md"
          >
            Get Started Free
          </Link>
        </div>

        {/* mobile menu button */}
        <button
          className="md:hidden text-[#2c3e50]"
          onClick={() => setOpen(!open)}
        >
          {open ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block text-gray-600 hover:text-[#2c3e50] text-sm font-medium py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/login"
              className="text-center text-sm font-semibold text-[#2c3e50] py-2.5 border border-gray-200 rounded-xl"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-center text-sm font-semibold text-white bg-[#2c3e50] py-2.5 rounded-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}