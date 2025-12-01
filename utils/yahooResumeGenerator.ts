import jsPDF from 'jspdf';
import { yahooResumeData } from '../data/yahooResumeData';

export interface YahooResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin: string;
    github: string;
    stackoverflow: string;
  };
  professionalSummary: string[];
  skills: {
    [category: string]: string[];
  };
  personalQualities: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
}

// Yahoo-Optimized PDF Generator
// Tailored for Yahoo Frontend Engineer position with emphasis on relevant skills
export const generateYahooResumePDF = async (
  data: YahooResumeData = yahooResumeData
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // ATS-Optimized spacing - clean and consistent
    const margin = 15;
    const lineHeight = 4.5;
    const sectionSpacing = 2;
    const experienceSpacing = 3;

    let yPosition = margin;

    // ATS-Optimized text formatting function
    const addText = (
      text: string,
      fontSize: number = 10,
      isBold: boolean = false,
      indent: number = 0
    ) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      pdf.setTextColor(0, 0, 0);

      const maxWidth = pageWidth - 2 * margin - indent;
      const lines = pdf.splitTextToSize(text, maxWidth);

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    };

    // Section headers with clear formatting
    const addSection = (title: string) => {
      yPosition += sectionSpacing;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(title.toUpperCase(), margin, yPosition);
      yPosition += lineHeight;
      yPosition += sectionSpacing * 0.5;
    };

    // Yahoo-optimized PDF metadata
    pdf.setProperties({
      title:
        'Yonatan Ayalon - Senior Frontend Engineer Resume - Yahoo Position',
      subject:
        'Frontend Engineer Resume - React, Next.js, TypeScript, A/B Testing, Performance Optimization',
      author: 'Yonatan Ayalon',
      keywords:
        'Yahoo, Frontend Engineer, React, Next.js, TypeScript, JavaScript, A/B Testing, Performance Optimization, Web Development, UI/UX, Responsive Design, Testing, AWS, Node.js, Design Systems, Accessibility, Cross-browser Compatibility',
      creator: 'Yonatan Ayalon - Yahoo Frontend Engineer Application',
    });

    // Header - Name and Title
    addText(data.personalInfo.name, 16, true);
    addText(data.personalInfo.title, 12, false);
    yPosition += sectionSpacing;

    // Contact Information
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.github,
    ].join(' | ');

    addText(contactInfo, 10, false);
    yPosition += sectionSpacing * 2;

    // PROFESSIONAL SUMMARY - Yahoo-focused
    addSection('PROFESSIONAL SUMMARY');
    data.professionalSummary.forEach((paragraph, index) => {
      const cleanText = paragraph.replace(/<[^>]*>/g, '');
      addText(cleanText, 10);
      if (index < data.professionalSummary.length - 1) {
        yPosition += sectionSpacing * 0.5;
      }
    });

    // TECHNICAL SKILLS - Reorganized to highlight Yahoo-relevant technologies first
    addSection('TECHNICAL SKILLS');

    // Prioritize skills most relevant to Yahoo position
    const skillOrder = [
      'Frontend Technologies',
      'Full-Stack JavaScript',
      'Testing & Quality Assurance',
      'User Experience & Optimization',
      'Design Systems & Architecture',
      'Cloud & Infrastructure',
    ];

    skillOrder.forEach((category) => {
      if (data.skills[category]) {
        addText(category + ':', 10, true);
        const skillsText = data.skills[category].join(' • ');
        addText(skillsText, 10, false, 5);
        yPosition += sectionSpacing * 0.8;
      }
    });

    // CORE COMPETENCIES
    addSection('CORE COMPETENCIES');
    const qualitiesText = data.personalQualities.join(' • ');
    addText(qualitiesText, 10);

    yPosition += sectionSpacing * 2;

    // PROFESSIONAL EXPERIENCE - Emphasized relevant experience
    addSection('PROFESSIONAL EXPERIENCE');

    data.experience.forEach((exp, index) => {
      if (index > 0) yPosition += experienceSpacing;

      // Job title and company
      addText(exp.title, 11, true);
      addText(`${exp.company} | ${exp.period}`, 10, false);
      yPosition += sectionSpacing * 0.5;

      // Achievements with Yahoo-relevant highlights
      exp.achievements.forEach((achievement) => {
        const cleanAchievement = achievement.replace(/<[^>]*>/g, '');
        addText(`• ${cleanAchievement}`, 9, false, 3);
      });
    });

    // Save Yahoo-specific PDF
    const fileName = 'yonatan-ayalon-resume-yahoo-frontend-engineer.pdf';
    pdf.save(fileName);

    console.log('✅ Yahoo-optimized resume PDF generated successfully!');
    console.log(`📄 Saved as: ${fileName}`);
  } catch (error) {
    console.error('❌ Error generating Yahoo-optimized PDF:', error);
    throw new Error('Failed to generate Yahoo-optimized PDF');
  }
};

// Export Yahoo resume data for external use
export { yahooResumeData };
