const Challan = require("../models/Challan.model");
const Student = require("../models/Student.model");
const Institute = require("../models/Institute.model");
const FeeStructure = require("../models/FeeStructure.model");
const asyncHandler = require("../middleware/asyncHandler");
const generateChallan = require("../utils/generateChallan");

// @route POST /api/challan/generate
const generateChallanForStudent = asyncHandler(async (req, res) => {
  const { studentId, month, year, dueDate } = req.body;

  if (!studentId || !month || !year || !dueDate) {
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

  let challan = await Challan.findOne({
    studentId,
    month,
    year,
    instituteId: req.instituteId,
  });

  if (!challan) {
    const count = await Challan.countDocuments({
      instituteId: req.instituteId,
      challanNumber: { $ne: null },
    });

    const challanNumber = `CHN-${year}-${String(count + 1).padStart(4, "0")}`;

    challan = await Challan.create({
      studentId,
      instituteId: req.instituteId,
      month,
      year,
      totalAmount: feeStructure.monthlyAmount,
      dueDate: new Date(dueDate),
      challanNumber,
    });
  }

  const institute = await Institute.findById(req.instituteId);

  if (!institute) {
    res.status(404);
    throw new Error("Institute not found");
  }

  return generateChallan(res, {
    student,
    challan,
    institute,
  });
});

// @route GET /api/challan/student/:id
const getStudentChallans = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    _id: req.params.id,
    instituteId: req.instituteId,
    deletedAt: null
  })

  if (!student) {
    res.status(404)
    throw new Error('Student not found')
  }

  const challans = await Challan.find({
    studentId: req.params.id,
    instituteId: req.instituteId
  }).sort({ year: -1, month: -1 })

  res.json({
    success: true,
    count: challans.length,
    data: challans
  })
})


// @route PUT /api/challan/mark-paid/:id
const markChallanPaid = asyncHandler(async (req, res) => {
  const challan = await Challan.findOne({
    _id: req.params.id,
    instituteId: req.instituteId
  })

  if (!challan) {
    res.status(404)
    throw new Error('Challan not found')
  }

  if (challan.status === 'paid') {
    res.status(400)
    throw new Error('Challan already marked as paid')
  }

  challan.status = 'paid'
  challan.paidAt = new Date()
  await challan.save()

  res.json({
    success: true,
    message: 'Challan marked as paid',
    data: challan
  })
})

module.exports = { generateChallanForStudent, getStudentChallans, markChallanPaid };
