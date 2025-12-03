const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} = require('docx');

// Import shared resume data - single source of truth
const resumeData = require('../data/resume.json');

const generateStaticDocx = async () => {
  // Create document with ATS-friendly settings
  const doc = new Document({
    creator: 'Yonatan Ayalon Professional Resume',
    title: 'Yonatan Ayalon - Senior Front-End Software Engineer Resume',
    description:
      'Frontend Engineer Resume - React, TypeScript, JavaScript Expert',
    keywords:
      'Senior Software Engineer, Frontend Developer, React, TypeScript, JavaScript, Next.js, Redux, Web Development, UI/UX, A/B Testing, Micro Frontend, Design Systems',
    sections: [
      {
        properties: {},
        children: [
          // Header - Name and Title
          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalInfo.name,
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
                text: resumeData.personalInfo.title,
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
                  resumeData.personalInfo.email,
                  resumeData.personalInfo.location,
                  resumeData.personalInfo.linkedin,
                  resumeData.personalInfo.github,
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
          ...resumeData.professionalSummary.map(
            (paragraph, index) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: paragraph.replace(/<[^>]*>/g, ''),
                    size: 20, // 10pt font
                  }),
                ],
                spacing: {
                  after:
                    index < resumeData.professionalSummary.length - 1
                      ? 200
                      : 400,
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
            spacing: { before: 600, after: 200 },
          }),

          // Technical Skills Content
          ...Object.entries(resumeData.skills)
            .map(([category, skills]) => [
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
              }),
            ])
            .flat(),

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
            spacing: { before: 600, after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: resumeData.personalQualities.join(' • '),
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
            spacing: { before: 600, after: 200 },
          }),

          // Professional Experience Content
          ...resumeData.experience
            .map((exp, index) => [
              // Add spacing between jobs
              ...(index > 0
                ? [
                    new Paragraph({
                      children: [new TextRun({ text: '', size: 20 })],
                      spacing: { after: 300 },
                    }),
                  ]
                : []),

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
              ...exp.achievements.map(
                (achievement) =>
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
              ),
            ])
            .flat(),
        ],
      },
    ],
  });

  return doc;
};

// Generate DOCX
const generateDocx = async () => {
  try {
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate DOCX
    console.log('Generating DOCX...');
    const doc = await generateStaticDocx();
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(
      path.join(publicDir, 'yonatan-ayalon-resume.docx'),
      buffer
    );
    console.log(
      '✅ ATS-optimized DOCX generated: /public/yonatan-ayalon-resume.docx'
    );

    console.log('\n🎉 ATS-Optimized Static DOCX generated successfully!');
    console.log('📋 ATS Features:');
    console.log(
      '   • Clean, simple formatting for maximum parsing compatibility'
    );
    console.log('   • Standard fonts and consistent spacing');
    console.log('   • Keyword-optimized technical skills section');
    console.log('   • Clear section headers with proper hierarchy');
    console.log('   • Simple bullet points and standard formatting');
    console.log('\n🔍 Professional DOCX format for ATS systems and recruiters');
    console.log(
      '📄 Content synced from shared data source in /data/resume.json'
    );
  } catch (error) {
    console.error('❌ Error generating DOCX:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  generateDocx();
}

module.exports = { generateStaticDocx, generateDocx };
