//emailSrevice
// emailService.js
const nodemailer = require('nodemailer');

// Directly define your email credentials 
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tursholivea@gmail.com', 
        pass: 'nfyb capl iydl oxpb',  
    },
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'tursholivea@gmail.com',  
        to,                            
        subject,                       
        text,                          
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
