import { Link } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar'
import Footer from '../../components/landing/Footer'
import { MdCheck, MdArrowForward } from 'react-icons/md'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect for small institutes just getting started',
    features: ['Up to 50 students', 'Fee tracking', 'PDF receipts', 'Basic dashboard', 'Email support'],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    name: 'Pro',
    price: 'Rs. 2,999',
    period: '/month',
    desc: 'For growing institutes that need more power',
    features: ['Unlimited students', 'Challan generation', 'Email reminders', 'Advanced analytics', 'Staff management', 'Priority support', 'Cloudinary storage'],
    cta: 'Start Pro Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For large institute groups and chains',
    features: ['Multiple institutes', 'Custom branding', 'API access', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'On-premise option'],
    cta: 'Contact Sales',
    highlighted: false
  },
]

const faqs = [
  { q: 'Is EduPay free to use?', a: 'Yes! Our Starter plan is completely free forever for institutes with up to 50 students.' },
  { q: 'Can I upgrade or downgrade anytime?', a: 'Absolutely. You can upgrade or downgrade your plan at any time with no penalties.' },
  { q: 'Is my data safe?', a: 'Yes. Each institute has completely isolated data. We use MongoDB Atlas with enterprise security.' },
  { q: 'Do you support Pakistani banks?', a: 'Our challan system generates standard bank challans compatible with all major Pakistani banks.' },
  { q: 'Can students access EduPay?', a: 'Yes. Students get their own portal to view fee records and download receipts after admin creates their account.' },
]

export default function Pricing() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* hero */}
      <section className="pt-32 pb-16 px-6 bg-[#f4f6f9]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-500">Start free. Upgrade when you need more power.</p>
        </div>
      </section>

      {/* plans */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${plan.highlighted ? 'bg-[#2c3e50] border-[#2c3e50] shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
              {plan.highlighted && (
                <span className="inline-block bg-[#3498db] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-[#2c3e50]'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-white opacity-60' : 'text-gray-400'}`}>
                {plan.desc}
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#2c3e50]'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ${plan.highlighted ? 'text-white opacity-60' : 'text-gray-400'}`}>
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
                    <span className={`text-sm ${plan.highlighted ? 'text-white opacity-80' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-[#3498db] text-white hover:bg-blue-500'
                    : 'bg-[#2c3e50] text-white hover:bg-[#3d5166]'
                }`}
              >
                {plan.cta}
                <MdArrowForward size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="py-20 px-6 bg-[#f4f6f9]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c3e50] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-[#2c3e50] mb-2">{faq.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}