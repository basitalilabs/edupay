const express = require('express')
const router = express.Router()
const { getMyFees } = require('../controllers/studentPortal.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect);

router.get("/fees", authorize('student'), getMyFees);

module.exports = router;