const express = require('express')
const router = express.Router()
const { getProfile, updateProfile } = require('../controllers/institute.controller')
const { protect, authorize } = require('../middleware/auth.middleware')
const { upload } = require('../config/cloudinary')

router.use(protect)

router.get('/profile', authorize('admin'), getProfile)
router.put('/profile', authorize('admin'), upload.single('logo'), updateProfile)

module.exports = router;