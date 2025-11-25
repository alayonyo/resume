import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
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

export const generateResumePDF = async (
  resumeData: ResumeData
): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Professional margins and spacing for optimal readability
    const margin = 12; // Professional margins with good padding
    const lineHeight = 5; // Comfortable line spacing
    const sectionSpacing = 1.5; // Clear section breaks
    const experienceSpacing = 2.5; // Proper job separations

    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addText = (
      text: string,
      fontSize: number = 10,
      isBold: boolean = false,
      indent: number = 0
    ) => {
      // Use reasonable page height with professional bottom margin
      if (yPosition > pageHeight - 18) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');

      const maxWidth = pageWidth - 2 * margin - indent;
      const lines = pdf.splitTextToSize(text, maxWidth);

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 18) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
    };

    const addSection = (title: string) => {
      yPosition += lineHeight * 0.8; // Comfortable space before section
      const titleSize = 13; // Clear section titles
      addText(title, titleSize, true);
      yPosition += sectionSpacing; // Proper space after section title
    };

    // Header - professional sizing with good hierarchy
    const nameSize = 18; // Prominent name sizing
    const titleSize = 13;
    const contactSize = 10;

    addText(resumeData.personalInfo.name, nameSize, true);
    addText(resumeData.personalInfo.title, titleSize, false);

    // Add email as clickable blue link and location in black
    if (yPosition > pageHeight - 18) {
      pdf.addPage();
      yPosition = margin;
    }

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

    yPosition += lineHeight;
    yPosition += lineHeight * 1.2; // Comfortable header spacing

    // Professional Summary
    addSection('PROFESSIONAL SUMMARY');
    const summarySize = 10;
    resumeData.professionalSummary.forEach((paragraph) => {
      addText(paragraph.replace(/<[^>]*>/g, ''), summarySize);
      yPosition += sectionSpacing * 0.8; // Comfortable paragraph spacing
    });

    // Professional Skills
    addSection('PROFESSIONAL SKILLS');
    const skillCategorySize = 10;
    const skillSize = 9.5;
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      addText(category, skillCategorySize, true);
      const skillsText = skills.join(' • ');
      addText(skillsText, skillSize, false, 4); // Comfortable indent
      yPosition += sectionSpacing * 0.6; // Balanced skill category spacing
    });

    // Personal Skills / Character
    addSection('PERSONAL SKILLS / CHARACTER');
    const qualitiesText = resumeData.personalQualities.join(' • ');
    addText(qualitiesText, skillSize, false);
    yPosition += lineHeight * 1; // Comfortable spacing before page break

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
      yPosition += sectionSpacing * 0.6; // Comfortable space before achievements

      exp.achievements.forEach((achievement) => {
        const cleanAchievement = achievement.replace(/<[^>]*>/g, '');
        addText(`• ${cleanAchievement}`, achievementSize, false, 5); // Professional indent
      });
    });

    // Save the PDF
    const fileName = 'yonatan-ayalon-resume.pdf';
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
