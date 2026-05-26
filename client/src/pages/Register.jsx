import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { MdEmail, MdLock, MdPerson, MdBusiness, MdLocationOn, MdArrowForward } from 'react-icons/md'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    instituteName: '',
    instituteAddress: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      login(data.user, data.token)
      toast.success('Institute registered successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2c3e50] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-white opacity-5" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full bg-white opacity-5" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3498db] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="text-white font-bold text-2xl">EduPay</span>
        </div>

        <div className="z-10">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Join Thousands of<br />
            <span className="text-[#3498db]">Institutes</span> Already<br />
            Using EduPay.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Set up your institute in minutes. No technical knowledge required.
          </p>

          {/* steps */}
          <div className="mt-10 space-y-4">
            {[
              { step: '01', title: 'Register your institute', desc: 'Create your account in 2 minutes' },
              { step: '02', title: 'Add your students', desc: 'Import or add students manually' },
              { step: '03', title: 'Start collecting fees', desc: 'Generate receipts and challans instantly' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="text-[#3498db] font-bold text-sm mt-0.5">{item.step}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs z-10" style={{ color: 'rgba(255,255,255,0.4)' }}>
          © 2026 EduPay. All rights reserved.
        </p>
      </div>

      {/* right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#f4f6f9] overflow-y-auto">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#2c3e50] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-[#2c3e50] font-bold text-xl">EduPay</span>
          </div>

          <h2 className="text-3xl font-bold text-[#2c3e50] mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm mb-8">Register your institute and get started for free</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* admin section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <p className="text-xs font-bold text-[#3498db] uppercase tracking-widest">
                Admin Information
              </p>

              <div className="relative">
                <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm transition-all"
                />
              </div>

              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm transition-all"
                />
              </div>

              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm transition-all"
                />
              </div>
            </div>

            {/* institute section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <p className="text-xs font-bold text-[#3498db] uppercase tracking-widest">
                Institute Information
              </p>

              <div className="relative">
                <MdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="instituteName"
                  value={form.instituteName}
                  onChange={handleChange}
                  placeholder="Institute name"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm transition-all"
                />
              </div>

              <div className="relative">
                <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="instituteAddress"
                  value={form.instituteAddress}
                  onChange={handleChange}
                  placeholder="Institute address"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3498db] text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2c3e50] hover:bg-[#3d5166] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <MdArrowForward size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3498db] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}