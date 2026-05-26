import { useState, useEffect } from 'react'
import { MdAdd, MdEdit, MdDelete, MdSearch, MdPeople } from 'react-icons/md'
import api from '../api/axios'
import toast from 'react-hot-toast'

const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']

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

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState({ name: '', rollNo: '', class: '', contact: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchStudents = async () => {
    try {
      const params = {}
      if (search) params.search = search
      if (classFilter) params.class = classFilter
      const { data } = await api.get('/students', { params })
      setStudents(data.data)
    } catch (error) {
      toast.error('Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [search, classFilter])

  const openAdd = () => {
    setEditStudent(null)
    setForm({ name: '', rollNo: '', class: '', contact: '' })
    setShowModal(true)
  }

  const openEdit = (student) => {
    setEditStudent(student)
    setForm({
      name: student.name,
      rollNo: student.rollNo,
      class: student.class,
      contact: student.contact || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editStudent) {
        await api.put(`/students/${editStudent._id}`, form)
        toast.success('Student updated successfully')
      } else {
        await api.post('/students', form)
        toast.success('Student added successfully')
      }
      setShowModal(false)
      fetchStudents()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/students/${deleteId}`)
      toast.success('Student removed successfully')
      setDeleteId(null)
      fetchStudents()
    } catch (error) {
      toast.error('Failed to delete student')
    }
  }

  return (
    <div className="space-y-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Students</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your institute students</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
        >
          <MdAdd size={20} />
          Add Student
        </button>
      </div>

      {/* filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
          />
        </div>
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <MdPeople size={48} className="mb-3 opacity-30" />
            <p className="font-medium">No students found</p>
            <p className="text-sm">Add your first student to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#3498db] bg-opacity-10 flex items-center justify-center text-[#3498db] font-bold text-sm flex-shrink-0">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-[#2c3e50] text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.rollNo}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-[#3498db] rounded-full text-xs font-semibold">
                        Class {student.class}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.contact || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(student)}
                          className="p-2 rounded-lg bg-blue-50 text-[#3498db] hover:bg-blue-100 transition-colors"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(student._id)}
                          className="p-2 rounded-lg bg-red-50 text-[#e74c3c] hover:bg-red-100 transition-colors"
                        >
                          <MdDelete size={16} />
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

      {/* add/edit modal */}
      {showModal && (
        <Modal
          title={editStudent ? 'Edit Student' : 'Add New Student'}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Student full name"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Roll Number</label>
              <input
                type="text"
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                placeholder="e.g. 101"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
              <select
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white"
              >
                <option value="">Select class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact (optional)</label>
              <input
                type="text"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="e.g. 03001234567"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2c3e50] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#3d5166] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : editStudent ? 'Update Student' : 'Add Student'}
            </button>
          </form>
        </Modal>
      )}

      {/* delete confirmation modal */}
      {deleteId && (
        <Modal title="Delete Student" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">Are you sure you want to remove this student? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3 bg-[#e74c3c] text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}