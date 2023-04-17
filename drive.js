import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename); //

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const FILE_PATH = "./document.pdf";
const filePath = path.join(__dirname, "./cred.json");

const drive = async () => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const credentials = JSON.parse(jsonData);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: "MGPA Report",
    mimeType: "application/pdf",
  };
  const media = {
    mimeType: "application/pdf",
    body: createReadStream(FILE_PATH),
  };
  let data = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });

  let fileId = data.data.id;
  console.log(fileId);

  let link = await drive.files.get({
    fileId,
    fields: "webViewLink",
  });
  const permission = {
    type: "user",
    role: "reader",
    emailAddress: ["160919733108@lords.ac.in", "suhailroushan.in@gmail.com"],
  };

  let access = await drive.permissions.create({
      fileId: fileId,
      requestBody: permission,
      sendNotificationEmail: false, // Optional parameter to disable email notification
  });

//   console.log(access.data.id);

  console.log(link.data.webViewLink);
};

drive();
