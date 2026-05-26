import { useState, useEffect } from 'react'
import { MdDownload, MdPayment } from 'react-icons/md'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

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

export default function StudentPortal() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMyFees = async () => {
    try {
      const { data } = await api.get('/student-portal/fees')
      setData(data.data)
    } catch (error) {
      toast.error('Failed to fetch fee records')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyFees()
  }, [])

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

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">

      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2c3e50]">My Fees</h1>
        <p className="text-gray-500 text-sm mt-1">View your fee records and download receipts</p>
      </div>

      {/* student info + summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* student card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#3498db] bg-opacity-10 flex items-center justify-center text-[#3498db] font-bold text-xl flex-shrink-0">
            {data?.student?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-[#2c3e50]">{data?.student?.name}</p>
            <p className="text-sm text-gray-500">Roll No: {data?.student?.rollNo}</p>
            <p className="text-sm text-gray-500">Class: {data?.student?.class}</p>
          </div>
        </div>

        {/* total paid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-[#27ae60] mt-1">
            Rs. {data?.totalPaid?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">All time payments</p>
        </div>

        {/* total due */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-500">Total Due</p>
          <p className="text-2xl font-bold text-[#e74c3c] mt-1">
            Rs. {data?.totalDue?.toLocaleString() || 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">Remaining balance</p>
        </div>
      </div>

      {/* fee records table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-[#2c3e50]">Fee History</h3>
          <p className="text-sm text-gray-400 mt-0.5">All your fee records</p>
        </div>

        {!data?.fees?.length ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <MdPayment size={48} className="mb-3 opacity-30" />
            <p className="font-medium">No fee records found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Month/Year</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Fee</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.fees.map((fee) => (
                  <tr key={fee._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#2c3e50]">
                      {months.find(m => m.value === fee.month)?.label} {fee.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Rs. {fee.totalFee?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#27ae60]">Rs. {fee.paidAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#e74c3c]">Rs. {fee.dueAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4"><StatusBadge status={fee.status} /></td>
                    <td className="px-6 py-4">
                      {fee.status !== 'unpaid' && (
                        <button
                          onClick={() => handleDownloadReceipt(fee._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#3498db] rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                        >
                          <MdDownload size={14} />
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}