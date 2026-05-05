const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    token = token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')
    req.instituteId = decoded.instituteId

    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Role ${req.user.role} is not allowed` })
    }
    next()
  }
}

module.exports = { protect, authorize }