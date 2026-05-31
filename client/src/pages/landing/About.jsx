import Navbar from '../../components/landing/Navbar'
import Footer from '../../components/landing/Footer'
import { MdCheck } from 'react-icons/md'

const values = [
  { title: 'Simplicity', desc: 'We believe powerful software should be simple to use. No training required.' },
  { title: 'Reliability', desc: '99.9% uptime with MongoDB Atlas and enterprise-grade infrastructure.' },
  { title: 'Security', desc: 'Multi-tenant isolation ensures your institute data is always private.' },
  { title: 'Local First', desc: 'Built for Pakistani institutes with PKR support and local bank challans.' },
]

export default function About() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* hero */}
      <section className="pt-32 pb-16 px-6 bg-[#f4f6f9]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">About EduPay</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We are on a mission to modernize fee management for educational institutes across Pakistan.
          </p>
        </div>
      </section>

      {/* story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#3498db] font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-[#2c3e50] mt-2 mb-4">
              Built by Educators, for Educators
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              EduPay was born out of frustration with outdated, complex, and expensive fee management systems. Most Pakistani institutes still use paper registers or basic spreadsheets to track thousands of student payments.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              We built EduPay to change that. A modern, cloud-based, affordable system that any school or college can set up in minutes and start using immediately.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today EduPay is trusted by hundreds of institutes across Pakistan, processing millions of rupees in fee collections every month.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '2024', label: 'Founded' },
              { value: '500+', label: 'Institutes' },
              { value: '50K+', label: 'Students' },
              { value: 'Rs. 2Cr+', label: 'Processed' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#f4f6f9] rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-[#2c3e50]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="py-20 px-6 bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Our Values</h2>
            <p className="text-gray-500">What drives every decision we make</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <MdCheck size={20} className="text-[#3498db]" />
                </div>
                <h3 className="font-bold text-[#2c3e50] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Built with Passion</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            EduPay is built by a passionate team of developers and educators from Pakistan who understand the real challenges of managing educational institutes.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}