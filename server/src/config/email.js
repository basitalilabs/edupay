const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
    try {
        const data = await resend.emails.send({
            from: 'EduPay <onboarding@resend.dev>',
            to,
            subject,
            html
        })
        return data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;