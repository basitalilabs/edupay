import { Link } from 'react-router-dom'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#3498db] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-white font-bold text-xl">EduPay</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              The complete SaaS fee management solution for modern educational institutes.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['f', 'in', 'tw'].map((s) => (
                <div key={s} className="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-opacity-20 transition-all">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* product */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', path: '/features' },
                { label: 'Pricing', path: '/pricing' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* features */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Features
            </h4>
            <ul className="space-y-3">
              {[
                'Student Management',
                'Fee Tracking',
                'PDF Receipts',
                'Challan Generation',
                'Analytics Dashboard',
                'Multi-Institute'
              ].map((item) => (
                <li key={item} className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdEmail size={16} className="text-[#3498db] mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  support@edupay.io
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MdPhone size={16} className="text-[#3498db] mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  +92 300 1234567
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MdLocationOn size={16} className="text-[#3498db] mt-0.5 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Lahore, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-12 pt-8 border-t border-white border-opacity-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 EduPay. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}