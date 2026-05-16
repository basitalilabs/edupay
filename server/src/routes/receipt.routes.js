const express = require('express')
const router = express.Router()
const { downloadReceipt } = require('../controllers/receipt.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect)

router.get('/:feeRecordId', authorize('admin', 'accountant', 'student'), downloadReceipt)

module.exports = router