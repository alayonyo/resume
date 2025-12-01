const { jsPDF } = require('jspdf');
const path = require('path');
const fs = require('fs');

// Yahoo-specific resume data
const yahooResumeData = {
  personalInfo: {
    name: 'Yonatan Ayalon',
    title:
      'Senior Frontend Engineer - Web Technologies & User Experience Specialist',
    email: 'yonatanayalon1@gmail.com',
    location: 'Rockville, MD',
    linkedin: 'https://www.linkedin.com/in/yonatan-ayalon-25992014/',
    github: 'https://github.com/alayonyo',
    stackoverflow: 'https://stackoverflow.com/users/2633390/yonatan-ayalon',
  },
  professionalSummary: [
    'Senior Frontend Engineer with 15+ years of experience developing large-scale web applications for millions of users. Expert in React, Next.js, TypeScript, and modern JavaScript frameworks, with deep expertise in performance optimization, A/B testing, and responsive design. Proven track record of architecting scalable micro frontend systems and implementing comprehensive testing strategies.',
    'Passionate about crafting intuitive user interfaces and experiences with modern web technologies. Extensive experience with full-stack JavaScript development, cloud services (AWS), and CI/CD pipelines. Strong advocate for accessibility, internationalization, and cross-browser compatibility standards.',
    'Collaborative team player with excellent communication skills and experience working with product managers, UX designers, and cross-functional teams in remote environments. Committed to delivering high-quality, maintainable code and driving technical excellence through code reviews and mentorship.',
  ],
  skills: {
    'Frontend Technologies': [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript ES6+',
      'HTML5',
      'CSS3',
      'Redux Toolkit',
      'Vue.js',
      'Responsive Design',
      'Mobile Web Development',
    ],
    'Full-Stack JavaScript': [
      'Node.js',
      'Express',
      'REST APIs',
      'GraphQL',
      'Microservices',
      'API Design',
      'Serverless Architecture',
    ],
    'Testing & Quality Assurance': [
      'Jest',
      'Cypress',
      'Selenium',
      'Playwright',
      'React Testing Library',
      'Test-Driven Development',
      'E2E Testing',
      'Unit Testing',
    ],
    'Cloud & Infrastructure': [
      'AWS',
      'Azure',
      'Docker',
      'CI/CD',
      'Webpack',
      'Vite',
      'Build Optimization',
      'Performance Monitoring',
    ],
    'User Experience & Optimization': [
      'A/B Testing',
      'Performance Optimization',
      'SEO',
      'Accessibility (WCAG)',
      'Internationalization',
      'Cross-browser Compatibility',
      'Analytics Implementation',
    ],
    'Design Systems & Architecture': [
      'Component Libraries',
      'Design Systems',
      'Micro Frontend Architecture',
      'Storybook',
      'UI/UX Collaboration',
      'Reusable Components',
      'Scalable Architecture',
    ],
  },
  personalQualities: [
    'Excellent Communication Skills',
    'Collaborative Team Player',
    'Remote Work Expert',
    'Agile/SCRUM Experienced',
    'Strong Problem Solver',
    'Quality-Focused',
    'Continuous Learner',
    'Technical Leadership',
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Vimeo – Online Video Platform (Millions of Users)',
      period: '07/2020 – Present',
      achievements: [
        'Architected and maintained React (TypeScript) + Redux infrastructure for core application serving millions of users with focus on performance and scalability',
        'Designed and implemented micro frontend architecture enabling independent team deployments, improving development velocity and system maintainability',
        'Built comprehensive performance monitoring and logging systems, achieving 40% improvement in application load times through optimization strategies',
        'Led A/B testing initiatives and experimentation platform development, driving measurable improvements in user engagement and conversion rates',
        'Constructed robust E2E testing infrastructure using Selenium & WebDriverIO with BrowserStack integration for cross-browser compatibility',
        'Spearheaded design system implementation across multiple product teams, ensuring UI consistency and accelerating development cycles',
        'Collaborated cross-functionally with product managers, UX designers, and backend engineers to deliver accessible, responsive user experiences',
      ],
    },
    {
      title: 'Lead Front-End Developer',
      company: 'Credifi – FinTech Platform (Commercial Real Estate)',
      period: '01/2019 – 05/2020',
      achievements: [
        'Served as sole frontend developer responsible for flagship FinTech customer application UX/UI, managing end-to-end feature development',
        'Refactored and maintained Angular (v1 and v2+) applications in TypeScript, significantly improving application performance and user experience',
        'Directed UI/UX strategy and implemented comprehensive design system ensuring consistency across all application views and components',
        'Collaborated closely with product team to translate business requirements into intuitive user interfaces and responsive web experiences',
      ],
    },
    {
      title: 'Front-End Team Lead',
      company: 'Herolo – Frontend Solutions Agency',
      period: '04/2017 – 12/2018',
      achievements: [
        'Led team of frontend engineers developing Angular-based applications tailored to diverse customer specifications and requirements',
        'Managed complete project lifecycle: client scoping, UX collaboration, technical architecture, development execution, and delivery',
        'Promoted test-driven development practices utilizing Karma and Jasmine, improving code quality and reducing production bugs',
        'Mentored junior developers and established coding standards and best practices for scalable frontend development',
      ],
    },
    {
      title: 'Senior Software Engineer & Scrum Master',
      company: 'Optimal+ – Electronics Analytics Platform',
      period: '10/2015 – 03/2017',
      achievements: [
        'Spearheaded Angular 2 migration and TypeScript implementation for new applications, modernizing frontend technology stack',
        'Shared frontend expertise within engineering team and introduced comprehensive unit testing best practices and frameworks',
        'Served as Scrum Master facilitating Agile development cycles, improving team velocity and project delivery consistency',
        'Collaborated with cross-functional teams to deliver analytics features serving enterprise customers in electronics industry',
      ],
    },
    {
      title: 'Senior Software Engineer',
      company: 'Perion (Ex. Conduit) – Search Solutions Platform',
      period: '06/2011 – 09/2015',
      achievements: [
        'Provided technical leadership for SearchApps team, developing multiple high-scale web applications serving millions of daily users',
        'Created responsive web UIs and browser extensions with comprehensive A/B testing frameworks, significantly improving conversion rates and user engagement metrics',
        'Developed pixel-perfect responsive layouts and image portal experiences with focus on cross-browser compatibility and mobile optimization',
        'Delivered internal frontend training courses on MVC4, JavaScript best practices, and scalable design patterns for engineering teams',
        'Gained full-stack experience with .NET MVC4/5, WebAPI, database optimization, CDN implementation, and AWS EC2 deployment',
      ],
    },
    {
      title: 'Front-End Developer',
      company: 'Convertonet – Digital Marketing Platform',
      period: '03/2010 – 06/2011',
      achievements: [
        'Maintained and enhanced Flash CMS-based marketing portals with focus on user experience and conversion optimization',
        'Delivered pixel-perfect landing pages and responsive templates for various marketing campaigns and client requirements',
        'Advanced jQuery implementation and ensured comprehensive cross-browser compatibility across all supported platforms',
      ],
    },
    {
      title: 'Full-Stack Developer',
      company: 'Walla! – Major Israeli Web Portal',
      period: '12/2007 – 02/2010',
      achievements: [
        'Developed cross-browser dynamic UI components for major portal redesign, focusing on performance and user experience optimization',
        'Utilized internal scripting language (TScript), PHP, and MySQL for full-stack development of portal features and functionality',
        'Optimized database performance through strategic indexing and query refinement, improving page load times and user experience',
      ],
    },
  ],
};

