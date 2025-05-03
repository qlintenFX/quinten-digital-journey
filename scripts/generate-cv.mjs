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

// Project data with brief descriptions
const projects = [
  {
    title: "IT Polis Voting System",
    semester: "SKIL2 Project",
    description: "Created database architecture and implemented real-time data processing for a voting system. Learned secure database design and NFC technology integration."
  },
  {
    title: "App Hosting Platform for Clients",
    semester: "SKIL2.2 Project",
    description: "Managed Kubernetes cluster for PHP/Laravel applications. Learned containerization, high availability deployment, and implemented CIS security controls."
  },
  {
    title: "Security Awareness Campaign Movie",
    semester: "Media Project",
    description: "Served as main editor and creative director for cybersecurity awareness film. Developed skills in visual storytelling and communicating complex security concepts."
  },
  {
    title: "KeyedColors",
    semester: "Personal Project",
    description: "Developed Windows application for custom display profiles with hotkey support. Gained experience with Windows API, system tray integration, and UI/UX design."
  }
];

// Add projects to PDF with descriptions
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);

let y = 50;
projects.forEach((project, index) => {
  // Project title and semester
  doc.setFont('helvetica', 'bold');
  doc.text(`${index + 1}. ${project.title} (${project.semester})`, 20, y);
  
  // Project description
  doc.setFont('helvetica', 'normal');
  const textLines = doc.splitTextToSize(project.description, 170);
  doc.text(textLines, 25, y + 5);
  
  // Move to next project with spacing
  y += 15 + (textLines.length * 5);
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