const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // your gmail
    pass: process.env.MAIL_PASS  // app password
  }
});
const sendContactResolvedMail = async (contact) => {
  try {
    await transporter.sendMail({
      from: `"Symposium Support" <${process.env.MAIL_USER}>`,
      to: contact.email,
      subject: "✅ Your Issue Has Been Resolved",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          
          <h2 style="color: #28a745;">Issue Resolved ✔</h2>

          <p>Hello <b>${contact.name}</b>,</p>

          <p>We’re happy to inform you that your query has been successfully resolved.</p>

          <h3 style="margin-top:20px;">📩 Your Original Message:</h3>
          <div style="
              background: #f8f9fa;
              padding: 15px;
              border-left: 4px solid #007bff;
              margin-bottom: 20px;
          ">
            ${contact.message}
          </div>

          <p>If you have any further questions, feel free to contact us again.</p>

          <br/>

          <p>
            Regards,<br/>
            <b>Symposium Support Team</b>
          </p>

        </div>
      `
    });

    console.log("Contact resolution email sent successfully");
  } catch (error) {
    console.error("Failed to send resolution email:", error);
  }
};

module.exports = sendContactResolvedMail;