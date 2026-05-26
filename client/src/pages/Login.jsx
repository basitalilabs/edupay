import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { MdEmail, MdLock, MdArrowForward } from 'react-icons/md'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.user, data.token)
      toast.success('Welcome back!')
      if (data.user.role === 'student') {
        navigate('/my-fees')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2c3e50] flex-col justify-between p-12 relative overflow-hidden">

        {/* background circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full bg-white opacity-5" />
        <div className="absolute top-[40%] right-[-40px] w-[200px] h-[200px] rounded-full bg-[#3498db] opacity-10" />

        {/* logo */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3498db] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white font-bold text-2xl">EduPay</span>
          </div>
        </div>

        {/* center content */}
        <div className="z-10">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Manage Fees.<br />
            Save Time.<br />
            <span className="text-[#3498db]">Grow Smarter.</span>
          </h2>
          <p className="text-white text-opacity-60 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            The complete SaaS solution for educational institutes to manage student fees, generate receipts, and track payments.
          </p>

          {/* stats */}
          <div className="flex gap-8 mt-10">
            {[
              { value: '500+', label: 'Institutes' },
              { value: '50K+', label: 'Students' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* bottom quote */}
        <div className="z-10 border-l-2 border-[#3498db] pl-4">
          <p className="text-white italic text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            "EduPay transformed how we manage our fee collection. Highly recommended."
          </p>
          <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
            — Principal, Superior College Lahore
          </p>
        </div>
      </div>

      {/* right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#f4f6f9]">
        <div className="w-full max-w-md">

          {/* mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-[#2c3e50] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-[#2c3e50] font-bold text-xl">EduPay</span>
          </div>

          <h2 className="text-3xl font-bold text-[#2c3e50] mb-1">Sign in</h2>
          <p className="text-gray-500 text-sm mb-8">Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@institute.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent text-sm shadow-sm transition-all"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent text-sm shadow-sm transition-all"
                />
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c3e50] hover:bg-[#3d5166] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <MdArrowForward size={18} />
                </>
              )}
            </button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3498db] font-semibold hover:underline">
              Register your institute
            </Link>
          </p>

          {/* role hint */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-[#3498db] mb-2">Demo Credentials</p>
            <p className="text-xs text-gray-600">Admin: admin@demo.com / 123456</p>
            <p className="text-xs text-gray-600">Student: student@demo.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}