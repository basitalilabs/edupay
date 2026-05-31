import Navbar from '../../components/landing/Navbar'
import Footer from '../../components/landing/Footer'
import { MdPeople, MdPayment, MdReceipt, MdAnalytics, MdSecurity, MdCloud, MdEmail, MdBusiness } from 'react-icons/md'

const features = [
  {
    icon: MdPeople,
    title: 'Student Management',
    desc: 'Complete student lifecycle management with class-wise organization.',
    points: ['Add and edit student profiles', 'Class-wise grouping', 'Search and filter', 'Soft delete with data preservation', 'Roll number uniqueness per class']
  },
  {
    icon: MdPayment,
    title: 'Fee Tracking',
    desc: 'Track every payment with complete transparency and accuracy.',
    points: ['Record full and partial payments', 'Paid, partial, unpaid status', 'Monthly and yearly filtering', 'Admin payment correction', 'Due amount calculation']
  },
  {
    icon: MdReceipt,
    title: 'PDF Receipts & Challans',
    desc: 'Professional documents with institute branding.',
    points: ['Institute logo on receipts', 'Unique receipt numbers per institute', 'Fee challan for bank payments', 'Challan status tracking', 'Re-download anytime']
  },
  {
    icon: MdAnalytics,
    title: 'Analytics Dashboard',
    desc: 'Real-time insights into your institute finances.',
    points: ['Total students count', 'Monthly collection overview', 'Last 6 months bar chart', 'Paid vs unpaid breakdown', 'Collection rate percentage']
  },
  {
    icon: MdSecurity,
    title: 'Role Based Access',
    desc: 'Complete security with multi-role support.',
    points: ['Admin full access', 'Accountant limited access', 'Student portal access', 'JWT authentication', 'Multi-tenant data isolation']
  },
  {
    icon: MdCloud,
    title: 'Cloud Storage',
    desc: 'Secure cloud storage for all your documents.',
    points: ['Cloudinary logo storage', 'Instant image delivery', 'Automatic optimization', 'CDN backed delivery', 'Secure access control']
  },
  {
    icon: MdEmail,
    title: 'Email Reminders',
    desc: 'Automated overdue fee reminder emails.',
    points: ['Daily cron job automation', 'Professional email templates', 'Institute branding in emails', 'Sent via Resend service', 'Pakistani ISP compatible']
  },
  {
    icon: MdBusiness,
    title: 'Multi-Institute SaaS',
    desc: 'Complete data isolation between institutes.',
    points: ['Each institute is independent', 'Data never mixes', 'Separate admin per institute', 'Scalable architecture', 'Enterprise ready']
  },
]

export default function Features() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* hero */}
      <section className="pt-32 pb-16 px-6 bg-[#f4f6f9]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Powerful Features</h1>
          <p className="text-xl text-gray-500">Everything your institute needs to manage fees professionally</p>
        </div>
      </section>

      {/* features grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <feature.icon size={28} className="text-[#3498db]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{feature.desc}</p>
                  <ul className="space-y-2">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3498db] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}