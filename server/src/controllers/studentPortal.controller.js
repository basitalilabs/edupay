const FeeRecord = require("../models/FeeRecord.model");
const Student = require("../models/Student.model");
const asyncHandler = require("../middleware/asyncHandler");


const getMyFees = asyncHandler(async (req, res) => {
  const student = await Student.findOne({
    instituteId: req.instituteId,
    deletedAt: null,
  });

  if (!student) {
    res.status(404);
    throw new Error("Student record not found");
  }

  const fees = await FeeRecord.find({
    studentId: student._id,
    instituteId: req.instituteId,
  }).sort({ year: -1, month: -1 });

  const totalDue = fees.reduce((acc, fee) => acc + fee.dueAmount, 0);
  const totalPaid = fees.reduce((acc, fee) => acc + fee.paidAmount, 0);

  res.json({
    success: true,
    data: {
      student: {
        name: student.name,
        rollNo: student.rollNo,
        class: student.class,
      },
      totalPaid,
      totalDue,
      fees,
    },
  });
});

module.exports = { getMyFees };
