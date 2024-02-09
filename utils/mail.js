const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: true,
  auth: {
    user: "postmaster@sandbox15195c20faeb470ca655478a9f22042c.mailgun.org",
    pass: "9cf6df86b46f4a83a9b9917f739896c8-8c90f339-063e9107",
  },
});

const sendVerification = async (email, verificationToken) => {
  const msg = {
    from: "postmaster@sandbox15195c20faeb470ca655478a9f22042c.mailgun.org",
    to: "asia.ostrow@gmail.com",
    subject: `Verification for Registration`,
    html: `
          <b>Click on below to verify:</b>
          <a href=http://localhost:3000/api/users/verify/${verificationToken}></a>
          `,
  };
  try {
    await transporter.sendMail(msg);
  } catch (err) {
    console.log(err);
  }
};

//__________mailgun_________
// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY });

// mg.messages.create('sandbox-123.mailgun.org', {
// 	from: "testmail@gmail.com",
// 	to: ["test@example.com"],
// 	subject: "Hello",
// 	text: "Testing some Mailgun awesomeness!",
// 	html: "<h1>Testing some Mailgun awesomeness!</h1>"
// })
// .then(msg => console.log(msg))
// .catch(err => console.log(err));

//_________sendgrid________
// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const sendVerification = async (email, verificationToken) => {
//   sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
//   const msg = {
//     from: "testmail@gmail.com",
//     to: email,
//     subject: `Verification for Registration`,
//     html: `
//       <b>Click on below to verify:</b>
//       <a href=http://localhost:3000/api/users/verify/${verificationToken}></a>
//       `,
//   };
//   try {
//     await sgMail.send(msg);
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = sendVerification;
