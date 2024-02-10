const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: "postmaster@mailgun.org",
    pass: process.env.MAIL_API_KEY,
  },
});

const sendVerification = async (email, verificationToken) => {
  const msg = {
    from: "postmaster@sandbox15195c20faeb470ca655478a9f22042c.mailgun.org",
    to: email,
    subject: `Verification for Registration`,
    html: `
    <p>Click below to verify:
    <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verify Email</a></p>
    
  `,
  };
  try {
    const response = await transporter.sendMail(msg);
    console.log("sendVerification response:", response);
  } catch (err) {
    console.log("sendVerification error:", err);
  }
};

module.exports = sendVerification;
