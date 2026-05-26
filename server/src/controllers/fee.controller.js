const FeeStructure = require("../models/FeeStructure.model");
const FeeRecord = require("../models/FeeRecord.model");
const Student = require("../models/Student.model");
const asyncHandler = require("../middleware/asyncHandler");

// @routes POST /api/fees/structure

const createFeeStructure = asyncHandler(async (req, res) => {
  const { class: StudentClass, monthlyAmount, academicYear } = req.body;

  if (!StudentClass || !monthlyAmount || !academicYear) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const existing = await FeeStructure.findOne({
    class: StudentClass,
    monthlyAmount,
    academicYear,
  });

  if (existing) {
    res.status(400);
    throw new Error(
      "Fee structure already exists for this class and academic year",
    );
  }

  const feeStructure = await FeeStructure.create({
    class: StudentClass,
    monthlyAmount,
    academicYear,
    instituteId: req.instituteId,
  });

  res.status(201).json({
    success: true,
    message: "Fee structure created successfully",
    data: feeStructure,
  });
});

// @routes POST /api/fees/pays

const recordPayment = asyncHandler(async (req, res) => {
  const { studentId, month, year, paidAmount } = req.body;

  if (!studentId || !month || !year || !paidAmount) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const student = await Student.findOne({
    _id: studentId,
    instituteId: req.instituteId,
    deletedAt: null,
  });

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  const feeStructure = await FeeStructure.findOne({
    class: student.class,
    instituteId: req.instituteId,
  });

  if (!feeStructure) {
    res.status(404);
    throw new Error("Fee structure not found for student class");
  }

  // check if fee record already exists
  let feeRecord = await FeeRecord.findOne({
    studentId,
    month,
    year,
  });

  if (feeRecord && feeRecord.status === "paid") {
    res.status(400);
    throw new Error("Fee already paid for this month");
  }

  const totalFee = feeStructure.monthlyAmount;
  const dueAmount = totalFee - paidAmount;

  if (feeRecord) {
    // update existing record
    feeRecord.paidAmount = paidAmount;
    feeRecord.dueAmount = dueAmount;
    feeRecord.status = dueAmount <= 0 ? "paid" : "partial";
    feeRecord.paidAt = dueAmount <= 0 ? new Date() : null;
    await feeRecord.save();
  } else {
    // create new record
    feeRecord = await FeeRecord.create({
      studentId,
      instituteId: req.instituteId,
      month,
      year,
      totalFee,
      paidAmount,
      dueAmount,
      status: dueAmount <= 0 ? "paid" : "partial",
      paidAt: dueAmount <= 0 ? new Date() : null,
    });
  }

  res.status(201).json({
    success: true,
    message: "Payment recorded successfully",
    data: feeRecord,
  });
});

// @routes GET /api/fees/student/:id
const getStudentFees = asyncHandler(async (req, res) => {

  const student = await Student.findOne({
    _id: req.params.id,
    instituteId: req.instituteId,
    deletedAt: null,
  });

  if(!student){
    res.status(404);
    throw new Error("Student not found");
  }

  const fees = await FeeRecord.find({
    studentId: req.params.id,
    instituteId: req.instituteId,
  }).sort({ year: -1, month: -1});

  res.json({
    success: true,
    count : fees.length,
    data: fees
  })
});

// @routes GET /api/fees/institute
const getInstituteFees = asyncHandler(async (req, res) => {
    const {month, year, status} = req.query;

    const filter = { instituteId: req.instituteId };

    if(month) filter.month = month;
    if(year) filter.year = year;
    if(status) filter.status = status;

    const fees = await FeeRecord.find(filter)
    .populate('studentId', 'name rollNo class')
    .sort({ createdAt: -1 });

    const totalCollected = fees
    .reduce((acc, fee) => acc + fee.paidAmount, 0);

    const totalDue = fees
    .reduce((acc, fee) => acc + fee.dueAmount, 0);

    res.json({
        success: true,
        count: fees.length,
        totalCollected,
        totalDue,
        data : fees
    });
});

// @route GET /api/fees/structures
const getFeeStructures = asyncHandler(async (req, res) => {
  const structures = await FeeStructure.find({
    instituteId: req.instituteId
  }).sort({ class: 1 })

  res.json({
    success: true,
    count: structures.length,
    data: structures
  });
});

// @route PUT /api/fees/structure/:id
const updateFeeStructure = asyncHandler(async (req, res) => {
  const { monthlyAmount, academicYear } = req.body

  const structure = await FeeStructure.findOne({
    _id: req.params.id,
    instituteId: req.instituteId
  })

  if (!structure) {
    res.status(404)
    throw new Error('Fee structure not found')
  }

  structure.monthlyAmount = monthlyAmount || structure.monthlyAmount
  structure.academicYear = academicYear || structure.academicYear

  await structure.save()

  res.json({
    success: true,
    message: 'Fee structure updated successfully',
    data: structure
  });
});


// @route DELETE /api/fees/structure/:id
const deleteFeeStructure = asyncHandler(async (req, res) => {
  const structure = await FeeStructure.findOne({
    _id: req.params.id,
    instituteId: req.instituteId
  })

  if (!structure) {
    res.status(404)
    throw new Error('Fee structure not found')
  }

  await structure.deleteOne()

  res.json({
    success: true,
    message: 'Fee structure deleted successfully'
  });
});

// @route PUT /api/fees/record/:id
const updateFeeRecord = asyncHandler(async (req, res) => {
  const { paidAmount } = req.body

  if (!paidAmount) {
    res.status(400)
    throw new Error('Please provide paid amount')
  }

  const feeRecord = await FeeRecord.findOne({
    _id: req.params.id,
    instituteId: req.instituteId
  })

  if (!feeRecord) {
    res.status(404)
    throw new Error('Fee record not found')
  }

  const dueAmount = feeRecord.totalFee - paidAmount

  feeRecord.paidAmount = paidAmount
  feeRecord.dueAmount = dueAmount
  feeRecord.status = dueAmount <= 0 ? 'paid' : dueAmount === feeRecord.totalFee ? 'unpaid' : 'partial'
  feeRecord.paidAt = dueAmount <= 0 ? new Date() : null

  await feeRecord.save()

  res.json({
    success: true,
    message: 'Fee record updated successfully',
    data: feeRecord
  })
})

module.exports = {
    createFeeStructure,
    updateFeeStructure,
    deleteFeeStructure,
    updateFeeRecord,
    recordPayment,
    getStudentFees,
    getFeeStructures,
    getInstituteFees
}