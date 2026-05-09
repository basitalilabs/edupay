const express = require('express')
const router = express.Router()
const { getDashboardStats } = require('../controllers/dashboard.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect)

router.get('/', authorize('admin'), getDashboardStats)

module.exports = router