const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  rollNo: {
    type: String,
    required: true,
    trim: true
  },

  class: {
    type: String,
    required: true,
    trim: true
  },

  contact: {
    type: String,
    trim: true
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true
  },

  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

studentSchema.index(
    { rollNo: 1, instituteId: 1 },
    { unique: true }
)

module.exports = mongoose.model('Student', studentSchema)