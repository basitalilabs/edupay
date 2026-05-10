const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express()

app.use(cors({ origin: process.env.CLIENT_URI }))
app.use(express.json())

// health check
app.get('/', (req, res) => {
  res.json({ message: 'EduPay API is running' })
})

// api routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/students', require('./routes/student.routes'))
app.use('/api/fees', require('./routes/fee.routes'))
app.use('/api/dashboard', require('./routes/dashboard.routes'))
app.use('/api/staff', require("./routes/staff.routes"));
app.use('/api/student-portal', require('./routes/studentPortal.routes'))

// error handler
app.use(errorHandler)

// port configuration
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))