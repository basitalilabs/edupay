import { useState, useEffect, useRef } from 'react'
import { MdEdit, MdBusiness, MdLocationOn, MdCameraAlt } from 'react-icons/md'
import api from '../api/axios'
import toast from 'react-hot-toast'

export default function InstituteProfile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({ name: '', address: '' })
    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)
    const fileRef = useRef()

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/institute/profile')
            setProfile(data.data)
            setForm({ name: data.data.name, address: data.data.address || '' })
        } catch (error) {
            toast.error('Failed to fetch institute profile')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleLogoChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setLogoFile(file)
        setLogoPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const formData = new FormData()
            formData.append('name', form.name)
            formData.append('address', form.address)
            if (logoFile) formData.append('logo', logoFile)

            await api.put('/institute/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            toast.success('Profile updated successfully')
            setEditing(false)
            setLogoFile(null)
            setLogoPreview(null)
            fetchProfile()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
        </div>
    )

    return (
        <div className="space-y-6 max-w-3xl">

            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#2c3e50]">Institute Profile</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your institute information</p>
                </div>
                {!editing && (
                    <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 bg-[#2c3e50] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all shadow-md"
                    >
                        <MdEdit size={18} />
                        Edit Profile
                    </button>
                )}
            </div>

            {/* profile card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* banner */}
                <div className="h-32 bg-gradient-to-r from-[#2c3e50] to-[#3498db]" />

                {/* logo and name */}
                <div className="px-8 pb-8">
                    <div className="flex items-end gap-5 -mt-12 mb-6">
                        <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white flex items-center justify-center">
                                {logoPreview || profile?.logo ? (
                                    <img
                                        src={logoPreview || profile?.logo}
                                        alt="Institute Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <MdBusiness size={40} className="text-gray-300" />
                                )}
                            </div>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={() => fileRef.current.click()}
                                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#3498db] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors"
                                >
                                    <MdCameraAlt size={14} />
                                </button>
                            )}
                            <input
                                type="file"
                                ref={fileRef}
                                onChange={handleLogoChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* name below logo — not overlapping banner */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#2c3e50]">{profile?.name}</h2>
                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
                            <MdLocationOn size={14} />
                            {profile?.address || 'No address added'}
                        </p>
                    </div>

                    {/* edit form */}
                    {editing ? (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Institute Name</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        placeholder="e.g. Lahore, Pakistan"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db]"
                                    />
                                </div>
                            </div>

                            {logoPreview && (
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                                    <img src={logoPreview} alt="preview" className="w-10 h-10 rounded-lg object-cover" />
                                    <p className="text-sm text-[#3498db] font-medium">New logo selected</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false)
                                        setLogoFile(null)
                                        setLogoPreview(null)
                                        setForm({ name: profile.name, address: profile.address || '' })
                                    }}
                                    className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-[#2c3e50] text-white rounded-xl text-sm font-semibold hover:bg-[#3d5166] transition-all disabled:opacity-50 flex items-center justify-center"
                                >
                                    {submitting ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Institute Name</p>
                                <p className="text-sm font-medium text-[#2c3e50]">{profile?.name}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                                <p className="text-sm font-medium text-[#2c3e50]">{profile?.address || '—'}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Created</p>
                                <p className="text-sm font-medium text-[#2c3e50]">
                                    {new Date(profile?.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Logo</p>
                                <p className="text-sm font-medium text-[#2c3e50]">
                                    {profile?.logo ? 'Uploaded' : 'Not uploaded'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}