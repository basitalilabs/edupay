const express = require('express')
const router = express.Router()
const feeController = require('../controllers/fee.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect)

router.post('/structure', authorize('admin'), feeController.createFeeStructure)
router.put('/structure/:id', authorize('admin'), feeController.updateFeeStructure)
router.delete('/structure/:id', authorize('admin'), feeController.deleteFeeStructure)
router.put('/record/:id', authorize('admin', 'accountant'), feeController.updateFeeRecord)
router.post('/pay', authorize('admin', 'accountant'), feeController.recordPayment)
router.get('/structures', authorize('admin', 'accountant'), feeController.getFeeStructures)
router.get('/institute', authorize('admin', 'accountant'), feeController.getInstituteFees)
router.get('/student/:id', authorize('admin', 'accountant'), feeController.getStudentFees)

module.exports = router