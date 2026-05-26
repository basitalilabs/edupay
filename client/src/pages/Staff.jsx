import { useState, useEffect } from 'react'
import { MdAdd, MdDelete, MdPerson } from 'react-icons/md'
import api from '../api/axios'
import toast from 'react-hot-toast'

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

const RoleBadge = ({ role }) => {
  const styles = {
    accountant: 'bg-blue-50 text-[#3498db]',
    student: 'bg-green-50 text-[#27ae60]'
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[role]}`}>
      {role}
    </span>
  )
}

export default function Staff() {
  const [staff, setStaff] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'accountant',
    studentId: ''
  })

  const fetchStaff = async () => {
    try {
      const { data } = await api.get('/staff')
      setStaff(data.data)
    } catch (error) {
      toast.error('Failed to fetch staff')
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
    fetchStaff()
    fetchStudents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/staff/create', form)
      toast.success(`${form.role} created successfully`)
      setShowModal(false)
      setForm({ name: '', email: '', password: '', role: 'accountant', studentId: '' })
      fetchStaff()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/staff/${deleteId}`)
      toast.success('Staff member removed successfully')
      setDeleteId(null)
      fetchStaff()
    } catch (error) {
      toast.error('Failed to delete staff member')
    }
  }

  return (
    <div className="space-y-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Staff Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage accountants and student accounts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
        >
          <MdAdd size={20} />
          Add Staff
        </button>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : staff.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <MdPerson size={48} className="mb-3 opacity-30" />
            <p className="font-medium">No staff members found</p>
            <p className="text-sm">Add accountants or student accounts</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {staff.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#3498db] bg-opacity-10 flex items-center justify-center text-[#3498db] font-bold text-sm flex-shrink-0">
                          {member.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[#2c3e50] text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                    <td className="px-6 py-4"><RoleBadge role={member.role} /></td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDeleteId(member._id)}
                        className="p-2 rounded-lg bg-red-50 text-[#e74c3c] hover:bg-red-100 transition-colors"
                      >
                        <MdDelete size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* add staff modal */}
      {showModal && (
        <Modal title="Add Staff Member" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value, studentId: '' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
              >
                <option value="accountant">Accountant</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
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
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            {form.role === 'student' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Link to Student Record
                </label>
                <select
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
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
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2c3e50] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#3d5166] transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : 'Add Staff Member'}
            </button>
          </form>
        </Modal>
      )}

      {/* delete modal */}
      {deleteId && (
        <Modal title="Remove Staff Member" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to remove this staff member? They will lose access immediately.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3 bg-[#e74c3c] text-white rounded-xl text-sm font-semibold hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}