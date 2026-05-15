const PDFDocument = require('pdfkit')

const generateReceipt = (res, data) => {
  const { student, fee, institute } = data

  const doc = new PDFDocument({ margin: 50 })

  // set response headers
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=receipt-${student.rollNo}-${fee.month}-${fee.year}.pdf`
  )

  doc.pipe(res)

  // header
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(institute.name, { align: 'center' })

  doc
    .fontSize(12)
    .font('Helvetica')
    .text(institute.address, { align: 'center' })

  doc.moveDown()

  // title
  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('Fee Receipt', { align: 'center' })

  doc.moveDown()

  // divider
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke()

  doc.moveDown()

  // student info
  doc.fontSize(12).font('Helvetica-Bold').text('Student Information')
  doc.moveDown(0.5)
  doc.font('Helvetica')
  doc.text(`Name:        ${student.name}`)
  doc.text(`Roll No:     ${student.rollNo}`)
  doc.text(`Class:       ${student.class}`)

  doc.moveDown()

  // payment info
  doc.fontSize(12).font('Helvetica-Bold').text('Payment Details')
  doc.moveDown(0.5)
  doc.font('Helvetica')
  doc.text(`Month:       ${fee.month}/${fee.year}`)
  doc.text(`Total Fee:   Rs. ${fee.totalFee}`)
  doc.text(`Paid Amount: Rs. ${fee.paidAmount}`)
  doc.text(`Due Amount:  Rs. ${fee.dueAmount}`)
  doc.text(`Status:      ${fee.status.toUpperCase()}`)
  doc.text(`Paid On:     ${fee.paidAt ? new Date(fee.paidAt).toDateString() : 'N/A'}`)

  doc.moveDown()

  // divider
  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke()

  doc.moveDown()

  // footer
  doc
    .fontSize(10)
    .font('Helvetica')
    .text('This is a computer generated receipt.', { align: 'center' })

  doc.end()
}

module.exports = generateReceipt