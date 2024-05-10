const nodemailer = require('nodemailer');

 async function sendEmail(toEmail,subject,content) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: "testthuwa@outlook.com",
      pass: "Vijay@123",
    }
  });
  

  // Define email options
  let mailOptions = {
    from:  "testthuwa@outlook.com",
    to:toEmail,
    subject: subject,
    html:content
  };

  try {

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };