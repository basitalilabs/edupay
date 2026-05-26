import { useState, useEffect } from 'react'
import { MdAdd, MdDownload, MdFilterList, MdEdit } from 'react-icons/md'
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
    paid: 'bg-green-50 text-[#27ae60]',
    unpaid: 'bg-red-50 text-[#e74c3c]',
    partial: 'bg-orange-50 text-[#e67e22]'
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

export default function FeeRecords() {
  const [records, setRecords] = useState([])
  const [students, setStudents] = useState([])
  const [editRecord, setEditRecord] = useState(null)
  const [editAmount, setEditAmount] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [filters, setFilters] = useState({ month: '', year: '', status: '' })
  const [form, setForm] = useState({
    studentId: '',
    month: '',
    year: new Date().getFullYear(),
    paidAmount: ''
  })

  const fetchRecords = async () => {
    try {
      const params = {}
      if (filters.month) params.month = filters.month
      if (filters.year) params.year = filters.year
      if (filters.status) params.status = filters.status
      const { data } = await api.get('/fees/institute', { params })
      setRecords(data.data)
    } catch (error) {
      toast.error('Failed to fetch fee records')
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students')
      setStudents(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRecords()
    fetchStudents()
  }, [filters])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/fees/pay', form)
      toast.success('Payment recorded successfully')
      setShowModal(false)
      setForm({ studentId: '', month: '', year: new Date().getFullYear(), paidAmount: '' })
      fetchRecords()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownloadReceipt = async (feeRecordId) => {
    try {
      const response = await api.get(`/receipt/${feeRecordId}`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `receipt-${feeRecordId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Receipt downloaded')
    } catch (error) {
      toast.error('Failed to download receipt')
    }
  }

  const handleUpdateRecord = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/fees/record/${editRecord._id}`, { paidAmount: Number(editAmount) })
      toast.success('Fee record updated successfully')
      setEditRecord(null)
      fetchRecords()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="space-y-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Fee Records</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage all fee payments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
        >
          <MdAdd size={20} />
          Record Payment
        </button>
      </div>

      {/* filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <MdFilterList size={20} className="text-gray-400" />
        <select
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] w-28"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partial</option>
        </select>
        <button
          onClick={() => setFilters({ month: '', year: '', status: '' })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <p className="font-medium">No fee records found</p>
            <p className="text-sm">Record a payment to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month/Year</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {records.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#3498db] font-bold text-sm flex-shrink-0">
                          {record.studentId?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[#2c3e50] text-sm">{record.studentId?.name}</p>
                          <p className="text-xs text-gray-400">Roll: {record.studentId?.rollNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#3498db] rounded-full text-xs font-semibold">
                        Class {record.studentId?.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {months.find(m => m.value === record.month)?.label} {record.year}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2c3e50]">Rs. {record.totalFee?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#27ae60]">Rs. {record.paidAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#e74c3c]">Rs. {record.dueAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={record.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {record.status !== 'unpaid' && (
                          <button
                            onClick={() => handleDownloadReceipt(record._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#3498db] rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                          >
                            <MdDownload size={14} />
                            Receipt
                          </button>
                        )}
                        <button
                          onClick={() => { setEditRecord(record); setEditAmount(record.paidAmount) }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-[#e67e22] rounded-lg text-xs font-semibold hover:bg-orange-100 transition-colors"
                        >
                          <MdEdit size={14} />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* record payment modal */}
      {showModal && (
        <Modal title="Record Payment" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount Paid (Rs.)</label>
              <input
                type="number"
                value={form.paidAmount}
                onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
                placeholder="e.g. 2500"
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
              ) : 'Record Payment'}
            </button>
          </form>
        </Modal>
      )}

      {/* edit payment modal */}
      {editRecord && (
        <Modal title="Edit Payment Amount" onClose={() => setEditRecord(null)}>
          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              Student: <span className="font-semibold text-[#2c3e50]">{editRecord.studentId?.name}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Month: <span className="font-semibold text-[#2c3e50]">
                {months.find(m => m.value === editRecord.month)?.label} {editRecord.year}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Total Fee: <span className="font-semibold text-[#2c3e50]">Rs. {editRecord.totalFee?.toLocaleString()}</span>
            </p>
          </div>
          <form onSubmit={handleUpdateRecord} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Correct Paid Amount (Rs.)
              </label>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
                max={editRecord.totalFee}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#e67e22] text-white py-3 rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all flex items-center justify-center"
            >
              Update Payment
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}