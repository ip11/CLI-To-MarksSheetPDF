import readline from "readline-sync";
import fs1 from "fs/promises";
import { createWriteStream } from "fs";
import PDFDocument from "pdfkit-table";
import clc from "cli-color";
import sendMail from "./mail.js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import twilio from "twilio";
import config from "config";
import c from "ansi-colors";

const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename); //
const { TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER } = config.get("SEND_SMS");
const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const FILE_PATH = "./document.pdf";
const filePath = path.join(__dirname, "./cred.json");

const client = new twilio(accountSid, authToken);

let main = async () => {
  console.clear();
  let red = clc.red;
  let green = clc.green;
  let yellow = clc.yellow;
  let pink = clc.xterm(13);
  let sky = clc.xterm(14);
  let orange = clc.xterm(202);
  console.log("\n");

  console.log(yellow("++++++++++++++++++++++++++++++++++++++"));
  console.log(green("\tCS.CODE.IN-PDF-GENERATOR"));
  console.log(yellow("++++++++++++++++++++++++++++++++++++\n"));

  let students = [
    "For Exit",
    "For Abhinav Bhargava Reddy Edulakanti",
    "For Adnan Mohammed Ahmed",
    "For Hanzala",
    "For Mohammed Junaid Khan",
    "For Syed Saniaa",
    "For Thondapu Ritvik",
    "For Samuel Reuben",
    "For Yaseera Tabassum\n",
  ];
  let student = [];

  students.map((value, index) => {
    console.log(red(`${index}. ${sky(value)}`));
  });

  // let option = 1;
  let option = readline.questionInt("Select The Student : ");

  if (option == 0) {
    return console.log(green("Thanks For Using App"));
  }
  // let title = 4;
  let title = readline.question(pink("\nEnter the MAT Number Ex : 1,2,3 : "));

  switch (option) {
    case 0:
      if (option == 0) {
        return console.log("Thanks For Using App");
      }

    case 1:
      student.push({
        name: "Abhinav Bhargava Reddy Edulakanti",
        email: "abhinav.edulakanti@gmail.com",
        phone: "+919618211626",
      });
      break;

    case 2:
      student.push({
        name: "Adnan Mohammed Ahmed",
        email: "aa706002@gmail.com",
        phone: "+919618211626",
      });
      break;

    case 3:
      student.push({
        name: "Hanzala",
        email: "sthka05@gmail.com",
        phone: "+919618211626",
      });
      break;
    case 4:
      student.push({
        name: "Mohammed Junaid Khan",
        email: "mohammedjunaidkhan7@gmail.com",
        phone: "+919618211626",
      });
      break;
    case 5:
      student.push({
        name: "Syed Saniaa",
        email: "syedsaniaa0a@gmail.com",
        phone: "+919618211626",
      });
    case 6:
      student.push({
        name: "Thondapu Ritvik",
        email: "thondapuritvik@gmail.com",
        phone: "+919618211626",
      });
    case 7:
      student.push({
        name: "Samuel Reuben",
        email: "samuel.reuben@gmail.com",
        phone: "+919618211626",
      });
    case 8:
      student.push({
        name: "Yaseera Tabassum",
        email: "yaseeratabassum@gmail.com",
        phone: "+919618211626",
      });
      break;

    default:
      console.log("Thank You For Using App");
      break;
  }

  console.log(sky("\nYou Have Selected The Student\n"));
  console.log(
    green(`Name : ${student[0].name}\nEmail : ${student[0].email}\n`)
  );

  let count = readline.questionInt(
    sky(`${student[0].name} No. Reattempt's Left Ex : 1,0  : `)
  );

  // let courseCount = 2;

  let courseCount = readline.questionInt(
    pink(`\nEnter the Number of Courses in MAT-${title} Ex: 1,2,3 : `)
  );

  let courseCodes = [];
  let database = [];
  database[0] = {};
  database[0].name = student[0].name;
  database[0].email = student[0].email;
  database[0].phone = student[0].phone;
  database[0].matNo = `${title}`;
  database[0].courseCodes = [];
  database[0].courseName = [];
  database[0].credits = [];
  database[0].course = [];
  database[0].finalCode = [];
  database[0].finalInt = [];
  database[0].tempGrades = [];
  database[0].tempTotals = [];
  database[0].remarks = [];
  database[0].impression = [];
  database[0].tempMarks = [];
  database[0].courseLabs = [];
  database[0].courseLabs[0] = {};
  database[0].reattempt = count;

  let i = 0;
  let askCourseCodes;
  let askCourseName;
  let askCredits;
  let course, finalCode, finalInt;

  while (i <= courseCount - 1) {
    // askCourseCodes = "CS001";

    askCourseCodes = readline.question(
      green(`\n${i + 1}.Enter the Course Code Ex: CS001 : `)
    );

    // askCourseName = "ALGORITHMS AND ANALYSIS OF ALGORITHMS";

    askCourseName = readline.question(
      green(
        `\nEnter the Course Name for ${askCourseCodes}`,
        red(`Ex : PROGRAMMING IN C LANGUAGE : `)
      )
    );

    // askCredits = 2;
    askCredits = readline.questionInt(
      green(`\nEnter The Credits for ${askCourseName}`, red(`Ex : 2,4,8 : `))
    );

    // course = "10,10,10,10";

    course = readline.question(
      yellow(
        `\nEnter the Marks of Lab1, Lab2, Lab3, Lab4 : ${red(
          `Ex : 10,9,7,7 : `
        )}`
      )
    );

    // finalCode = "10,10,10";

    finalCode = readline.question(
      yellow(
        `Enter the Marks of FINAL CODE IMPLEMENTATION SCORES ${red(
          `Ex : 10,9,7 : `
        )}`
      )
    );

    // finalInt = "10,8,7";

    finalInt = readline.question(
      yellow(
        `Enter the Marks of FINAL INTERVIEW SCORES : ${red(`Ex : 10,9,7 : `)}`
      )
    );

    database[0].courseCodes.push(askCourseCodes);
    database[0].courseName.push(askCourseName);
    database[0].credits.push(askCredits);
    database[0].course.push(course);
    database[0].finalCode.push(finalCode);
    database[0].finalInt.push(finalInt);
    let sum0, sum1, sum2;

    ///////////////////////////////////////////

    let courseNumber = database[0].course;

    let flattenedArr0 = courseNumber.flatMap((str) =>
      str.split(",").map(Number)
    );
    let j;
    for (j = 0; j <= flattenedArr0.length - 1; j += 4) {
      sum0 = flattenedArr0.slice(j, j + 4).reduce((acc, curr) => acc + curr, 0);
    }

    ///////////////////////////////////////////

    let codeNumber = database[0].finalCode;
    let k;
    let flattenedArr1 = codeNumber.flatMap((str) => str.split(",").map(Number));
    for (k = 0; k <= flattenedArr1.length - 1; k += 3) {
      sum1 = flattenedArr1.slice(k, k + 3).reduce((acc, curr) => acc + curr, 0);
    }
    ///////////////////////////////////////////

    let intNumber = database[0].finalInt;

    let flattenedArr2 = intNumber.flatMap((str) => str.split(",").map(Number));
    let l;
    for (l = 0; l <= flattenedArr2.length - 1; l += 3) {
      sum2 = flattenedArr2.slice(l, l + 3).reduce((acc, curr) => acc + curr, 0);
    }

    let total = sum0 + sum1 + sum2;

    let letterGrade1;

    if (total >= 90) {
      letterGrade1 = "O,10";
    } else if (total >= 80 && total < 90) {
      letterGrade1 = "A+,9";
    } else if (total >= 70 && total < 80) {
      letterGrade1 = "A,8";
    } else if (total >= 60 && total < 70) {
      letterGrade1 = "B+,7";
    } else if (total >= 50 && total < 60) {
      letterGrade1 = "B,6";
    } else if (total >= 40 && total < 50) {
      letterGrade1 = "C,5";
    } else if (total < 40) {
      letterGrade1 = "F,0";
    } else {
      letterGrade1 = "AB,0";
    }
    let splits1 = letterGrade1.split(",");

    letterGrade1 = splits1[0];
    let c1 = +splits1[1];

    console.log(
      pink(
        `In ${askCourseCodes} ${askCourseName}\nCredits = ${askCredits}\nTotal = ${total}\nGrade = ${letterGrade1}\nGrade Points = ${c1}\nTotal Marks in This Course ${askCourseCodes} is ${askCredits} x ${c1} = ${askCredits * c1
        } `
      )
    );
    console.log("\n");
    database[0].tempGrades.push(letterGrade1);
    database[0].tempTotals.push(c1);
    database[0].tempMarks.push(askCredits * c1);

    i++;
  }

  let storeRemarks = readline.questionInt(sky(`Number of Lines For Remarks :`));

  let c = 1;

  while (c <= storeRemarks) {
    let remarks = readline.question(
      sky("Enter the Remarks for the Student : ")
    );
    database[0].remarks.push(remarks);
    c++;
  }
  // let remarks = "Good";

  // let impression = readline.question(
  //   sky("Enter the Impression for the Student : ")
  // );
  // // let impression = "Pratice";

  // database[0].impression.push(impression);

  let write = await fs1.writeFile("db.json", JSON.stringify(database));

  let read = await fs1.readFile("db.json", "utf-8");
  let stringToObject = JSON.parse(read);
  // console.log(database);

  // Initlaizise the Document
  let doc = new PDFDocument({
    margins: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
    size: "legal",
    layout: "landscape",
  });
  // Saving the document using createWriteStream
  doc.pipe(createWriteStream(`${database[0].name}.pdf`));

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(55)
    .fillColor("#0000FF")
    .text("CS.CODE.IN", { align: "left" });
  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(22)
    .fillColor("black")
    .text(
      "COMPUTER SCIENCE BOOTCAMP - FULL STACK WEB ENGINEERING - CLASS OF CS 2022",
      { align: "left" }
    );

  doc.lineWidth(2);

  // set the fill color for the rectangle
  doc.fillColor("#2C2CDC");
  // draw the rectangle with the specified dimensions
  doc.rect(50, 170, 900, 15);
  // fill the rectangle with the specified color
  doc.fill();

  // stroke the rectangle to display it on the page
  doc.stroke();
  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(25)
    .fillColor("#0000FF")
    .text(`\nMAT ${database[0].matNo} (M${database[0].matNo}) - MGPA REPORT`, {
      align: "center",
    });

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(25)
    .fillColor("black")
    .text(`${database[0].name.toUpperCase()}\n`, {
      align: "center",
    });

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(10)
    .fillColor("#FFFFFF")
    .text(`e`, {
      align: "center",
    });

  let totalCredits = database[0].credits.reduce((acc, crr) => acc + crr, 0);
  let totalMarks = database[0].tempMarks.reduce((acc, crr) => acc + crr, 0);

  let mgpa = `${totalMarks} / ${totalCredits} = `;
  let finalmgpa = totalMarks / totalCredits;
  let table;
  table = {
    // title: `${database[0].matNo}`,
    // subtitle: database[0].name.toUpperCase(),
    // ROWS
    headers: [
      {
        label: "COURSE CODE",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "name",
        width: 100,
        renderer: null,
      },

      {
        label: "COURSE NAME",
        property: "price1",
        align: "left",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 250,
        renderer: null,
      },
      {
        label: "CREDITS",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        property: "price2",
        width: 100,
        renderer: null,
      },
      {
        label: "LETTER GRADE",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        property: "price3",
        width: 100,
        renderer: null,
      },
      {
        label: "GRADE POINTS (GP)",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 100,
        renderer: null,
      },
      {
        label: "CREDIT POINTS (CP)",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "price4",
        width: 250,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
    ],

    // Columns

    rows: [[]],
  };
  // Table Generation

  let addData = table.rows;

  for (let i = 0; i <= database[0].course.length - 1; i++) {
    addData[i] = [
      `${stringToObject[0].courseCodes[i]}`,
      `${stringToObject[0].courseName[i]}`,
      `${stringToObject[0].credits[i]}`,
      `${stringToObject[0].tempGrades[i]}`,
      `${stringToObject[0].tempTotals[i]}`,
      `${stringToObject[0].credits[i] * stringToObject[0].tempTotals[i]}`,
    ];
  }

  doc.table(table, {
    prepareHeader: () =>
      doc
        .font("./Oswald/Oswald-Medium.ttf")
        .fillColor("white")
        .fontSize(12)
        .opacity(2)
        .fill(),
    prepareRow: (indexColumn, rectRow) => {
      doc
        .font("./Oswald/Oswald-Regular.ttf")
        .fontSize(12)
        .fillColor("black")
        .opacity(2)
        .fill();
      indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
    },
  });

  // MGPA 224 / 38 = 5.89 CLASS RANK 3 REMAINING ATTEMPTS : 1
  // doc
  //   .font("./Oswald/Oswald-Bold.ttf")
  //   .fontSize(20)
  //   .fillColor("black")
  //   .text(`MGPA ${mgpa}  REMAINING ATTEMPTS : ${database[0].reattempt}\n\n`, {
  //     align: "center",
  //   });
  // doc
  //   .font("./Oswald/Oswald-Bold.ttf")
  //   .fontSize(20)
  //   .fillColor("#0000FF")
  //   .text(`MGPA : ${mgpa}`, { continued: true })
  //   .fillColor("red")
  //   .text(
  //     ` ${finalmgpa.toFixed(
  //       2
  //     )}                                                `,
  //     { continued: true }
  //   )
  //   .fillColor("#0000FF")

  //   .text(` REMAINING ATTEMPTS : `, { continued: true })
  //   .fillColor("red")
  //   .text(`${database[0].reattempt}`);
  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`MGPA : ${mgpa}`, { continued: true, align: "left" })
    .fillColor("red")
    .text(
      `${String(parseFloat(finalmgpa).toFixed(2)).substr(
        0,
        4
      )}                                                                                       `,
      { continued: true, align: "left" }
    )
    .fillColor("#0000FF")
    .text(`REMAINING ATTEMPTS : `, { continued: true })
    .fillColor("red")
    .text(`${count}\n`, { continued: true });
  doc.addPage();

  // Table 1

  // PART 1 / 3 : INTERNAL CODING LAB SCORES

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`           PART 1 / 3 : INTERNAL CODING LAB SCORES\n\n`, {
      align: "center",
    });

  const table1 = {
    // title: "INTERNAL CODING LAB SCORES",

    // ROWS
    headers: [
      {
        label: "COURSE CODE",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        property: "name",
        width: 80,
        renderer: null,
      },

      {
        label: "COURSE NAME",
        align: "left",
        headerColor: "#0000FF",
        headerOpacity: "2",
        property: "price1",
        width: 250,
        renderer: null,
      },
      {
        label: "LAB 001",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "price2",
        width: 100,
        renderer: null,
      },
      {
        label: "LAB 002",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "price3",
        width: 100,
        renderer: null,
      },
      {
        label: "LAB 003",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 100,
        renderer: null,
      },
      {
        label: "LAB 004",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 100,
        renderer: null,
      },
      {
        label: `MAT ${database[0].matNo} INTERNALS TOTAL`,
        property: "price4",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 150,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
    ],

    rows: [[]],
  };
  let addData1 = table1.rows;
  let t11 = [];
  let t1Data = [];
  let t2Data = [];
  let t3Data = [];
  let t21 = [];
  let t31 = [];

  for (let i = 0; i <= database[0].course.length - 1; i++) {
    t11 = [stringToObject[0].course[i]]; // 1 1
    t1Data.push(t11);
  }
  for (let i = 0; i <= database[0].course.length - 1; i++) {
    t21 = [stringToObject[0].finalCode[i]];
    t2Data.push(t21);
  }
  for (let i = 0; i <= database[0].course.length - 1; i++) {
    t31 = [stringToObject[0].finalInt[i]];
    t3Data.push(t31);
  }
  let p1, p2, p3;

  for (let i = 0; i <= database[0].course.length - 1; i++) {
    p1 = t1Data[i].flat();
    p2 = t2Data[i].flat();
    p3 = t3Data[i].flat();

    addData1[i] = [
      `${stringToObject[0].courseCodes[i]}`,
      `${stringToObject[0].courseName[i]}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[0])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[1])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[2])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[3])}`,
      `${t1Data[i]
        .flatMap((str) => str.split(",").map(Number))
        .reduce((acc, curr) => acc + curr, 0)}  OUT OF 40`,
    ];
  }

  doc.table(table1, {
    prepareHeader: () =>
      doc
        .font("./Oswald/Oswald-Medium.ttf")
        .fillColor("white")
        .fontSize(12)
        .opacity(2)
        .fill(),
    prepareRow: (indexColumn, rectRow) => {
      doc
        .font("./Oswald/Oswald-Regular.ttf")
        .fontSize(12)
        .fillColor("black")
        .opacity(2)
        .fill();
      indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
    },
  });

  // doc.addPage();

  ///////////////

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(
      `PART 2 / 3 : MAT ${database[0].matNo} FINAL CODE IMPLEMENTATION SCORES\n\n`,
      {
        align: "center",
      }
    );
  const table2 = {
    headers: [
      {
        label: "COURSE CODE",
        headerColor: "#0000FF",
        headerOpacity: "2",
        align: "center",
        property: "name",
        width: 80,
        renderer: null,
      },

      {
        label: "COURSE NAME",
        headerColor: "#0000FF",
        align: "left",
        headerOpacity: "2",
        property: "price1",
        width: 250,
        renderer: null,
      },
      {
        label: "PROBLEM SOLVING / CODE IMPLEMENTATION",
        property: "price2",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        width: 240,
        renderer: null,
      },
      {
        label: "SUCCESSFUL I/O TEST CASES",
        align: "center",
        property: "price3",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 120,
        renderer: null,
      },
      {
        label: "CODE EXPLANATION",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 120,
        renderer: null,
      },

      {
        label: `MAT${database[0].matNo} EXTERNAL CODING LAB TOTAL`,
        property: "price4",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",

        width: 130,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
    ],

    //   // Columns

    rows: [[]],
  };
  // Table Generation
  let addData2 = table2.rows;

  for (let i = 0; i <= database[0].course.length - 1; i++) {
    p1 = t1Data[i].flat();

    p2 = t2Data[i].flat();
    p3 = t3Data[i].flat();
    addData2[i] = [
      `${stringToObject[0].courseCodes[i]}`,
      `${stringToObject[0].courseName[i]}`,
      `${p2.flatMap((str) => str.split(",").map(Number)[0])}`,
      `${p2.flatMap((str) => str.split(",").map(Number)[1])}`,
      `${p2.flatMap((str) => str.split(",").map(Number)[2])}`,

      `${t2Data[i]
        .flatMap((str) => str.split(",").map(Number))
        .reduce((acc, curr) => acc + curr, 0)} OUT OF 30`,
    ];
  }

  doc.table(table2, {
    prepareHeader: () =>
      doc
        .font("./Oswald/Oswald-Medium.ttf")
        .fillColor("white")
        .fontSize(12)
        .opacity(2)
        .fill(),
    prepareRow: (indexColumn, rectRow) => {
      doc
        .font("./Oswald/Oswald-Regular.ttf")
        .fontSize(12)
        .fillColor("black")
        .opacity(2)
        .fill();
      indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
    },
  });

  //////

  doc.addPage();

  // ///////////// TABLE 3  ///////////

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`PART 3 / 3 : MAT ${database[0].matNo} FINAL INTERVIEW SCORES\n\n`, {
      align: "center",
    });

  const table3 = {
    // ROWS
    headers: [
      {
        label: "COURSE CODE",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "name",
        width: 80,
        renderer: null,
      },

      {
        label: "COURSE NAME",
        headerColor: "#0000FF",
        align: "left",
        headerOpacity: "2",
        property: "price1",
        width: 240,
        renderer: null,
      },
      {
        label: "PROBLEM SOLVING / CODE IMPLEMENTATION",
        property: "price2",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        width: 250,
        renderer: null,
      },
      {
        label: "SUCCESSFUL I/O TEST CASES",
        property: "price3",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        width: 120,
        renderer: null,
      },
      {
        label: "CODE EXPLANATION",
        property: "price3",
        align: "center",
        width: 100,
        headerColor: "#0000FF",
        headerOpacity: "2",
        renderer: null,
      },

      {
        label: `MAT${database[0].matNo} EXTERNAL CODING LAB TOTAL`,
        property: "price4",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 130,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
    ],

    // Columns

    rows: [[]],
  };

  // Table Generation
  let addData3 = table3.rows;

  for (let i = 0; i <= database[0].course.length - 1; i++) {
    p1 = t1Data[i].flat();
    p2 = t2Data[i].flat();
    p3 = t3Data[i].flat();
    addData3[i] = [
      `${stringToObject[0].courseCodes[i]}`,
      `${stringToObject[0].courseName[i]}`,
      `${p3.flatMap((str) => str.split(",").map(Number)[0])}`,
      `${p3.flatMap((str) => str.split(",").map(Number)[1])}`,
      `${p3.flatMap((str) => str.split(",").map(Number)[2])}`,
      `${t3Data[i]
        .flatMap((str) => str.split(",").map(Number))
        .reduce((acc, curr) => acc + curr, 0)} OUT OF 30`,
    ];
  }

  // Table Generation
  doc.table(table3, {
    prepareHeader: () =>
      doc
        .font("./Oswald/Oswald-Medium.ttf")
        .fillColor("white")
        .fontSize(12)
        .opacity(2)
        .fill(),
    prepareRow: (indexColumn, rectRow) => {
      doc
        .font("./Oswald/Oswald-Regular.ttf")
        .fontSize(12)
        .fillColor("black")
        .opacity(2)
        .fill();
      indexColumn === 0 && doc.addBackground(rectRow, "blue", 0.15);
    },
  });
  doc
    .font("./Oswald/Oswald-Medium.ttf")
    .fontSize(14)
    .fillColor("black")
    .text(`\n\nREMARKS : `, { align: "left" });
  for (let i = 0; i <= database[0].remarks.length - 1; i++) {
    doc
      .font("./Oswald/Oswald-Medium.ttf")
      .fontSize(14)
      .fillColor("black")
      .text(`${i + 1}.${database[0].remarks[i]}`, { align: "left" });
  }

  // doc
  //   .font("./Oswald/Oswald-Medium.ttf")
  //   .fontSize(14)
  //   .fillColor("black")
  //   .text(`Impression : ${stringToObject[0].impression}`, { align: "left" });

  doc
    .font("./Oswald/Oswald-Medium.ttf")
    .fontSize(20)
    .fillColor("black")
    .text(`THE END`, { align: "center" });

  doc.end();

  // console.log(`EMAIL SENT To ${student[0].email}`);

  // const jsonData = fs.readFileSync(filePath, "utf-8");
  // const credentials = JSON.parse(jsonData);

  // const auth = new google.auth.GoogleAuth({
  //   credentials,
  //   scopes: SCOPES,
  // });

  // const drive = google.drive({ version: "v3", auth });

  // const fileMetadata = {
  //   name: "MGPA Report",
  //   mimeType: "application/pdf",
  // };
  // const media = {
  //   mimeType: "application/pdf",
  //   body: createReadStream(FILE_PATH),
  // };
  // let data = await drive.files.create({
  //   resource: fileMetadata,
  //   media: media,
  //   fields: "id",
  // });

  // let fileId = data.data.id;

  // let link = await drive.files.get({
  //   fileId,
  //   fields: "webViewLink",
  // });
  // const permission = {
  //   type: "user",
  //   role: "reader",
  //   emailAddress: `${student[0].email}`,
  // };

  // let access = await drive.permissions.create({
  //   fileId: fileId,
  //   requestBody: permission,
  //   sendNotificationEmail: true, // Optional parameter to disable email notification
  // });

  // // console.log(link.data.webViewLink);

  // let url = link.data.webViewLink;

  // await sendMail({
  //   subject: `CS.CODE.IN MGPA MAT-${title} Report`,
  //   to: `${student[0].email}`,
  //   body: `${stringToObject[0].name} MAT-${title} Report`,
  // });

  // await sendMail({
  //   subject: "CS.CODE.IN MGPA Report",
  //   to: `prashanth@code.in`,
  //   body: `${stringToObject[0].name} ${stringToObject[0].matNo} Report`,
  // });

  // await client.messages.create({
  //   body: `From CS.CODE.IN\nYour MGPA Report : ${url}`,
  //   to: `${student[0].phone}`,
  //   from: TWILIO_NUMBER,
  // });

  // console.log(`SMS SENT To User ${student[0].name} on ${student[0].phone}`);
};

main();
