const express = require('express')
const router = express.Router()
const { generateChallanForStudent, getStudentChallans, markChallanPaid } = require('../controllers/challan.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect)

router.post('/generate', authorize('admin', 'accountant'), generateChallanForStudent)
router.get('/student/:id', authorize('admin', 'accountant', 'student'), getStudentChallans)
router.put('/mark-paid/:id', authorize('admin', 'accountant'), markChallanPaid)

module.exports = router