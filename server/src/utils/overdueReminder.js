const cron = require('node-cron')
const FeeRecord = require('../models/FeeRecord.model')
const Student = require('../models/Student.model')
const Institute = require('../models/Institute.model')
const User = require('../models/User.model')
const sendEmail = require('../config/email')
const { overdueTemplate } = require('./emailTemplates')

const startOverdueReminder = () => {
  // runs every day at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('Running overdue fee reminder...')

    try {
      const currentMonth = new Date().getMonth() + 1
      const currentYear = new Date().getFullYear()

      // find all unpaid and partial fee records for current month
      const overdueRecords = await FeeRecord.find({
        month: currentMonth,
        year: currentYear,
        status: { $in: ['unpaid', 'partial'] }
      })

      console.log(`Found ${overdueRecords.length} overdue records`)

      for (const record of overdueRecords) {
        try {
          const student = await Student.findById(record.studentId)
          if (!student || student.deletedAt) 
            continue

          const institute = await Institute.findById(record.instituteId)
          if (!institute) 
            continue

          // find student user account to get email
          const studentUser = await User.findOne({
            instituteId: record.instituteId,
            role: 'student'
          })

          if (!studentUser) 
            continue

          await sendEmail({
            to: studentUser.email,
            subject: `Fee Due Reminder - ${institute.name}`,
            html: overdueTemplate(
              student.name,
              record.month,
              record.year,
              record.dueAmount,
              institute.name
            )
          })

          console.log(`Reminder sent to ${studentUser.email}`)
        } catch (err) {
          console.error(`Failed to send reminder for record ${record._id}:`, err.message)
        }
      }
    } catch (error) {
      console.error('Overdue reminder error:', error.message)
    }
  })

  console.log('Overdue reminder cron job started')
}

module.exports = startOverdueReminder