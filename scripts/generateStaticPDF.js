const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

// Import shared resume data - single source of truth
const resumeData = require('../data/resume.json');

const generateStaticPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ATS-Optimized spacing - clean and consistent
  const margin = 15; // Standard margins for ATS readability
  const lineHeight = 4.5; // Optimal line spacing for ATS parsing
  const sectionSpacing = 2; // Clear section breaks
  const experienceSpacing = 3; // Proper job separations

  let yPosition = margin;

  // ATS-Optimized text formatting function
  const addText = (text, fontSize = 10, isBold = false, indent = 0) => {
    // Check page boundaries with proper margins
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(fontSize);
    // Use standard fonts for maximum ATS compatibility
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(0, 0, 0); // Always black text for ATS

    const maxWidth = pageWidth - 2 * margin - indent;
    const lines = pdf.splitTextToSize(text, maxWidth);

    lines.forEach((line) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin + indent, yPosition);
      yPosition += lineHeight;
    });
  };

  // ATS-friendly section headers with clear formatting
  const addSection = (title) => {
    yPosition += sectionSpacing; // Space before section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(title.toUpperCase(), margin, yPosition);
    yPosition += lineHeight;
    yPosition += sectionSpacing * 0.5; // Space after section title
  };

  // Add comprehensive PDF metadata for SEO and ATS systems
  pdf.setProperties({
    title: 'Yonatan Ayalon - Senior Front-End Software Engineer Resume',
    subject: 'Frontend Engineer Resume - React, TypeScript, JavaScript Expert',
    author: 'Yonatan Ayalon',
    keywords:
      'Senior Software Engineer, Frontend Developer, React, TypeScript, JavaScript, Next.js, Redux, Web Development, UI/UX, A/B Testing, Micro Frontend, Design Systems',
    creator: 'Yonatan Ayalon Professional Resume',
  });

  // ATS-Optimized Header - Clean and parseable
  // Name - prominent but ATS-friendly sizing
  addText(resumeData.personalInfo.name, 16, true);

  // Job Title - clear and keyword-rich
  addText(resumeData.personalInfo.title, 12, false);

  yPosition += sectionSpacing;

  // Contact Information - ATS-friendly format
  const contactInfo = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.location,
    resumeData.personalInfo.linkedin,
    resumeData.personalInfo.github,
  ].join(' | ');

  addText(contactInfo, 10, false);
  yPosition += sectionSpacing * 2;

  // PROFESSIONAL SUMMARY - ATS keyword-optimized
  addSection('PROFESSIONAL SUMMARY');
  resumeData.professionalSummary.forEach((paragraph, index) => {
    const cleanText = paragraph.replace(/<[^>]*>/g, '');
    addText(cleanText, 10);
    if (index < resumeData.professionalSummary.length - 1) {
      yPosition += sectionSpacing * 0.5;
    }
  });

  // TECHNICAL SKILLS - ATS-optimized with high keyword density
  yPosition += sectionSpacing * 2;
  addSection('TECHNICAL SKILLS');
  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    addText(category + ':', 10, true);
    const skillsText = skills.join(' • ');
    addText(skillsText, 10, false, 5);
    yPosition += sectionSpacing * 0.8;
  });

  // CORE COMPETENCIES - ATS-friendly soft skills
  yPosition += sectionSpacing * 2;
  addSection('CORE COMPETENCIES');
  const qualitiesText = resumeData.personalQualities.join(' • ');
  addText(qualitiesText, 10);

  yPosition += sectionSpacing * 2;

  // PROFESSIONAL EXPERIENCE - ATS-optimized format
  yPosition += sectionSpacing * 2;
  addSection('PROFESSIONAL EXPERIENCE');

  resumeData.experience.forEach((exp, index) => {
    if (index > 0) yPosition += experienceSpacing;

    // Job title and company - clear hierarchy for ATS
    addText(exp.title, 11, true);
    addText(`${exp.company} | ${exp.period}`, 10, false);
    yPosition += sectionSpacing * 0.5;

    // Achievements with consistent bullet formatting
    exp.achievements.forEach((achievement) => {
      const cleanAchievement = achievement.replace(/<[^>]*>/g, '');
      addText(`• ${cleanAchievement}`, 9, false, 3);
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
    console.log(
      '✅ ATS-optimized PDF generated: /public/yonatan-ayalon-resume.pdf'
    );

    console.log('\n🎉 ATS-Optimized Static PDF generated successfully!');
    console.log('📋 ATS Features:');
    console.log(
      '   • Clean, simple formatting for maximum parsing compatibility'
    );
    console.log('   • Standard fonts and consistent spacing');
    console.log('   • Keyword-optimized technical skills section');
    console.log('   • Clear section headers with proper hierarchy');
    console.log('   • Simple bullet points and standard formatting');
    console.log('\n🔍 SEO-friendly and directly linkable/indexable');
    console.log(
      '📄 Content synced from shared data source in /data/resume.json'
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
