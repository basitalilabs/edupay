import { useState, useEffect } from 'react'
import { MdAdd, MdAccountBalance, MdEdit, MdDelete } from 'react-icons/md'
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

export default function FeeStructure() {
  const [structures, setStructures] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editStructure, setEditStructure] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    class: '',
    monthlyAmount: '',
    academicYear: ''
  })

  const fetchStructures = async () => {
    try {
      const { data } = await api.get('/fees/structures')
      setStructures(data.data)
    } catch (error) {
      toast.error('Failed to fetch fee structures')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStructures()
  }, [])

  const openAdd = () => {
    setEditStructure(null)
    setForm({ class: '', monthlyAmount: '', academicYear: '' })
    setShowModal(true)
  }

  const openEdit = (structure) => {
    setEditStructure(structure)
    setForm({
      class: structure.class,
      monthlyAmount: structure.monthlyAmount,
      academicYear: structure.academicYear
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editStructure) {
        await api.put(`/fees/structure/${editStructure._id}`, form)
        toast.success('Fee structure updated successfully')
      } else {
        await api.post('/fees/structure', form)
        toast.success('Fee structure created successfully')
      }
      setShowModal(false)
      setEditStructure(null)
      setForm({ class: '', monthlyAmount: '', academicYear: '' })
      fetchStructures()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/fees/structure/${deleteId}`)
      toast.success('Fee structure deleted successfully')
      setDeleteId(null)
      fetchStructures()
    } catch (error) {
      toast.error('Failed to delete fee structure')
    }
  }

  return (
    <div className="space-y-6">

      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2c3e50]">Fee Structure</h1>
          <p className="text-gray-500 text-sm mt-1">Set monthly fee for each class</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
        >
          <MdAdd size={20} />
          Add Structure
        </button>
      </div>

      {/* cards */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : structures.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center h-48 text-gray-400">
          <MdAccountBalance size={48} className="mb-3 opacity-30" />
          <p className="font-medium">No fee structures found</p>
          <p className="text-sm">Create fee structure for your classes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {structures.map((structure) => (
            <div key={structure._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <MdAccountBalance size={24} className="text-[#3498db]" />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(structure)}
                    className="p-2 rounded-lg bg-blue-50 text-[#3498db] hover:bg-blue-100 transition-colors"
                  >
                    <MdEdit size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteId(structure._id)}
                    className="p-2 rounded-lg bg-red-50 text-[#e74c3c] hover:bg-red-100 transition-colors"
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#2c3e50]">Class {structure.class}</h3>
              <p className="text-gray-500 text-sm mt-1">Academic Year: {structure.academicYear}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-xs font-medium">Monthly Fee</p>
                <p className="text-2xl font-bold text-[#2c3e50] mt-1">
                  Rs. {structure.monthlyAmount?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* add/edit modal */}
      {showModal && (
        <Modal
          title={editStructure ? 'Edit Fee Structure' : 'Create Fee Structure'}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
              <select
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                required
                disabled={!!editStructure}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white disabled:opacity-50"
              >
                <option value="">Select class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Amount (Rs.)</label>
              <input
                type="number"
                value={form.monthlyAmount}
                onChange={(e) => setForm({ ...form, monthlyAmount: e.target.value })}
                placeholder="e.g. 2500"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Academic Year</label>
              <input
                type="text"
                value={form.academicYear}
                onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                placeholder="e.g. 2025-2026"
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
              ) : editStructure ? 'Update Fee Structure' : 'Create Fee Structure'}
            </button>
          </form>
        </Modal>
      )}

      {/* delete modal */}
      {deleteId && (
        <Modal title="Delete Fee Structure" onClose={() => setDeleteId(null)}>
          <p className="text-gray-600 text-sm mb-6">
            Are you sure you want to delete this fee structure? This cannot be undone.
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
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}