const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");

/* =========================
   COMMON DATA FETCH
========================= */
async function getEventRegistrations(eventName) {
  return await Registration.find({
    eventName,
    status: "Approved"
  });
}

/* =========================
   CSV REPORT (TABLE FORMAT)
========================= */
router.get("/csv/:eventName", async (req, res) => {
  const data = await getEventRegistrations(req.params.eventName);

  const fields = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Department", value: "department" },
    { label: "College", value: "college" },
    { label: "Payment Mode", value: "paymentMode" }
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment(`${req.params.eventName}-report.csv`);
  res.send(csv);
});

/* =========================
   EXCEL REPORT (STYLED TABLE)
========================= */
router.get("/excel/:eventName", async (req, res) => {
  const data = await getEventRegistrations(req.params.eventName);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Participants");

  /* ===== COLLEGE HEADER ===== */
  sheet.mergeCells("A1:F1");
  sheet.mergeCells("A2:F2");

  sheet.getCell("A1").value =
    "Ganadipathy Tulsi's Jain Engineering College";
  sheet.getCell("A1").font = {
    size: 16,
    bold: true,
    color: { argb: "FFFFFFFF" }
  };
  sheet.getCell("A1").alignment = { horizontal: "center" };
  sheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1F4E79" }
  };

  sheet.getCell("A2").value =
    "Chittoor–Cuddalore Road, Kanniyambadi, Vellore – 632102";
  sheet.getCell("A2").alignment = { horizontal: "center" };

  sheet.mergeCells("A4:F4");
  sheet.getCell("A4").value = `Event: ${req.params.eventName}`;
  sheet.getCell("A4").font = { bold: true };

  /* ===== TABLE HEADER ===== */
  sheet.columns = [
    { header: "Name", key: "name", width: 22 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Department", key: "department", width: 20 },
    { header: "College", key: "college", width: 30 },
    { header: "Payment", key: "paymentMode", width: 15 }
  ];

  const headerRow = sheet.getRow(6);
  headerRow.eachCell(cell => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.alignment = { horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4472C4" }
    };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" }
    };
  });

  /* ===== DATA ROWS ===== */
  data.forEach(item => sheet.addRow(item));

  sheet.eachRow({ includeEmpty: false }, row => {
    row.eachCell(cell => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" }
      };
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.params.eventName}.xlsx`
  );

  await workbook.xlsx.write(res);
  res.end();
});

/* =========================
   PDF REPORT (PROPER TABLE)
========================= */
router.get("/pdf/:eventName", async (req, res) => {
  const data = await getEventRegistrations(req.params.eventName);

  const doc = new PDFDocument({ margin: 30, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.params.eventName}.pdf`
  );

  doc.pipe(res);

  /* ===== HEADER ===== */
  doc
    .fontSize(16)
    .fillColor("#1F4E79")
    .text(
      "Ganadipathy Tulsi's Jain Engineering College",
      { align: "center" }
    );

  doc
    .fontSize(11)
    .fillColor("black")
    .text(
      "Chittoor–Cuddalore Road, Kanniyambadi, Vellore – 632102",
      { align: "center" }
    );

  doc.moveDown();
  doc.text(`Event: ${req.params.eventName}`, { align: "center" });
  doc.moveDown(1.5);

  /* ===== TABLE SETUP ===== */
  const tableTop = doc.y;
  const colWidths = [30, 90, 140, 80, 120];
  const rowHeight = 20;

  const drawRow = (y, row, header = false) => {
    let x = doc.page.margins.left;
    row.forEach((text, i) => {
      doc
        .rect(x, y, colWidths[i], rowHeight)
        .fillAndStroke(
          header ? "#4472C4" : "#FFFFFF",
          "#000000"
        );

      doc
        .fillColor(header ? "white" : "black")
        .font(header ? "Helvetica-Bold" : "Helvetica")
        .fontSize(9)
        .text(text, x + 4, y + 6, {
          width: colWidths[i] - 8,
          align: "left"
        });

      x += colWidths[i];
    });
  };

  /* ===== TABLE HEADER ===== */
  drawRow(
    tableTop,
    ["#", "Name", "Email", "Dept", "College"],
    true
  );

  /* ===== TABLE DATA ===== */
  let y = tableTop + rowHeight;
  data.forEach((r, i) => {
    drawRow(y, [
      i + 1,
      r.name,
      r.email,
      r.department,
      r.college
    ]);
    y += rowHeight;
  });

  doc.end();
});

module.exports = router;
