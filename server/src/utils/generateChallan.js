const PDFDocument = require('pdfkit')
const https = require('https')
const http = require('http')

const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (res) => {
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    })
  })
}

const generateChallan = async (res, data) => {
  const { student, challan, institute } = data

  const doc = new PDFDocument({ margin: 50, size: 'A4' })

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=challan-${student.rollNo}-${challan.month}-${challan.year}.pdf`
  )

  doc.pipe(res)

  // ─── HEADER ───
  if (institute.logo) {
    try {
      const imgBuffer = await fetchImage(institute.logo)
      doc.image(imgBuffer, 50, 40, { width: 70, height: 70 })
    } catch (e) {}
  }

  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(institute.name, 130, 50, { align: 'left' })

  doc
    .fontSize(11)
    .font('Helvetica')
    .text(institute.address, 130, 75)

  doc
    .fontSize(10)
    .text(`Challan No: ${challan.challanNumber}`, 130, 92)

  // divider
  doc.moveDown(3)
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).stroke('#333333')
  doc.moveDown(0.5)

  // ─── TITLE ───
  doc
  .fontSize(14)
  .font('Helvetica-Bold')
  .fillColor('#333333')
  .text('FEE CHALLAN', 50, doc.y, { align: 'center', width: 500 })

  doc.moveDown(0.5)

  // status badge
  const statusColor = challan.status === 'paid' ? '#27ae60' : challan.status === 'expired' ? '#e74c3c' : '#e67e22'
  doc
  .fontSize(10)
  .fillColor(statusColor)
  .text(`Status: ${challan.status.toUpperCase()}`, 50, doc.y, { align: 'center', width: 500 })

  doc.moveDown(0.8)

  // ─── STUDENT INFO TABLE ───
  const col1 = 50
  const col2 = 200
  const col3 = 350
  const col4 = 450
  const rowH = 28

  let tableTop = doc.y

  // student header
  doc.rect(col1, tableTop, 500, rowH).fill('#2c3e50')
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor('#ffffff')
    .text('Student Information', col1 + 10, tableTop + 8)

  // row 1
  let rowY = tableTop + rowH
  doc.rect(col1, rowY, 500, rowH).fill('#f2f2f2').stroke('#cccccc')
  doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333')
    .text('Name', col1 + 10, rowY + 8)
  doc.font('Helvetica').text(student.name, col2, rowY + 8)
  doc.font('Helvetica-Bold').text('Roll No', col3, rowY + 8)
  doc.font('Helvetica').text(student.rollNo, col4, rowY + 8)

  // row 2
  rowY += rowH
  doc.rect(col1, rowY, 500, rowH).fill('#ffffff').stroke('#cccccc')
  doc.font('Helvetica-Bold').fillColor('#333333')
    .text('Class', col1 + 10, rowY + 8)
  doc.font('Helvetica').text(student.class, col2, rowY + 8)

  rowY += rowH + 15

  // ─── PAYMENT INFO TABLE ───
  doc.rect(col1, rowY, 500, rowH).fill('#2c3e50')
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor('#ffffff')
    .text('Payment Details', col1 + 10, rowY + 8)

  const payments = [
    ['Month / Year', `${challan.month} / ${challan.year}`, 'Total Amount', `Rs. ${challan.totalAmount}`],
    ['Due Date', new Date(challan.dueDate).toDateString(), 'Paid On', challan.paidAt ? new Date(challan.paidAt).toDateString() : 'Not Paid Yet'],
  ]

  payments.forEach((row, i) => {
    rowY += rowH
    const bg = i % 2 === 0 ? '#f2f2f2' : '#ffffff'
    doc.rect(col1, rowY, 500, rowH).fill(bg).stroke('#cccccc')
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#333333')
      .text(row[0], col1 + 10, rowY + 8)
    doc.font('Helvetica').text(row[1], col2, rowY + 8)
    doc.font('Helvetica-Bold').text(row[2], col3, rowY + 8)
    doc.font('Helvetica').text(row[3], col4, rowY + 8)
  })

  // ─── BANK PAYMENT SECTION ───
  rowY += rowH + 20
  doc.rect(col1, rowY, 500, rowH).fill('#ecf0f1').stroke('#cccccc')
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor('#2c3e50')
    .text('Please present this challan at the bank or institute office before the due date.', col1 + 10, rowY + 8, { width: 480 })

  // ─── FOOTER ───
  doc.moveDown(4)
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(0.5).stroke('#cccccc')
  doc.moveDown(0.5)
  doc
    .fontSize(9)
    .font('Helvetica')
    .fillColor('#888888')
    .text(
      'This is a computer generated challan and does not require a signature.',
      50, doc.y,
      { align: 'center', width: 500 }
    )

  doc.end()
}

module.exports = generateChallan