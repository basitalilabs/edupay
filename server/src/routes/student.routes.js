const express = require('express')
const router = express.Router()
const { addStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/student.controller')
const { protect, authorize } = require('../middleware/auth.middleware')

router.use(protect)

router.post('/', authorize('admin', 'accountant'), addStudent)
router.get('/', authorize('admin', 'accountant'), getStudents)
router.put('/:id', authorize('admin', 'accountant'), updateStudent)
router.delete('/:id', authorize('admin'), deleteStudent)

module.exports = router