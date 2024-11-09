//mailer
// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'tursholivea@gmail.com', 
        pass: 'nfyb capl iydl oxpb', 
    },
});

// Function to send email notifications
const sendEmailNotification = async (to, subject, text) => {
    const mailOptions = {
        from: 'tursholivea@gmail.com', 
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};




module.exports = { sendEmailNotification };
