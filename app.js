import readline from "readline-sync";
import fs1 from "fs/promises";
import { createWriteStream } from "fs";
import PDFDocument from "pdfkit-table";
import clc from "cli-color";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename); //

let main = async () => {
  console.clear();
  let red = clc.red;
  let green = clc.green;
  let yellow = clc.yellow;
  let pink = clc.xterm(13);
  let sky = clc.xterm(14);
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

  let option = readline.questionInt("Select The Student : ");

  if (option == 0) {
    return console.log(green("Thanks For Using App"));
  }

  if (option > 8 || option < 0) {
    return console.log(red("Invalid Input"));
  }
  let matNumber = readline.questionInt(
    pink("\nEnter the MAT Number Ex : 1,2,3 : ")
  );
  if (matNumber <= 0 || matNumber >= 13) {
    return console.log("Invalid Mat Number");
  }
  switch (option) {
    case 0:
      if (option == 0) {
        return console.log("Thanks For Using App");
      }

    case 1:
      student.push({
        name: "Abhinav Bhargava Reddy Edulakanti",
        email: "abhinav.edulakanti@gmail.com",
      });
      break;

    case 2:
      student.push({
        name: "Adnan Mohammed Ahmed",
        email: "aa706002@gmail.com",
      });
      break;

    case 3:
      student.push({
        name: "Hanzala",
        email: "sthka05@gmail.com",
      });
      break;
    case 4:
      student.push({
        name: "Mohammed Junaid Khan",
        email: "mohammedjunaidkhan7@gmail.com",
      });
      break;
    case 5:
      student.push({
        name: "Syed Saniaa",
        email: "syedsaniaa0a@gmail.com",
      });
    case 6:
      student.push({
        name: "Thondapu Ritvik",
        email: "thondapuritvik@gmail.com",
      });
    case 7:
      student.push({
        name: "Samuel Reuben",
        email: "samuel.reuben@gmail.com",
      });
    case 8:
      student.push({
        name: "Yaseera Tabassum",
        email: "yaseeratabassum@gmail.com",
      });
      break;

    default:
      console.log("Thank You For Using App");
      break;
  }
  console.log(sky("\nYou Have Selected The Student\n"));
  console.log(
    green(
      `Name : ${student[0].name}\nEmail : ${student[0].email} ${yellow(
        `For MAT-${matNumber}`
      )}`
    )
  );

  // console.log(student);

  let numberOfCourses = readline.questionInt(
    pink(`\nEnter the Number of Courses in MAT-${matNumber} Ex: 1,2,3 : `)
  );
  if (numberOfCourses <= 0) {
    return console.log(pink("Invalid Number of Courses"));
  }
  let inputCourseCodes, inputCourseNames, inputCourseCredits;
  let database = [];
  database[0] = {};
  database[0].name = student[0].name;
  database[0].email = student[0].email;
  database[0].matNumber = matNumber;
  database[0].numberOfCourses = numberOfCourses;
  database[0].courseCodes = [];
  database[0].courseNames = [];
  database[0].courseCredits = [];
  database[0].allLabMarksData = [];
  database[0].totalLabMarks = [];
  database[0].finalLabTotal = [];
  database[0].finalInterview = [];
  database[0].grades = [];
  database[0].totalSum = [];
  database[0].gradeNumber = [];
  database[0].labs = [];

  database[0].gradePoints = [];
  database[0].total = [];
  database[0].remarks = [];

  let zero = 0;

  let inputFinalLabTotal, inputFinalInterview;

  while (zero <= numberOfCourses - 1) {
    inputCourseCodes = readline.question(
      green(`\n${zero + 1}.Enter the Course Code Ex: CS001 : `)
    );

    inputCourseNames = readline.question(
      green(
        `\nEnter the Course Name for ${inputCourseCodes}`,
        red(`Ex : PROGRAMMING IN C LANGUAGE : `)
      )
    );

    inputCourseCredits = readline.questionInt(
      green(`\nEnter The Credits for ${inputCourseNames}`, red(`Ex : 2,4,8 : `))
    );

    let allLabMarks;
    for (let i = 1; i < 5; i++) {
      allLabMarks = readline.questionInt(
        yellow(`\nEnter the Marks of Lab${i} : ${red(`Ex : 8 : `)}`)
      );

      database[0].allLabMarksData.push(allLabMarks);
    }

    let sum;

    for (let i = 0; i <= database[0].allLabMarksData.length - 4; i += 4) {
      const subarray = database[0].allLabMarksData.slice(i, i + 4);
      sum = subarray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    }
    database[0].totalLabMarks.push(sum);

    console.log("\n");

    inputFinalLabTotal = readline.question(
      yellow(
        `Enter the Marks of FINAL CODE IMPLEMENTATION SCORES  IN TOTAL ${red(
          `Ex : 28  : `
        )}`
      )
    );

    console.log("\n");

    inputFinalInterview = readline.question(
      yellow(
        `Enter the Marks of FINAL INTERVIEW SCORES IN TOTAL :  ${red(
          `Ex : 29 : `
        )}`
      )
    );

    database[0].courseCodes.push(inputCourseCodes.toUpperCase());
    database[0].courseNames.push(inputCourseNames.toUpperCase());
    database[0].courseCredits.push(inputCourseCredits);
    database[0].finalLabTotal.push(inputFinalLabTotal);
    database[0].finalInterview.push(inputFinalInterview);

    let letterGrade;
    let gradeNumber;

    // Determine the maximum length among the three arrays
    const maxLength = Math.max(
      database[0].totalLabMarks.length,
      database[0].finalLabTotal.length,
      database[0].finalInterview.length
    );

    // Initialize an array to store the horizontal sums
    const horizontalSums = [];

    // Iterate over the arrays and calculate the horizontal sum at each index
    for (let i = 0; i < maxLength; i++) {
      const sum =
        (database[0].totalLabMarks[i] || 0) +
        (parseInt(database[0].finalLabTotal[i]) || 0) +
        (parseInt(database[0].finalInterview[i]) || 0);
      horizontalSums.push(sum);
    }

    database[0].total = horizontalSums;

    for (let i = 0; i <= database[0].total.length - 1; i++) {
      if (database[0].total[i] >= 90) {
        letterGrade = "O,10";
      } else if (database[0].total[i] >= 80 && database[0].total[i] < 90) {
        letterGrade = "A+,9";
      } else if (database[0].total[i] >= 70 && database[0].total[i] < 80) {
        letterGrade = "A,8";
      } else if (database[0].total[i] >= 60 && database[0].total[i] < 70) {
        letterGrade = "B+,7";
      } else if (database[0].total[i] >= 80 && database[0].total[i] < 60) {
        letterGrade = "B,6";
      } else if (database[0].total[i] >= 40 && database[0].total[i] < 80) {
        letterGrade = "C,5";
      } else if (database[0].total[i] < 40) {
        letterGrade = "F,0";
      } else {
        letterGrade = "AB,0";
      }

      let divide = letterGrade.split(",");

      // console.log(divide, "DIVIDE");

      letterGrade = divide[0];

      // console.log(letterGrade, "LETTER");

      gradeNumber = +divide[1];

      // console.log(gradeNumber, "GRADENUMBER");
    }
    database[0].grades.push(letterGrade);
    database[0].gradeNumber.push(gradeNumber);
    database[0].gradePoints.push(inputCourseCredits * gradeNumber);
    // console.log(
    //     pink(
    //         `In ${inputCourseCodes} ${inputCourseNames}\nCredits = ${inputCourseCredits}\nTotal = ${database[0].total[i]}\nGrade = ${letterGrade}\nGrade Points = ${gradeNumber}\nTotal Marks in This Course ${inputCourseCodes} is ${inputCourseCredits} x ${gradeNumber} = ${inputCourseCredits * gradeNumber} `
    //     )
    // );
    // console.log("\n");

    zero++;
  }

  let inputRemarks = readline.questionInt(sky(`Number of Lines For Remarks :`));

  let count = 1;

  while (count <= inputRemarks) {
    let remarks = readline.question(
      sky("Enter the Remarks for the Student : ")
    );
    database[0].remarks.push(remarks);
    count++;
  }

  const newArray = [];

  for (let i = 0; i < database[0].allLabMarksData.length; i += 4) {
    const subArray = database[0].allLabMarksData.slice(i, i + 4);
    const joinedString = subArray.join(",");
    newArray.push(joinedString);
  }

  // console.log(newArray);

  let flatt = newArray.flat();

  database[0].labs = newArray;

  let write = await fs1.writeFile("db.json", JSON.stringify(database));

  let read = await fs1.readFile("db.json", "utf-8");
  let stringToObject = JSON.parse(read);

  // Initlaizise the Document
  let doc = new PDFDocument({
    margins: {
      top: 40,
      bottom: 80,
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
    .fontSize(12)
    .fillColor("#0000FF")
    .text("\n", { align: "left" });

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(24)
    .fillColor("black")
    .text(
      "COMPUTER SCIENCE BOOTCAMP - FULL STACK WEB ENGINEERING - CLASS OF CS 2022",
      { align: "left" }
    );

  doc.lineWidth(2);

  // set the fill color for the rectangle
  doc.fillColor("#2C2CDC");
  // draw the rectangle with the specified dimensions
  doc.rect(50, 185, 900, 13);
  //           down
  // fill the rectangle with the specified color
  doc.fill();

  // stroke the rectangle to display it on the page
  doc.stroke();
  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(25)
    .fillColor("#0000FF")
    .text(
      `\nMAT ${database[0].matNumber} (M${database[0].matNumber}) - MGPA REPORT`,
      {
        align: "center",
      }
    );

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
    .text(`OODF`, {
      align: "center",
    });

  let totalCredits = database[0].courseCredits.reduce(
    (acc, crr) => acc + crr,
    0
  );

  let totalMarks = database[0].gradePoints.reduce((acc, crr) => acc + crr, 0);

  let mgpa = `${totalMarks} / ${totalCredits} = `;

  let finalmgpa = totalMarks / totalCredits;

  let table;
  table = {
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
        width: 280,
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
        width: 220,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
    ],

    // Columns

    rows: [[]],
  };

  let addData = table.rows;

  for (let i = 0; i <= stringToObject[0].courseCodes.length - 1; i++) {
    addData[i] = [
      `${stringToObject[0].courseCodes[i]}`,
      `${stringToObject[0].courseNames[i]}`,
      `${stringToObject[0].courseCredits[i]}`,
      `${stringToObject[0].grades[i]}`,
      `${stringToObject[0].gradeNumber[i]}`,
      `${
        stringToObject[0].courseCredits[i] * stringToObject[0].gradeNumber[i]
      }`,
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
    );

  doc.addPage();

  // Table 1

  // PART 1 / 3 : INTERNAL CODING LAB SCORES

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`\nMAT-${matNumber} (M${matNumber}) - MARKS REPORT\n`, {
      align: "center",
    });

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(10)
    .fillColor("#FFFFFF")
    .text(`OODF`, {
      align: "center",
    });

  const table1 = {
    headers: [
      {
        label: "COURSE CODE",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        property: "name",
        width: 100,
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
        label: "LAB001\nSCORE",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "price2",
        width: 80,
        renderer: null,
      },
      {
        label: "LAB002\nSCORE",
        headerColor: "#0000FF",
        align: "center",
        headerOpacity: "2",
        property: "price3",
        width: 80,
        renderer: null,
      },
      {
        label: "LAB003\nSCORE",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 80,
        renderer: null,
      },
      {
        label: "LAB004\nSCORE",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 80,
        renderer: null,
      },

      {
        label: `MAT-${matNumber} FINAL LAB TOTAL`,
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 80,
        renderer: (value, indexColumn, indexRow, row) => {
          return `${value}`;
        },
      },
      {
        label: `MAT-${matNumber} FINAL INTERVIEW`,
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 80,
        renderer: null,
      },
      {
        label: "TOTAL",
        property: "price3",
        align: "center",
        headerColor: "#0000FF",
        headerOpacity: "2",
        width: 80,
        renderer: null,
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

  for (let i = 0; i <= stringToObject[0].labs.length - 1; i++) {
    t11 = [stringToObject[0].labs[i]]; // 1 1
    t1Data.push(t11);
  }

  let p1;

  // Final Interview

  let fi = [];
  const finalInterviewValues = stringToObject[0].finalInterview;

  for (let i = 0; i < finalInterviewValues.length; i++) {
    const value = Number(finalInterviewValues[i]);
    fi.push(value);
  }

  /////
  // -------------------------------------------------------
  ///

  // Final Lab

  let fl = [];

  const finalLabValues = stringToObject[0].finalLabTotal;

  for (let i = 0; i < finalLabValues.length; i++) {
    const value = Number(finalLabValues[i]);
    fl.push(value);
  }

  for (let i = 0; i <= stringToObject[0].numberOfCourses - 1; i++) {
    p1 = t1Data[i].flat();

    addData1[i] = [
      stringToObject[0].courseCodes[i],
      stringToObject[0].courseNames[i],
      `${p1.flatMap((str) => str.split(",").map(Number)[0])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[1])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[2])}`,
      `${p1.flatMap((str) => str.split(",").map(Number)[3])}`,
      fl[i],
      fi[i],
      stringToObject[0].total[i],
    ];
  }

  ///

  ///
  // -------------------------------------------------------

  ////

  // -------------------------------------------------------

  //  l1 l2 l3 l4

  ///

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

  doc.addPage();

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`\nMAT-${matNumber} (M${matNumber}) - REAMRKS\n`, {
      align: "center",
    });

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(10)
    .fillColor("#FFFFFF")
    .text(`OODF`, {
      align: "center",
    });

  for (let i = 0; i <= stringToObject[0].remarks.length - 1; i++) {
    doc
      .font("./Oswald/Oswald-Medium.ttf")
      .fontSize(14)
      .fillColor("black")
      .text(`${i + 1}.${stringToObject[0].remarks[i]}`, { align: "left" });
  }

  doc
    .font("./Oswald/Oswald-Bold.ttf")
    .fontSize(10)
    .fillColor("#FFFFFF")
    .text(`OODF`, {
      align: "center",
    });

  doc
    .font("./Oswald/Oswald-Medium.ttf")
    .fontSize(20)
    .fillColor("#0000FF")
    .text(`THE END`, { align: "center" });

  doc.end();
};

main();
