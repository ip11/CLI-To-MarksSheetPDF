// import PDFTable from "pdfkit-table";
// import HeadersPlugin from "pdfkit-table/plugins/headers";
// import AutoTableAltPlugin from "pdfkit-table/plugins/autoTableAlt";

// const table = new PDFTable(doc, { bottomMargin: 30 });
// table.addPlugin(new HeadersPlugin());
// table.addPlugin(new AutoTableAltPlugin());

// doc.pipe(fs.createWriteStream("ss.pdf"));

// // Load custom font file
// const customFont = "./Oswald/Oswald-Bold.ttf";
// doc.registerFont("CustomFont", customFont);

// // Set custom font as current font
// doc.font("CustomFont");

// // Add some text with the custom font
// doc.fontSize(18).text("Hello World!", { align: "center" });
// // Define table data
// const data = [
//   ["Name", "Age", "Country"],
//   ["John", "28", "USA"],
//   ["Emily", "32", "Canada"],
//   ["Tom", "24", "UK"],
// ];

// table.setData(data);

// // Draw table stroke
// table.draw(200, 100, { width: 400, height: table.height(), lineWidth: 1 });

// doc.end();
