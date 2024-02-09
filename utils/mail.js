const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendVerification = async (email, verificationToken) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
    from: "testmail@gmail.com",
    to: email,
    subject: `Verification for Registration`,
    html: `
      <b>Click on below to verify:</b>
      <a href=http://localhost:3000/api/users/verify/${verificationToken}></a>
      `,
  };
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendVerification;
