import { Link } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar'
import Footer from '../../components/landing/Footer'
import { MdPeople, MdPayment, MdReceipt, MdAnalytics, MdSecurity, MdCloud, MdArrowForward, MdCheck } from 'react-icons/md'

import dashboard from '../../assets/screenshots/dashboard.png'
import students from '../../assets/screenshots/students.png'
import feeRecords from '../../assets/screenshots/fee-records.png'

const features = [
  { icon: MdPeople, title: 'Student Management', desc: 'Add, edit, and manage all your students with class-wise organization and soft delete support.' },
  { icon: MdPayment, title: 'Fee Tracking', desc: 'Record payments, track dues, and monitor paid, partial, and unpaid statuses in real time.' },
  { icon: MdReceipt, title: 'PDF Receipts & Challans', desc: 'Generate professional PDF receipts and fee challans with institute logo instantly.' },
  { icon: MdAnalytics, title: 'Analytics Dashboard', desc: 'Get a clear overview of monthly collections, pending dues, and 6-month trends.' },
  { icon: MdSecurity, title: 'Role Based Access', desc: 'Admin, Accountant and Student roles with complete data isolation between institutes.' },
  { icon: MdCloud, title: 'Cloud Storage', desc: 'Institute logos and documents stored securely on Cloudinary with instant delivery.' },
]

const testimonials = [
  { name: 'Ahmed Raza', role: 'Principal, Beacon House Lahore', text: 'EduPay completely transformed how we manage fee collection. What used to take days now takes minutes.' },
  { name: 'Sara Khan', role: 'Admin, Superior College Sargodha', text: 'The PDF receipt and challan system is exactly what we needed. Our parents love the professional receipts.' },
  { name: 'Usman Ali', role: 'Accountant, City School Islamabad', text: 'The role-based access is brilliant. I can do my job without worrying about sensitive admin settings.' },
]

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for small institutes just getting started',
    features: ['Up to 50 students', 'Fee tracking', 'PDF receipts', 'Basic dashboard'],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    name: 'Pro',
    price: 'Rs. 2,999',
    period: '/month',
    desc: 'For growing institutes that need more power',
    features: ['Unlimited students', 'Challan generation', 'Email reminders', 'Advanced analytics', 'Staff management', 'Priority support'],
    cta: 'Start Pro Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large institute groups and chains',
    features: ['Multiple institutes', 'Custom branding', 'API access', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-[#f4f6f9] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#3498db] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-[#3498db] rounded-full animate-pulse" />
              Trusted by 500+ institutes across Pakistan
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-[#2c3e50] leading-tight mb-6">
              The Smartest Way to
              <span className="text-[#3498db]"> Manage</span>
              <br />Institute Fees
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              EduPay is a complete SaaS fee management platform built for schools, colleges, and academies. Generate receipts, track dues, and manage students — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 bg-[#2c3e50] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-[#3d5166] transition-all shadow-lg"
              >
                Start For Free
                <MdArrowForward size={20} />
              </Link>
              <Link
                to="/features"
                className="flex items-center gap-2 text-[#2c3e50] px-8 py-4 rounded-xl font-semibold text-base border border-gray-200 hover:bg-gray-50 transition-all"
              >
                See All Features
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required. Free forever for small institutes.</p>
          </div>

          {/* dashboard screenshot */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" style={{ top: '60%' }} />
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img src={dashboard} alt="EduPay Dashboard" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="py-16 px-6 bg-[#2c3e50]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Institutes' },
            { value: '50,000+', label: 'Students' },
            { value: '99.9%', label: 'Uptime' },
            { value: 'Rs. 2Cr+', label: 'Fees Processed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="py-20 px-6 bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">Everything You Need</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Built specifically for Pakistani educational institutes with all the features you need to run a modern fee management system.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-[#3498db]" />
                </div>
                <h3 className="font-bold text-[#2c3e50] text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* screenshot showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-[#3498db] font-semibold text-sm uppercase tracking-wider">Student Management</span>
              <h2 className="text-3xl font-bold text-[#2c3e50] mt-2 mb-4">Manage All Your Students in One Place</h2>
              <p className="text-gray-500 leading-relaxed mb-6">Add students, assign classes, search and filter instantly. Soft delete ensures your historical data is always preserved.</p>
              {['Class-wise student organization', 'Search and filter by name or class', 'Safe soft delete with data preservation', 'Roll number uniqueness per class'].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <MdCheck size={12} className="text-[#27ae60]" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img src={students} alt="Student Management" className="w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img src={feeRecords} alt="Fee Records" className="w-full" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-[#3498db] font-semibold text-sm uppercase tracking-wider">Fee Management</span>
              <h2 className="text-3xl font-bold text-[#2c3e50] mt-2 mb-4">Track Every Payment with Precision</h2>
              <p className="text-gray-500 leading-relaxed mb-6">Record payments, track partial payments, monitor dues, and download PDF receipts instantly after every transaction.</p>
              {['Paid, partial and unpaid status tracking', 'Instant PDF receipt generation', 'Monthly and yearly filtering', 'Admin can correct payment amounts'].map((item) => (
                <div key={item} className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <MdCheck size={12} className="text-[#27ae60]" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-20 px-6 bg-[#f4f6f9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">Loved by Educators</h2>
            <p className="text-gray-500 text-lg">See what institute administrators say about EduPay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3498db] bg-opacity-10 flex items-center justify-center text-[#3498db] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#2c3e50] text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#2c3e50] mb-4">Simple Pricing</h2>
            <p className="text-gray-500 text-lg">Start free, upgrade when you need more</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${plan.highlighted ? 'bg-[#2c3e50] border-[#2c3e50]' : 'bg-white border-gray-100 shadow-sm'}`}
              >
                {plan.highlighted && (
                  <span className="inline-block bg-[#3498db] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-[#2c3e50]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white text-opacity-60' : 'text-gray-400'}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#2c3e50]'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? 'text-white text-opacity-60' : 'text-gray-400'}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlighted ? 'bg-white bg-opacity-20' : 'bg-green-50'}`}>
                        <MdCheck size={12} className={plan.highlighted ? 'text-white' : 'text-[#27ae60]'} />
                      </div>
                      <span className={`text-sm ${plan.highlighted ? 'text-white text-opacity-80' : 'text-gray-600'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-[#3498db] text-white hover:bg-blue-500'
                      : 'bg-[#2c3e50] text-white hover:bg-[#3d5166]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="py-20 px-6 bg-[#2c3e50]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Modernize Your Fee Management?</h2>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join hundreds of institutes already using EduPay to save time and manage fees professionally.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#3498db] text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-blue-500 transition-all shadow-lg"
          >
            Get Started For Free
            <MdArrowForward size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}