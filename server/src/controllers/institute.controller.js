const Institute = require('../models/Institute.model')
const asyncHandler = require('../middleware/asyncHandler')

// @route GET /api/institute/profile
const getProfile = asyncHandler(async (req, res) => {
  const institute = await Institute.findById(req.instituteId)

  if (!institute) {
    res.status(404)
    throw new Error('Institute not found')
  }

  res.json({
    success: true,
    data: institute
  })
})

// @route PUT /api/institute/profile
const updateProfile = asyncHandler(async (req, res) => {
  const institute = await Institute.findById(req.instituteId)

  if (!institute) {
    res.status(404)
    throw new Error('Institute not found')
  }

  const { name, address } = req.body

  institute.name = name || institute.name
  institute.address = address || institute.address

  // if logo uploaded via cloudinary
  if (req.file) {
    institute.logo = req.file.path
  }

  await institute.save()

  res.json({
    success: true,
    message: 'Institute profile updated successfully',
    data: institute
  })
})

module.exports = { getProfile, updateProfile }