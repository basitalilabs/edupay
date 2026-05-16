const FeeRecord = require("../models/FeeRecord.model");
const Student = require("../models/Student.model");
const Institute = require("../models/Institute.model");
const asyncHandler = require("../middleware/asyncHandler");
const generateReceipt = require("../utils/generateReceipt");

// @route GET /api/receipt/:feeRecordId
const downloadReceipt = asyncHandler(async (req, res) => {

  const feeRecord = await FeeRecord.findOne({
    _id: req.params.feeRecordId,
    instituteId: req.instituteId,
  })

  // check feeRecord exists first
  if (!feeRecord) {
    res.status(404)
    throw new Error('Fee record not found')
  }

  // then check student role
  if (req.user.role === 'student') {
    const myStudent = await Student.findOne({
      instituteId: req.instituteId,
      deletedAt: null
    })

    if (!myStudent || myStudent._id.toString() !== feeRecord.studentId.toString()) {
      res.status(403)
      throw new Error('Not authorized to download this receipt')
    }
  }

  if (feeRecord.status === 'unpaid') {
    res.status(400)
    throw new Error('Receipt not available for unpaid fees')
  }

  const student = await Student.findById(feeRecord.studentId)
  if (!student) {
    res.status(404)
    throw new Error('Student not found')
  }

  const institute = await Institute.findById(req.instituteId)
  if (!institute) {
    res.status(404)
    throw new Error('Institute not found')
  }

  if (!feeRecord.receiptNumber) {
    const count = await FeeRecord.countDocuments({
      instituteId: req.instituteId,
      receiptNumber: { $ne: null }
    })
    feeRecord.receiptNumber = `REC-${feeRecord.year}-${String(count + 1).padStart(4, '0')}`
    await feeRecord.save()
  }

  await generateReceipt(res, { student, fee: feeRecord, institute })
})

module.exports = { downloadReceipt }