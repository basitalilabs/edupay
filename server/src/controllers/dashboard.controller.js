const Student = require('../models/Student.model')
const FeeRecord = require('../models/FeeRecord.model')
const asyncHandler = require('../middleware/asyncHandler')

// @route GET /api/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
  const instituteId = req.instituteId

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  // total students
  const totalStudents = await Student.countDocuments({
    instituteId,
    deletedAt: null
  })

  // this month fee records
  const monthlyFees = await FeeRecord.find({
    instituteId,
    month: currentMonth,
    year: currentYear
  })

  const totalCollected = monthlyFees.reduce((acc, fee) => acc + fee.paidAmount, 0)
  const totalDue = monthlyFees.reduce((acc, fee) => acc + fee.dueAmount, 0)

  const paidCount = monthlyFees.filter(fee => fee.status === 'paid').length
  const unpaidCount = monthlyFees.filter(fee => fee.status === 'unpaid').length
  const partialCount = monthlyFees.filter(fee => fee.status === 'partial').length

  // last 6 months collection
  const last6Months = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const fees = await FeeRecord.find({ instituteId, month, year })
    const collected = fees.reduce((acc, fee) => acc + fee.paidAmount, 0)

    last6Months.push({
      month,
      year,
      collected
    })
  }

  res.json({
    success: true,
    data: {
      totalStudents,
      currentMonth: {
        totalCollected,
        totalDue,
        paidCount,
        unpaidCount,
        partialCount
      },
      last6Months
    }
  })
})

module.exports = { getDashboardStats }