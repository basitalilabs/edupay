const Student = require('../models/Student.model');
const asyncHandler = require('../middleware/asyncHandler');

// @routes POST /api/students
const addStudent = asyncHandler(async(req, res) => {
    const {name, rollNo, class : studentClass, contact} = req.body;

    if(!name || !rollNo || !studentClass){
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const existingStudent = await Student.findOne({rollNo, instituteId: req.user.instituteId});
    if(existingStudent){
        res.status(400);
        throw new Error('Student with this roll number already exists');
    }

    const student = await Student.create({
        name, 
        rollNo,
        class : studentClass,
        contact,
        instituteId: req.instituteId
    });

    res.status(201).json({
        success: true,
        message: 'Student added successfully',
        data : student
    })
});

// @routes GET /api/students
const getStudents = asyncHandler(async(req, res) =>{
    const {search, class : studentClass} = req.query;

    const filter = {
        instituteId: req.instituteId,
        deletedAt: null
    };

    if(search){
        filter.name = { $regex: search, $options: 'i' };
    }

    if(studentClass){
        filter.class = studentClass;
    }

    const students = await Student.find(filter).sort({ createdAt : -1});

    res.json({
        success: true,
        count: students.length,
        data: students
    })
});

// @routes PUT /api/students/:id
const updateStudent = asyncHandler(async(req, res) => {

    const student = await Student.findOne({
        _id: req.params.id,
        instituteId: req.user.instituteId,
        deletedAt: null
    });

    if(!student){
        res.status(404);
        throw new Error('Student not found');
    }

    const {name, rollNo, class : studentClass, contact} = req.body;

    student.name = name || student.name;
    student.rollNo = rollNo || student.rollNo;
    student.class = studentClass || student.class;
    student.contact = contact || student.contact;

    await student.save();

    res.json({
        success: true,
        message: 'Student updated successfully',
        data: student
    })
});

// @routes DELETE /api/students/:id
const deleteStudent = asyncHandler(async(req, res) => {
    const student = await Student.findOne({
        _id: req.params.id,
        instituteId: req.user.instituteId,
        deletedAt: null
    });

    if(!student){
        res.status(404);
        throw new Error('Student not found');
    }

    student.deletedAt = new Date();
    await student.save();

    res.json({
        success: true,
        message: 'Student deleted successfully'
    });
})

module.exports = {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent
}