import nodelmailer from "nodemailer";
import config from "config";
import fs from "fs";
let sendMail = async (emailData) => {
  const HOST = config.get("EMAIL_SMTP.HOST");
  const AUTH = config.get("EMAIL_SMTP.AUTH");
  const PORT = config.get("EMAIL_SMTP.PORT");
  const file = fs.readFileSync("./document.pdf");

  // console.log(HOST, AUTH, PORT);

  try {
    let transporter = nodelmailer.createTransport({
      host: HOST,
      port: PORT,
      secure: true,
      auth: {
        user: AUTH["USER"],
        pass: AUTH["PASS"],
      },
    });

    transporter.sendMail({
      from: `"CS.CODE.IN" <${AUTH["USER"]}>`,
      subject: emailData.subject,
      to: emailData.to,
      html: emailData.body,
      attachments: [
        {
          filename: "MGPA-Report.pdf",
          content: file,
        },
      ],
    });
    // console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error);
  }
};
export default sendMail;
