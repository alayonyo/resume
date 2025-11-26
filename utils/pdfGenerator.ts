import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export interface ResumeData {
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

// ATS-Optimized PDF Generator
// Uses clean, simple formatting that ATS systems can easily parse
export const generateResumePDF = async (
  data: ResumeData = resumeData
): Promise<void> => {
  try {
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
    const addText = (
      text: string,
      fontSize: number = 10,
      isBold: boolean = false,
      indent: number = 0
    ) => {
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

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    };

    // ATS-friendly section headers with clear formatting
    const addSection = (title: string) => {
      yPosition += sectionSpacing; // Space before section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(title.toUpperCase(), margin, yPosition);
      yPosition += lineHeight;
      yPosition += sectionSpacing * 0.5; // Space after section title
    };

    // ATS-Optimized Header - Clean and parseable
    // Add comprehensive PDF metadata for SEO and ATS systems
    pdf.setProperties({
      title: 'Yonatan Ayalon - Senior Front-End Software Engineer Resume',
      subject:
        'Frontend Engineer Resume - React, TypeScript, JavaScript Expert',
      author: 'Yonatan Ayalon',
      keywords:
        'Senior Software Engineer, Frontend Developer, React, TypeScript, JavaScript, Next.js, Redux, Web Development, UI/UX, A/B Testing, Micro Frontend, Design Systems',
      creator: 'Yonatan Ayalon Professional Resume',
    });

    // Name - prominent but ATS-friendly sizing
    addText(data.personalInfo.name, 16, true);

    // Job Title - clear and keyword-rich
    addText(data.personalInfo.title, 12, false);

    yPosition += sectionSpacing;

    // Contact Information - ATS-friendly format
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.location,
      data.personalInfo.linkedin,
      data.personalInfo.github,
    ].join(' | ');

    addText(contactInfo, 10, false);
    yPosition += sectionSpacing * 2;

    // PROFESSIONAL SUMMARY - ATS keyword-optimized
    addSection('PROFESSIONAL SUMMARY');
    data.professionalSummary.forEach((paragraph, index) => {
      const cleanText = paragraph.replace(/<[^>]*>/g, '');
      addText(cleanText, 10);
      if (index < data.professionalSummary.length - 1) {
        yPosition += sectionSpacing * 0.5;
      }
    });

    // TECHNICAL SKILLS - ATS-optimized with high keyword density
    addSection('TECHNICAL SKILLS');
    Object.entries(data.skills).forEach(([category, skills]) => {
      addText(category + ':', 10, true);
      const skillsText = skills.join(' • ');
      addText(skillsText, 10, false, 5);
      yPosition += sectionSpacing * 0.8;
    });

    // CORE COMPETENCIES - ATS-friendly soft skills
    addSection('CORE COMPETENCIES');
    const qualitiesText = data.personalQualities.join(' • ');
    addText(qualitiesText, 10);

    yPosition += sectionSpacing * 2;

    // PROFESSIONAL EXPERIENCE - ATS-optimized format
    addSection('PROFESSIONAL EXPERIENCE');

    data.experience.forEach((exp, index) => {
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

    // Save ATS-optimized PDF
    const fileName = `yonatan-ayalon-resume-${
      new Date().toISOString().split('T')[0]
    }.pdf`;
    pdf.save(fileName);

    console.log('✅ ATS-optimized PDF generated successfully!');
  } catch (error) {
    console.error('❌ Error generating ATS-optimized PDF:', error);
    throw new Error('Failed to generate ATS-optimized PDF');
  }
};

// Export resume data for external use
export { resumeData };
