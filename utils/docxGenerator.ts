import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
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

// ATS-Optimized DOCX Generator
// Uses clean, simple formatting that ATS systems can easily parse
export const generateResumeDocx = async (
  data: ResumeData = resumeData
): Promise<void> => {
  try {
    // Create document with ATS-friendly settings
    const doc = new Document({
      creator: 'Yonatan Ayalon Professional Resume',
      title: 'Yonatan Ayalon - Senior Front-End Software Engineer Resume',
      description: 'Frontend Engineer Resume - React, TypeScript, JavaScript Expert',
      keywords: 'Senior Software Engineer, Frontend Developer, React, TypeScript, JavaScript, Next.js, Redux, Web Development, UI/UX, A/B Testing, Micro Frontend, Design Systems',
      sections: [
        {
          properties: {},
          children: [
            // Header - Name and Title
            new Paragraph({
              children: [
                new TextRun({
                  text: data.personalInfo.name,
                  bold: true,
                  size: 32, // 16pt font
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: data.personalInfo.title,
                  size: 24, // 12pt font
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Contact Information - ATS-friendly format
            new Paragraph({
              children: [
                new TextRun({
                  text: [
                    data.personalInfo.email,
                    data.personalInfo.location,
                    data.personalInfo.linkedin,
                    data.personalInfo.github
                  ].join(' | '),
                  size: 20, // 10pt font
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            // Professional Summary Section
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL SUMMARY',
                  bold: true,
                  size: 24, // 12pt font
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
            }),

            // Professional Summary Content
            ...data.professionalSummary.map((paragraph, index) => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: paragraph.replace(/<[^>]*>/g, ''),
                    size: 20, // 10pt font
                  }),
                ],
                spacing: { 
                  after: index < data.professionalSummary.length - 1 ? 200 : 400 
                },
              })
            ),

            // Technical Skills Section
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TECHNICAL SKILLS',
                  bold: true,
                  size: 24, // 12pt font
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
            }),

            // Technical Skills Content
            ...Object.entries(data.skills).map(([category, skills]) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: category + ':',
                    bold: true,
                    size: 20, // 10pt font
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: skills.join(' • '),
                    size: 20, // 10pt font
                  }),
                ],
                indent: { left: 360 }, // 0.25 inch indent
                spacing: { after: 200 },
              })
            ]).flat(),

            // Core Competencies Section
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CORE COMPETENCIES',
                  bold: true,
                  size: 24, // 12pt font
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: data.personalQualities.join(' • '),
                  size: 20, // 10pt font
                }),
              ],
              spacing: { after: 600 },
            }),

            // Professional Experience Section
            new Paragraph({
              children: [
                new TextRun({
                  text: 'PROFESSIONAL EXPERIENCE',
                  bold: true,
                  size: 24, // 12pt font
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
            }),

            // Professional Experience Content
            ...data.experience.map((exp, index) => [
              // Add spacing between jobs
              ...(index > 0 ? [new Paragraph({
                children: [new TextRun({ text: '', size: 20 })],
                spacing: { after: 300 },
              })] : []),
              
              // Job Title
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.title,
                    bold: true,
                    size: 22, // 11pt font
                  }),
                ],
                spacing: { after: 100 },
              }),
              
              // Company and Period
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.company} | ${exp.period}`,
                    size: 20, // 10pt font
                  }),
                ],
                spacing: { after: 200 },
              }),
              
              // Achievements
              ...exp.achievements.map((achievement) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${achievement.replace(/<[^>]*>/g, '')}`,
                      size: 18, // 9pt font
                    }),
                  ],
                  indent: { left: 180 }, // 0.125 inch indent
                  spacing: { after: 100 },
                })
              )
            ]).flat(),
          ],
        },
      ],
    });

    // Generate and save DOCX file
    const buffer = await Packer.toBuffer(doc);
    const fileName = `yonatan-ayalon-resume-${new Date().toISOString().split('T')[0]}.docx`;
    
    // Create blob and save file
    const blob = new Blob([new Uint8Array(buffer)], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    saveAs(blob, fileName);
    
    console.log('✅ ATS-optimized DOCX generated successfully!');
  } catch (error) {
    console.error('❌ Error generating ATS-optimized DOCX:', error);
    throw new Error('Failed to generate ATS-optimized DOCX');
  }
};

// Export resume data for external use
export { resumeData };