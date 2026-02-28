const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // your gmail
    pass: process.env.MAIL_PASS  // app password
  }
});

const sendConfirmationMail = async (registration) => {
  const mailOptions = {
    from: `"Symposium Team" <${process.env.MAIL_USER}>`,
    to: registration.email,
    subject: `✅ Registration Confirmed - ${registration.eventName}`,
    html: `
      <h2>Registration Confirmed 🎉</h2>
      <p>Hello <b>${registration.name}</b>,</p>

      <p>Your registration for <b>${registration.eventName}</b> has been approved.</p>

      <h3>🎫 Event Ticket</h3>
      <table border="1" cellpadding="10">
        <tr><td><b>Name</b></td><td>${registration.name}</td></tr>
        <tr><td><b>Event</b></td><td>${registration.eventName}</td></tr>
        <tr><td><b>College</b></td><td>${registration.college}</td></tr>
        <tr><td><b>Payment</b></td><td>${registration.paymentMode}</td></tr>
      </table>

      <p>📍 Please bring this mail as your entry pass.</p>
      <p>All the best 👍</p>

      <p><b>Symposium Team</b></p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendConfirmationMail;