const generateYahooStaticPDF = () => {
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
  const addText = (text, fontSize = 10, isBold = false, indent = 0) => {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    pdf.setTextColor(0, 0, 0);

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

  // Section headers with clear formatting
  const addSection = (title) => {
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
    title: 'Yonatan Ayalon - Senior Frontend Engineer Resume - Yahoo Position',
    subject:
      'Frontend Engineer Resume - React, Next.js, TypeScript, A/B Testing, Performance Optimization',
    author: 'Yonatan Ayalon',
    keywords:
      'Yahoo, Frontend Engineer, React, Next.js, TypeScript, JavaScript, A/B Testing, Performance Optimization, Web Development, UI/UX, Responsive Design, Testing, AWS, Node.js, Design Systems, Accessibility, Cross-browser Compatibility',
    creator: 'Yonatan Ayalon - Yahoo Frontend Engineer Application',
  });

  // Header - Name and Title
  addText(yahooResumeData.personalInfo.name, 16, true);
  addText(yahooResumeData.personalInfo.title, 12, false);
  yPosition += sectionSpacing;

  // Contact Information
  const contactInfo = [
    yahooResumeData.personalInfo.email,
    yahooResumeData.personalInfo.location,
    yahooResumeData.personalInfo.linkedin,
    yahooResumeData.personalInfo.github,
  ].join(' | ');

  addText(contactInfo, 10, false);
  yPosition += sectionSpacing * 2;

  // PROFESSIONAL SUMMARY - Yahoo-focused
  addSection('PROFESSIONAL SUMMARY');
  yahooResumeData.professionalSummary.forEach((paragraph, index) => {
    const cleanText = paragraph.replace(/<[^>]*>/g, '');
    addText(cleanText, 10);
    if (index < yahooResumeData.professionalSummary.length - 1) {
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
    if (yahooResumeData.skills[category]) {
      addText(category + ':', 10, true);
      const skillsText = yahooResumeData.skills[category].join(' • ');
      addText(skillsText, 10, false, 5);
      yPosition += sectionSpacing * 0.8;
    }
  });

  // CORE COMPETENCIES
  addSection('CORE COMPETENCIES');
  const qualitiesText = yahooResumeData.personalQualities.join(' • ');
  addText(qualitiesText, 10);

  yPosition += sectionSpacing * 2;

  // PROFESSIONAL EXPERIENCE - Emphasized relevant experience
  addSection('PROFESSIONAL EXPERIENCE');

  yahooResumeData.experience.forEach((exp, index) => {
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

  return pdf;
};

// Generate PDF
const generateYahooPDF = () => {
  try {
    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate PDF
    console.log('🚀 Generating Yahoo-optimized PDF...');
    const pdf = generateYahooStaticPDF();
    const buffer = Buffer.from(pdf.output('arraybuffer'));
    const fileName = 'yonatan-ayalon-resume-yahoo-frontend-engineer.pdf';
    fs.writeFileSync(path.join(publicDir, fileName), buffer);
    console.log(`✅ Yahoo-optimized PDF generated: /public/${fileName}`);

    console.log('\n🎉 Yahoo Resume PDF generated successfully!');
    console.log('🎯 Yahoo-Specific Optimizations:');
    console.log(
      '   • Reorganized skills to highlight Yahoo-relevant technologies first'
    );
    console.log(
      '   • Enhanced professional summary with Yahoo requirements alignment'
    );
    console.log(
      '   • Emphasized A/B testing, performance optimization, and scalable architecture'
    );
    console.log(
      '   • Highlighted collaboration experience with product and design teams'
    );
    console.log('   • Added specific Yahoo requirements alignment section');
    console.log(
      '\n📄 Perfect for Yahoo Frontend Engineer position application'
    );
  } catch (error) {
    console.error('❌ Error generating Yahoo PDF:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  generateYahooPDF();
}

module.exports = { generateYahooStaticPDF, generateYahooPDF, yahooResumeData };
