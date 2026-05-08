const User = require('../models/User.model');
const Institute = require('../models/Institute.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');



// generate token
const generateToken = (id, role, instituteId) => {
  return jwt.sign(
    { id, role, instituteId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )
}

// @routes POST /api/auth/register

const register = asyncHandler(async (req, res) => {

    const { name, email, password, role, instituteName, instituteAddress } = req.body
    if(!name || !email || !password) {
        return res.status(400).json({ 
                success: false, 
                message: 'Please provide all required fields' 
            }
        )
    }

    const ExistingUser = await User.findOne({email});
    if(ExistingUser){
        res.status(400);
        throw new Error("Email Already Registered")
    }

    const institute = await Institute.create({
        name: instituteName,
        address : instituteAddress,
    })

    const user = await User.create({
        name,
        email,
        password,
        role: 'admin',
        instituteId: institute._id
    })

    const token = generateToken(user._id, user.role, user.instituteId);

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            instituteId: user.instituteId
        }
    });
});

// @routes POST /api/auth/login

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("Invalid email or password")
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        res.status(400);
        throw new Error("Invalid email or password")
    }

    const token = generateToken(user._id, user.role, user.instituteId);

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            instituteId: user.instituteId
        }
    });
});

module.exports = {register, login}