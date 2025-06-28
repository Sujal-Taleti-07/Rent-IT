const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "taletisujal45@gmail.com",
    pass: process.env.GOOGLE_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  try{
  const info = await transporter.sendMail({
    from: '"RentIt 🚗 " <taletisujal45@gmail.com>', // sender address
    to,
    subject,
    text,
    html
  });
  console.log("Email sent:", info.messageId);
  }catch(err){
    console.error("Email sending failed:", err.message);
  }
}

module.exports = {sendMail}