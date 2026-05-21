const overdueTemplate = (studentName, month, year, amount, instituteName) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
        .header { background-color: #2c3e50; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .body { padding: 30px; }
        .body p { color: #333333; font-size: 15px; line-height: 1.6; }
        .details { background-color: #f9f9f9; border-left: 4px solid #e74c3c; padding: 15px 20px; margin: 20px 0; border-radius: 4px; }
        .details p { margin: 5px 0; color: #555555; font-size: 14px; }
        .amount { font-size: 22px; font-weight: bold; color: #e74c3c; }
        .footer { background-color: #f4f4f4; padding: 20px; text-align: center; }
        .footer p { color: #888888; font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${instituteName}</h1>
        </div>
        <div class="body">
          <p>Dear <strong>${studentName}</strong>,</p>
          <p>This is a reminder that your fee payment is overdue. Please clear your dues as soon as possible to avoid any inconvenience.</p>
          <div class="details">
            <p><strong>Month:</strong> ${month} / ${year}</p>
            <p><strong>Due Amount:</strong> <span class="amount">Rs. ${amount}</span></p>
          </div>
          <p>Please visit the institute office or contact your accountant to make the payment.</p>
          <p>If you have already made the payment, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>This is an automated email from EduPay. Please do not reply.</p>
          <p>&copy; ${new Date().getFullYear()} ${instituteName}. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { overdueTemplate };
