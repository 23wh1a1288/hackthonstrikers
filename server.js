const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/generate-pdf", (req, res) => {
  console.log("Received data:", req.body); // ✅ Debugging log

  const {
    name,
    email,
    phoneNumber,
    address,
    linkedin,
    github,
    summary,
    education,
    experience,
    skills,
    projects,
    certifications,
    languages,
    hobbies,
  } = req.body;

  // ✅ Validate required fields
  if (!name || !email || !phoneNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // ✅ Create PDF document
    const doc = new PDFDocument();
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res); // ✅ Stream PDF directly to response

    // ✅ Add content to PDF
    doc.fontSize(20).text("Resume", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phoneNumber}`);
    doc.text(`Address: ${address}`);
    doc.text(`LinkedIn: ${linkedin}`);
    doc.text(`GitHub: ${github}`);
    doc.moveDown();

    doc.fontSize(16).text("Summary:");
    doc.fontSize(14).text(summary).moveDown();

    doc.fontSize(16).text("Education:");
    education.forEach((edu) => {
      doc.fontSize(14).text(`${edu.degree} - ${edu.university} (${edu.year})`);
    });
    doc.moveDown();

    doc.fontSize(16).text("Experience:");
    experience.forEach((exp) => {
      doc.fontSize(14).text(`${exp.role} at ${exp.company} (${exp.duration})`);
      doc.text(`Responsibilities: ${exp.responsibilities}`).moveDown();
    });

    doc.fontSize(16).text("Skills:");
    doc.fontSize(14).text(skills).moveDown();

    doc.fontSize(16).text("Projects:");
    projects.forEach((proj) => {
      doc.fontSize(14).text(`${proj.title} - ${proj.description} (Tech: ${proj.technologies})`).moveDown();
    });

    doc.fontSize(16).text("Certifications:");
    certifications.forEach((cert) => {
      doc.fontSize(14).text(`${cert.name} - ${cert.organization} (${cert.year})`);
    });
    doc.moveDown();

    doc.fontSize(16).text("Languages:");
    doc.fontSize(14).text(languages).moveDown();

    doc.fontSize(16).text("Hobbies:");
    doc.fontSize(14).text(hobbies).moveDown();

    doc.end(); // ✅ Ensure the PDF stream is properly closed
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))