import { useState } from 'react'
import Navbar from '../../components/landing/Navbar'
import Footer from '../../components/landing/Footer'
import { MdEmail, MdPhone, MdLocationOn, MdSend } from 'react-icons/md'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
      setSubmitting(false)
    }, 1500)
  }

  return (
    <div className="bg-white">
      <Navbar />

      {/* hero */}
      <section className="pt-32 pb-16 px-6 bg-[#f4f6f9]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#2c3e50] mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-500">Have questions? We would love to hear from you.</p>
        </div>
      </section>

      {/* contact */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#2c3e50] mb-6">Contact Information</h3>
            </div>
            {[
              { icon: MdEmail, label: 'Email', value: 'support@edupay.io' },
              { icon: MdPhone, label: 'Phone', value: '+92 321 6031 528' },
              { icon: MdLocationOn, label: 'Location', value: 'Sargodha, Pakistan' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-[#3498db]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-[#2c3e50] font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Business Hours</p>
              <p className="text-sm text-[#2c3e50] font-medium">Monday - Friday: 9AM - 6PM</p>
              <p className="text-sm text-[#2c3e50] font-medium">Saturday: 10AM - 2PM</p>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-[#2c3e50] mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-[#2c3e50] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#3d5166] transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <MdSend size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}