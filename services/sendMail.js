const nodemailer = require('nodemailer');

async function sendMail(subject, content) {

    const auth = {
        user: process.env.USER,
        pass: process.env.PASS
    };
    
    const mailOptions = {
        from: process.env.USER,
        to: process.env.USER,
        subject: subject,
        html: content,
    };
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });

    try {
        return await transporter.sendMail(mailOptions);
    } catch(err) {
        console.log(new Error(err));
    }
}

module.exports = sendMail;