const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

// Import shared resume data - single source of truth
const resumeData = require('../data/resume.json');

const generateStaticPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Professional spacing settings
  const margin = 12;
  const lineHeight = 5;
  const sectionSpacing = 1.5;
  const experienceSpacing = 2.5;

  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text, fontSize = 10, isBold = false, indent = 0) => {
    if (yPosition > pageHeight - 18) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');

    const maxWidth = pageWidth - 2 * margin - indent;
    const lines = pdf.splitTextToSize(text, maxWidth);

    lines.forEach((line) => {
      if (yPosition > pageHeight - 18) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin + indent, yPosition);
      yPosition += lineHeight;
    });
  };

  const addSection = (title) => {
    yPosition += lineHeight * 0.8;
    const titleSize = 13;
    addText(title, titleSize, true);
    yPosition += sectionSpacing;
  };

  // Add PDF metadata for SEO
  pdf.setProperties({
    title: 'Yonatan Ayalon - Senior Front-End Software Engineer Resume',
    subject:
      'Professional Resume - Frontend Engineer with 15+ years experience',
    author: 'Yonatan Ayalon',
    keywords:
      'frontend engineer, react, typescript, javascript, web development, senior software engineer',
    creator: 'Yonatan Ayalon Resume Website',
    producer: 'Next.js Resume Application',
  });

  // Header
  const nameSize = 18;
  const titleSize = 13;
  const contactSize = 10;

  addText(resumeData.personalInfo.name, nameSize, true);
  addText(resumeData.personalInfo.title, titleSize, false);

  // Add email as clickable blue link and location in black
  pdf.setFontSize(contactSize);
  pdf.setFont('helvetica', 'normal');

  // Add email as blue clickable link
  pdf.setTextColor(0, 0, 255); // Blue color for email
  const emailText = resumeData.personalInfo.email;
  const emailWidth = pdf.getTextWidth(emailText);
  pdf.textWithLink(emailText, margin, yPosition, {
    url: `mailto:${emailText}`,
  });

  // Add separator and location in black
  pdf.setTextColor(0, 0, 0); // Black color for separator and location
  const separatorX = margin + emailWidth;
  pdf.text(' | ', separatorX, yPosition);
  const separatorWidth = pdf.getTextWidth(' | ');
  pdf.text(
    resumeData.personalInfo.location,
    separatorX + separatorWidth,
    yPosition
  );

  yPosition += lineHeight * 1.2;

  // Professional Summary
  addSection('PROFESSIONAL SUMMARY');
  const summarySize = 10;
  resumeData.professionalSummary.forEach((paragraph) => {
    addText(paragraph.replace(/<[^>]*>/g, ''), summarySize);
    yPosition += sectionSpacing * 0.8;
  });

  // Professional Skills
  addSection('PROFESSIONAL SKILLS');
  const skillCategorySize = 10;
  const skillSize = 9.5;
  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    addText(category, skillCategorySize, true);
    const skillsText = skills.join(' • ');
    addText(skillsText, skillSize, false, 4);
    yPosition += sectionSpacing * 0.6;
  });

  // Personal Skills / Character
  addSection('PERSONAL SKILLS / CHARACTER');
  const qualitiesText = resumeData.personalQualities.join(' • ');
  addText(qualitiesText, skillSize, false);
  yPosition += lineHeight * 1;

  // Professional Experience - Always start on new page
  pdf.addPage();
  yPosition = margin;
  addSection('PROFESSIONAL EXPERIENCE');
  const jobTitleSize = 10;
  const companySize = 9;
  const achievementSize = 8;

  resumeData.experience.forEach((exp, index) => {
    if (index > 0) yPosition += experienceSpacing;

    addText(exp.title, jobTitleSize, true);
    addText(`${exp.company} • ${exp.period}`, companySize, false);
    yPosition += sectionSpacing * 0.6;

    exp.achievements.forEach((achievement) => {
      const cleanAchievement = achievement.replace(/<[^>]*>/g, '');
      addText(`• ${cleanAchievement}`, achievementSize, false, 5);
    });
  });

  return pdf;
};

// Generate PDF
const generatePDF = () => {
  try {
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate PDF
    console.log('Generating PDF...');
    const pdf = generateStaticPDF();
    const buffer = Buffer.from(pdf.output('arraybuffer'));
    fs.writeFileSync(path.join(publicDir, 'yonatan-ayalon-resume.pdf'), buffer);
    console.log('✅ PDF generated: /public/yonatan-ayalon-resume.pdf');

    console.log('\n🎉 Static PDF generated successfully!');
    console.log(
      'This file is now SEO-friendly and can be directly linked/indexed.'
    );
    console.log(
      '📄 Content synced from shared data source in /data/resumeData.js'
    );
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  generatePDF();
}

module.exports = { generateStaticPDF, generatePDF };
