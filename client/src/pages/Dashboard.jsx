import { useState, useEffect } from 'react'
import { MdPeople, MdAttachMoney, MdWarning, MdTrendingUp } from 'react-icons/md'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import api from '../api/axios'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={26} className={color} />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-[#2c3e50] mt-0.5">{value}</p>
        </div>
    </div>
)

export default function Dashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard')
                setStats(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin" />
        </div>
    )

    const chartData = stats?.last6Months?.map((item) => ({
        name: `${monthNames[item.month - 1].slice(0, 3)} '${String(item.year).slice(2)}`,
        collected: item.collected
    }))

    return (
        <div className="space-y-6">

            {/* page header */}
            <div>
                <h1 className="text-2xl font-bold text-[#2c3e50]">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Overview of your institute's fee management</p>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard
                    title="Total Students"
                    value={stats?.totalStudents || 0}
                    icon={MdPeople}
                    color="text-[#3498db]"
                    bg="bg-blue-50"
                />
                <StatCard
                    title="Collected This Month"
                    value={`Rs. ${stats?.currentMonth?.totalCollected?.toLocaleString() || 0}`}
                    icon={MdAttachMoney}
                    color="text-[#27ae60]"
                    bg="bg-green-50"
                />
                <StatCard
                    title="Pending Dues"
                    value={`Rs. ${stats?.currentMonth?.totalDue?.toLocaleString() || 0}`}
                    icon={MdWarning}
                    color="text-[#e74c3c]"
                    bg="bg-red-50"
                />
                <StatCard
                    title="Collection Rate"
                    value={
                        stats?.currentMonth?.totalCollected + stats?.currentMonth?.totalDue > 0
                            ? `${Math.round((stats?.currentMonth?.totalCollected / (stats?.currentMonth?.totalCollected + stats?.currentMonth?.totalDue)) * 100)}%`
                            : '0%'
                    }
                    icon={MdTrendingUp}
                    color="text-[#e67e22]"
                    bg="bg-orange-50"
                />
            </div>

            {/* chart + status */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                {/* bar chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-[#2c3e50] font-bold text-base mb-1">Monthly Collection</h3>
                    <p className="text-gray-400 text-sm mb-6">Last 6 months fee collection overview</p>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={chartData} barSize={36}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Collected']}
                            />
                            <Bar dataKey="collected" fill="#3498db" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* fee status breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-[#2c3e50] font-bold text-base mb-1">This Month Status</h3>
                    <p className="text-gray-400 text-sm mb-6">Fee payment breakdown</p>

                    <div className="space-y-4">
                        {[
                            { label: 'Paid', count: stats?.currentMonth?.paidCount || 0, color: 'bg-[#27ae60]', light: 'bg-green-50', text: 'text-[#27ae60]' },
                            { label: 'Partial', count: stats?.currentMonth?.partialCount || 0, color: 'bg-[#e67e22]', light: 'bg-orange-50', text: 'text-[#e67e22]' },
                            { label: 'Unpaid', count: stats?.currentMonth?.unpaidCount || 0, color: 'bg-[#e74c3c]', light: 'bg-red-50', text: 'text-[#e74c3c]' },
                        ].map((item) => (
                            <div key={item.label} className={`flex items-center justify-between p-4 ${item.light} rounded-xl`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                </div>
                                <span className={`text-lg font-bold ${item.text}`}>{item.count}</span>
                            </div>
                        ))}
                    </div>

                    {/* total */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500 font-medium">Total Records</span>
                        <span className="text-lg font-bold text-[#2c3e50]">
                            {(stats?.currentMonth?.paidCount || 0) + (stats?.currentMonth?.unpaidCount || 0) + (stats?.currentMonth?.partialCount || 0)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}