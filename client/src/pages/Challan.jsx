import { useState, useEffect } from 'react'
import { MdAdd, MdDownload, MdCheck, MdReceipt } from 'react-icons/md'
import api from '../api/axios'
import toast from 'react-hot-toast'

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-orange-50 text-[#e67e22]',
    paid: 'bg-green-50 text-[#27ae60]',
    expired: 'bg-red-50 text-[#e74c3c]'
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status]}`}>
      {status}
    </span>
  )
}

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-[#2c3e50]">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
)

export default function Challan() {
  const [students, setStudents] = useState([])
  const [challans, setChallans] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [markPaidId, setMarkPaidId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    studentId: '',
    month: '',
    year: new Date().getFullYear(),
    dueDate: ''
  })

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students')
      setStudents(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchChallans = async (studentId) => {
    if (!studentId) return
    setLoading(true)
    try {
      const { data } = await api.get(`/challan/student/${studentId}`)
      setChallans(data.data)
    } catch (error) {
      toast.error('Failed to fetch challans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (selectedStudent) fetchChallans(selectedStudent)
    else setChallans([])
  }, [selectedStudent])

  const handleGenerateChallan = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await api.post('/challan/generate', form, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `challan-${form.month}-${form.year}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Challan generated and downloaded')
      setShowModal(false)
      setForm({ studentId: '', month: '', year: new Date().getFullYear(), dueDate: '' })
      if (selectedStudent) fetchChallans(selectedStudent)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate challan')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownloadChallan = async (challan) => {
    try {
      const response = await api.post('/challan/generate', {
        studentId: challan.studentId,
        month: challan.month,
        year: challan.year,
        dueDate: challan.dueDate
      }, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `challan-${challan.challanNumber}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Challan downloaded')
    } catch (error) {
      toast.error('Failed to download challan')
    }
  }

  const handleMarkPaid = async () => {
    try {
      await api.put(`/challan/mark-paid/${markPaidId}`)
      toast.success('Challan marked as paid')
      setMarkPaidId(null)
      if (selectedStudent) fetchChallans(selectedStudent)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark as paid')
    }
  }

  return (
    <div className="space-y-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Challan Management</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and manage fee challans</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
        >
          <MdAdd size={20} />
          Generate Challan
        </button>
      </div>

      {/* student filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Student to View Challans
        </label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} — Class {s.class} (Roll: {s.rollNo})
            </option>
          ))}
        </select>
      </div>

      {/* challans table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!selectedStudent ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <MdReceipt size={48} className="mb-3 opacity-30" />
            <p className="font-medium">Select a student to view challans</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : challans.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <MdReceipt size={48} className="mb-3 opacity-30" />
            <p className="font-medium">No challans found for this student</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Challan No</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month/Year</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {challans.map((challan) => (
                  <tr key={challan._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">{challan.challanNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {months.find(m => m.value === challan.month)?.label} {challan.year}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2c3e50]">
                      Rs. {challan.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(challan.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={challan.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadChallan(challan)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#3498db] rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                        >
                          <MdDownload size={14} />
                          Download
                        </button>
                        {challan.status === 'pending' && (
                          <button
                            onClick={() => setMarkPaidId(challan._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-[#27ae60] rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                          >
                            <MdCheck size={14} />
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* generate challan modal */}
      {showModal && (
        <Modal title="Generate Fee Challan" onClose={() => setShowModal(false)}>
          <form onSubmit={handleGenerateChallan} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Student</label>
              <select
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
              >
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} — Class {s.class} (Roll: {s.rollNo})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Month</label>
                <select
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2c3e50] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#3d5166] transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : 'Generate & Download Challan'}
            </button>
          </form>
        </Modal>
      )}

      {/* mark paid confirmation */}
      {markPaidId && (
        <Modal title="Mark Challan as Paid" onClose={() => setMarkPaidId(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to mark this challan as paid? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setMarkPaidId(null)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleMarkPaid}
              className="flex-1 py-3 bg-[#27ae60] text-white rounded-xl text-sm font-semibold hover:bg-green-600"
            >
              Mark as Paid
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}