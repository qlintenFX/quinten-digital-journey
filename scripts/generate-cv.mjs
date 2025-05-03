// Script to generate a simple PDF with the 4 projects from the portfolio
import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new PDF document
const doc = new jsPDF();

// Set font properties
doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.text('Projects', 20, 30);

// Project data
const projects = [
  {
    title: "IT Polis Voting System",
    semester: "SKIL2 Project"
  },
  {
    title: "App Hosting Platform for Clients",
    semester: "SKIL2.2 Project"
  },
  {
    title: "Security Awareness Campaign Movie",
    semester: "Media Project"
  },
  {
    title: "KeyedColors",
    semester: "Personal Project"
  }
];

// Add projects to PDF (one per line)
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);

projects.forEach((project, index) => {
  const y = 50 + (index * 10);
  doc.text(`${index + 1}. ${project.title} (${project.semester})`, 20, y);
});

// Add name and title at the top
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.text('Quinten De Meyer', 20, 15);

// Ensure directory exists
const outputDir = path.resolve(__dirname, '../public/files');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Output file path
const outputPath = path.join(outputDir, 'CV_Quinten.pdf');

// Get the PDF as buffer
const pdfBuffer = doc.output('arraybuffer');

// Write to file
fs.writeFileSync(outputPath, Buffer.from(pdfBuffer));

console.log(`PDF generated successfully: ${outputPath}`); 