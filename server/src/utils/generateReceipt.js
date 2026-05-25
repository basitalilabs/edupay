const PDFDocument = require("pdfkit");
const https = require("https");
const http = require("http");

const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
  });
};

const generateReceipt = async (res, data) => {
  const { student, fee, institute } = data;

  const doc = new PDFDocument({ margin: 50, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt-${student.rollNo}-${fee.month}-${fee.year}.pdf`,
  );

  doc.pipe(res);

  // ─── HEADER ───
  if (institute.logo) {
    try {
      const imgBuffer = await fetchImage(institute.logo);
      doc.image(imgBuffer, 50, 40, { width: 70, height: 70 });
    } catch (e) {}
  }

  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(institute.name, 130, 50, { align: "left" });

  doc.fontSize(11).font("Helvetica").text(institute.address, 130, 75);

  doc.fontSize(10).text(`Receipt No: ${fee.receiptNumber}`, 130, 92);

  // divider
  doc.moveDown(3);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(1).stroke("#333333");
  doc.moveDown(0.5);

  // ─── TITLE ───
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("#333333")
    .text("FEE RECEIPT", { align: "center" });

  doc.moveDown(0.8);

  // ─── STUDENT INFO TABLE ───
  const tableTop = doc.y;
  const col1 = 50;
  const col2 = 200;
  const col3 = 350;
  const col4 = 500;
  const rowH = 28;

  // table header
  doc.rect(col1, tableTop, 500, rowH).fill("#2c3e50");
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .fillColor("#ffffff")
    .text("Student Information", col1 + 10, tableTop + 8);

  // row 1
  let rowY = tableTop + rowH;
  doc.rect(col1, rowY, 500, rowH).fill("#f2f2f2").stroke("#cccccc");
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillColor("#333333")
    .text("Name", col1 + 10, rowY + 8);
  doc.font("Helvetica").text(student.name, col2, rowY + 8);
  doc.font("Helvetica-Bold").text("Roll No", col3, rowY + 8);
  doc.font("Helvetica").text(student.rollNo, col4 - 50, rowY + 8);

  // row 2
  rowY += rowH;
  doc.rect(col1, rowY, 500, rowH).fill("#ffffff").stroke("#cccccc");
  doc
    .font("Helvetica-Bold")
    .fillColor("#333333")
    .text("Class", col1 + 10, rowY + 8);
  doc.font("Helvetica").text(student.class, col2, rowY + 8);

  doc.moveDown(0.5);
  rowY += rowH + 10;

  // ─── PAYMENT INFO TABLE ───
  doc.rect(col1, rowY, 500, rowH).fill("#2c3e50");
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .fillColor("#ffffff")
    .text("Payment Details", col1 + 10, rowY + 8);

  const payments = [
    [
      "Month / Year",
      `${fee.month} / ${fee.year}`,
      "Total Fee",
      `Rs. ${fee.totalFee}`,
    ],
    [
      "Paid Amount",
      `Rs. ${fee.paidAmount}`,
      "Due Amount",
      `Rs. ${fee.dueAmount}`,
    ],
    [
      "Status",
      fee.status.toUpperCase(),
      "Paid On",
      fee.paidAt ? new Date(fee.paidAt).toDateString() : "N/A",
    ],
  ];

  payments.forEach((row, i) => {
    rowY += rowH;
    const bg = i % 2 === 0 ? "#f2f2f2" : "#ffffff";
    doc.rect(col1, rowY, 500, rowH).fill(bg).stroke("#cccccc");
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .fillColor("#333333")
      .text(row[0], col1 + 10, rowY + 8);
    doc.font("Helvetica").text(row[1], col2, rowY + 8);
    doc.font("Helvetica-Bold").text(row[2], col3, rowY + 8);
    doc.font("Helvetica").text(row[3], col4 - 50, rowY + 8);
  });

  // ─── FOOTER ───
  doc.moveDown(2);
  doc.moveTo(50, doc.y).lineTo(550, doc.y).lineWidth(0.5).stroke("#cccccc");
  doc.moveDown(0.5);
  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor("#888888")
    .text(
      "This is a computer generated receipt and does not require a signature.",
      50,
      doc.y,
      { align: "center", width: 500 },
    );

    doc.end();
};

module.exports = generateReceipt;