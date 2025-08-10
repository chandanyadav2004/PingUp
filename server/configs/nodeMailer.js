import nodemailer from 'nodemailer';

// Create the transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",   // ✅ Gmail SMTP host
  port: 587,                // ✅ Use 587 for TLS
  secure: false,            // ✅ false for 587, true for 465
  auth: {
    user: process.env.SENDER_EMAIL,    // ✅ Your Gmail address
    pass: process.env.PASS, // ✅ Your Gmail App Password (NOT normal password)
  },
});

// Function to send email
const sendEmail = async (to, subject, body) => {
    const response = await transporter.sendMail({
        from: process.env.SENDER_EMAIL, // ✅ Name + Gmail
        to,             // Recipient email
        subject,        // Email subject
        html: body,     // HTML body content
    });
    return response;
}

export default sendEmail;
