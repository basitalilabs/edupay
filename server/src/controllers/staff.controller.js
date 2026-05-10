const User = require("../models/User.model");
const asyncHandler = require("../middleware/asyncHandler");

// @routes GET /api/staff

const createStaff = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password || !role){
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    if(!['accountant', 'student'].includes(role)){
        res.status(400);
        throw new Error('Role must be accountant or student');
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('Email already exists');
    }

    const user = await User.create({
        name, 
        email,
        password,
        role,
        instituteId: req.instituteId
    });

    res.status(201).json({
        success : true,
        message : `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`,
        data : {
            id : user._id,
            name : user.name,
            email : user.email,
            role : user.role,
            instituteId : user.instituteId
        }
    })
});

// @routes GET /api/staff

const getStaff = asyncHandler(async(req, res) => {
    const staff = await User.find({
        instituteId : req.instituteId,
        role : {$in : ['accountant', 'student']}
    }).select('-password');

    res.json({
        success : true,
        count : staff.length,
        data : staff
    })
})

// @routes DELETE /api/staff

const deleteStaff = asyncHandler(async(req, res) => {
    const staff = await User.find({
        instituteId : req.instituteId,
        role : {$in : ['accountant', 'student']}
    }).select('-password');

    if(!staff){
        res.status(404);
        throw new Error("Staff member not found");
    }

    await User.deleteOne();

    res.json({
        success : true,
        message : "Staff member removed successfully"
    })
})

// exports to the routes

module.exports = { createStaff, getStaff, deleteStaff }