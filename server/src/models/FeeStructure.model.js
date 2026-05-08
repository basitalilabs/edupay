const mongoose = require('mongoose')

const feeStructureSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
    trim: true
  },
  monthlyAmount: {
    type: Number,
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },
  academicYear: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true })

feeStructureSchema.index(
  { class: 1, instituteId: 1, academicYear: 1 },
  { unique: true }
)

module.exports = mongoose.model('FeeStructure', feeStructureSchema)