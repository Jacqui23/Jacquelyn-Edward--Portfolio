import React, { useState } from 'react';
import { UserProfile, Project, Skill, ResumeData, AppMode, Certification } from './types';
import PresentationMode from './components/PresentationMode';
import ResumeOptimizer from './components/ResumeOptimizer';
import { ATSResume } from './components/ATSResume';
import ParticleBackground from './components/ParticleBackground';

// Declare html2pdf for TypeScript
declare var html2pdf: any;

// --- MOCK DATA ---
const initialProfile: UserProfile = {
  name: "Jacquelyn Edward",
  title: "Digital Associate | Software Engineer",
  bio: "Software engineering graduate with a passion for integrating AI into robust software solutions. Expert in full-stack mobile development (React Native, Kotlin) and Cloud infrastructure (Oracle), now focused on building intelligent, data-driven applications.",
  email: "Jacquelynedward98@gmail.com",
  phone: "076 558 4345",
  linkedin: "www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3B2DxTtZsNRx%2Bji5wzWiLg4w%3D%3D",
  github: "github.com/dashboard",
  location: "Johannesburg, Gauteng",
  about: "I thrive in collaborative environments, leveraging my technical expertise to contribute effectively to team success. I possess a strong foundation in software engineering, databases, and API design. My journey from building robust applications and data solutions has equipped me with a versatile skillset ready for the next generation of intelligent software.",
  futureGoals: "To leverage my technical expertise in software engineering, databases, and API design to architect scalable, intelligent systems. My goal is to bridge the gap between robust data solutions and cutting-edge Artificial Intelligence, creating innovative applications that solve complex real-world challenges and drive digital transformation."
};

const initialProjects: Project[] = [
  {
    id: "6",
    title: "MindVerse",
    description: "An innovative web application that leverages generative AI to create compelling and creative content. MindVerse allows users to generate text, brainstorm ideas, and unlock new possibilities with the power of AI.",
    techStack: ["React", "Next.js", "Tailwind CSS", "Generative AI", "Vercel"],
    imageUrl: "https://picsum.photos/800/600?random=6",
    demoUrl: "https://mindverse-sandy.vercel.app/",
    repoUrl: "https://github.com/Jacqui23/Mindverse",
    features: ["Specialized Content Generation", "High-Quality Output Logic", "Responsive Interface", "User-Centric Design"]
  },
  {
    id: "5",
    title: "S.P.A.R.K- Smart Personal AI Resume Kit",
    description: "An AI-powered resume building toolkit designed to help professionals craft the perfect resume. S.P.A.R.K provides intelligent suggestions, template customization, and keyword optimization to make your profile stand out.",
    techStack: ["React", "TypeScript", "AI/NLP", "Tailwind CSS", "UI/UX Design"],
    imageUrl: "https://picsum.photos/800/600?random=5",
    demoUrl: "https://s-p-a-r-k-do7p.vercel.app/",
    repoUrl: "https://github.com/Jacqui23/S.P.A.R.K",
    features: ["Automated Deployment Pipelines", "Production Environment Configuration", "Scalable Web Architecture", "Continuous Integration"]
  },
  {
    id: "7",
    title: "AURA (Artificial Understanding and Response Assistant)",
    description: "A collaborative project developed using AWS PartyRock, leveraging generative AI for intelligent understanding and response generation.",
    techStack: ["AWS PartyRock", "Generative AI"],
    imageUrl: "https://picsum.photos/800/600?random=7",
    demoUrl: "https://partyrock.aws/u/KishanGosai007/HbgywbRUF/AURA-(Artificial-Understanding-and-Response-Assistant",
    repoUrl: "",
    features: ["Natural Language Processing", "Contextual Awareness", "No-Code AI Development", "LLM Orchestration"]
  },
  {
    id: "8",
    title: "DeepSeeker Figma Prototype",
    description: "A collaborative Figma prototype showcasing UI/UX design and interactive flows for the DeepSeeker application.",
    techStack: ["Figma", "UI/UX Design", "Prototyping", "Collaboration"],
    imageUrl: "https://picsum.photos/800/600?random=8",
    demoUrl: "https://www.figma.com/design/4liiOiq63cAI9lr4SFnZ52/DeepSeeker-Prototype?node-id=0-1&p=f&t=aqjNFjTHW7cwDlHd-0",
    repoUrl: "",
    features: ["Interactive Prototyping", "User Experience Design", "Visual Interface Design", "Wireframing"]
  },
  {
    id: "4",
    title: "SyncNet",
    description: "SyncNet is an interactive dashboard that helps users analyze the emotional tone in text data such as customer reviews or social media posts using Gemini.",
    techStack: ["Next.js", "TypeScript", "Gemini API", "Tailwind CSS", "Vercel"],
    imageUrl: "https://picsum.photos/800/600?random=4",
    demoUrl: "https://analysis-dashboard-lilac.vercel.app/",
    repoUrl: "https://github.com/Jacqui23/Analysis-dashboard",
    features: ["Interactive Data Visualization", "Real-time Filtering", "Responsive Layout", "Performance Metrics Tracking"]
  },
  {
    id: "9",
    title: "Bias Audit Analysis",
    description: "An analysis of bias in a machine learning dataset or model, identifying ethical concerns and proposing concrete mitigation strategies.",
    techStack: ["Python", "Pandas", "Responsible AI", "Data Analysis", "Matplotlib", "Jupyter Notebook"],
    imageUrl: "https://picsum.photos/800/600?random=9",
    demoUrl: "",
    repoUrl: "https://github.com/Jacqui23/Bias-Audit-Report",
    features: ["Algorithmic Bias Detection", "Ethical AI Assessment", "Data Distribution Analysis", "Mitigation Strategy Proposal"]
  },
  {
    id: "10",
    title: "MzansiFix",
    description: "A service connection platform helping users find reliable local repair and maintenance professionals in South Africa.",
    techStack: ["React", "Tailwind CSS", "Firebase", "Mapping API", "Vercel"],
    imageUrl: "https://picsum.photos/800/600?random=10",
    demoUrl: "https://mzansifix.vercel.app/",
    repoUrl: "https://github.com/Jacqui23/MzansiFix",
    features: ["Service Search", "Provider Profiles", "Responsive Design", "Local Directory"]
  }
];

const initialSkills: Skill[] = [
  { 
    category: "AI & Data Science", 
    items: ["Generative AI", "Prompt Engineering", "Responsible AI", "Python for Data Science", "LLMs", "Data Analysis"] 
  },
  { 
    category: "Full Stack & Core", 
    items: ["React Native", "Kotlin", "Java", "C#", "C++", "React", "Node.js", "PHP", "HTML/CSS", "JavaScript"] 
  },
  { 
    category: "Cloud & Infrastructure", 
    items: ["Oracle Cloud", "SQL", "MySQL", "Firebase", "API Design", "Git Version Control", "CI/CD"] 
  },
  { 
    category: "Professional & Soft Skills", 
    items: ["Leadership", "Teamwork", "Effective Communication", "Time Management", "Problem Solving", "Adaptability", "Strategic Planning"] 
  }
];

const initialCertifications: Certification[] = [
  { 
    name: "Trustworthy AI: Managing Bias, Ethics, and Accountability", 
    issuer: "Coursera", 
    date: "Nov 2025", 
    url: "https://coursera.org/share/421cd3417fbe10497b14b96b22f45516",
    skills: [
        "Artificial Intelligence and Machine Learning (AI/ML)",
        "Algorithms",
        "Legal Risk",
        "Data Ethics",
        "Case Studies",
        "Analysis",
        "Workforce Management",
        "Business Ethics",
        "Risk Mitigation",
        "Risk Analysis",
        "Information Privacy",
        "Law, Regulation, and Compliance"
    ]
  },
  { 
    name: "Generative AI with Large Language Models", 
    issuer: "Coursera", 
    date: "Nov 2025", 
    url: "https://coursera.org/share/f7cfd33f2b33e96b8da0197e12441afd",
    skills: [
        "Prompt Engineering",
        "PyTorch (Machine Learning Library)",
        "Responsible AI",
        "Natural Language Processing",
        "Performance Tuning",
        "Generative AI",
        "Applied Machine Learning",
        "Machine Learning",
        "Large Language Modeling",
        "Scalability",
        "Python Programming",
        "Reinforcement Learning"
    ]
  },
  { 
    name: "Building AI Powered Chatbots Without Programming", 
    issuer: "Coursera", 
    date: "Nov 2025", 
    url: "https://coursera.org/share/83bb6e7430736e844f98066515e8b290",
    skills: [
        "Generative AI",
        "No-Code Development",
        "WordPress",
        "IBM Cloud",
        "Customer experience improvement",
        "Customer Service",
        "Workflow Management",
        "Operational Efficiency",
        "ChatGPT",
        "Artificial Intelligence",
        "Personalized Service",
        "Decision Support Systems"
    ]
  },
  { 
    name: "Artificial Intelligence (AI) Bootcamp", 
    issuer: "Coursera", 
    date: "Nov 2025", 
    level: "Credential ID: Oipz-P6nRLqqc_j-pzS6Eg", 
    url: "https://www.coursera.org/account/accomplishments/verify/Oipz-P6nRLqqc_j-pzS6Eg"
  },
  { 
    name: "Artificial Intelligence Essentials V2", 
    issuer: "IBM", 
    date: "Nov 2025", 
    url: "https://www.credly.com/badges/d10e87f0-6740-445b-baae-45d6bb7cc0d2",
    skills: [
        "AI for Business",
        "Artificial Intelligence",
        "Careers in AI",
        "Ethics for AI",
        "Generative AI"
    ]
  },
  { 
    name: "Python for Data Science and AI", 
    issuer: "IBM", 
    date: "Nov 2025", 
    url: "https://www.credly.com/badges/680c5c42-0b8e-42e7-bb18-0ffea78189fb",
    skills: [
        "Bokeh",
        "Matplotlib",
        "Python"
    ]
  },
  { 
    name: "Chatbot Building Essentials with IBM watsonx Assistant (V2)", 
    issuer: "IBM", 
    date: "Nov 2025", 
    url: "https://www.credly.com/badges/cb6b14a3-9673-4f27-9dcb-82cd97eab749/print",
    skills: [
        "Artificial Intelligence (AI)",
        "Chatbot",
        "Conversational Agent",
        "Customer Service",
        "Generative AI",
        "IBM watsonx Assistant",
        "Natural Language Processing"
    ]
  },
  { 
    name: "Generative AI for Everyone", 
    issuer: "DeepLearning.AI", 
    date: "Nov 2025", 
    level: "Credential ID: HBRG8IYGZ6PU", 
    url: "https://www.coursera.org/account/accomplishments/verify/HBRG8IYGZ6PU",
    skills: [
        "Prompt Engineering",
        "Social Impact",
        "Responsible AI",
        "Automation",
        "Generative AI",
        "Cloud Applications",
        "AI Product Strategy",
        "ChatGPT",
        "Large Language Modeling",
        "Artificial Intelligence",
        "AI Security"
    ]
  },
  { 
    name: "Introduction to Responsible AI", 
    issuer: "Google Cloud", 
    date: "Nov 2025", 
    level: "Credential ID: RZ1YDBIGTUWD", 
    url: "https://www.coursera.org/account/accomplishments/verify/RZ1YDBIGTUWD",
    skills: [
        "Artificial Intelligence",
        "Responsible AI",
        "Organizational Structure",
        "AI Product Strategy"
    ]
  },
  { 
    name: "Python for Data Science, AI & Development", 
    issuer: "IBM", 
    date: "Nov 2025", 
    level: "Credential ID: LZ20OKLAMV4P", 
    url: "https://www.coursera.org/account/accomplishments/verify/LZ20OKLAMV4P",
    skills: [
        "Web Scraping",
        "Data Analysis",
        "Computer Programming",
        "Data Manipulation",
        "Data Processing",
        "Programming Principles",
        "Numpy",
        "Data Import/Export",
        "Scripting",
        "Automation",
        "Jupyter",
        "Pandas (Python Package)"
    ]
  },
  { 
    name: "AI Essentials", 
    issuer: "Intel", 
    date: "Oct 2025", 
    level: "Credential ID: AS4K42X06O7L", 
    url: "https://coursera.org/share/0130b9e58f759413c2cfd74e23dccd2f",
    skills: [
        "Business Research",
        "Machine Learning",
        "B2B Sales",
        "AI Product Strategy",
        "Artificial Intelligence",
        "Responsible AI",
        "Generative AI"
    ]
  },
  { 
    name: "AI For Everyone", 
    issuer: "DeepLearning.AI", 
    date: "Oct 2025", 
    level: "Credential ID: LIPVMAP2MD4R", 
    url: "https://www.coursera.org/account/accomplishments/verify/LIPVMAP2MD4R",
    skills: [
        "Data Ethics", 
        "Strategic Thinking", 
        "Artificial Intelligence", 
        "Artificial Neural Networks", 
        "Machine Learning", 
        "Deep Learning", 
        "Responsible AI", 
        "Data Science", 
        "AI Product Strategy"
    ]
  },
  { 
    name: "AI Foundations: Prompt Engineering with ChatGPT", 
    issuer: "Arizona State University", 
    date: "Oct 2025", 
    level: "Credential ID: SZZQQLA76VE3", 
    url: "https://www.coursera.org/account/accomplishments/verify/SZZQQLA76VE3",
    skills: [
        "LLM Application",
        "Prompt Engineering",
        "Prompt Patterns",
        "Large Language Modeling",
        "ChatGPT",
        "Responsible AI",
        "Prompt Engineering with ChatGPT"
    ]
  },
  { 
    name: "Introduction to Artificial Intelligence (AI)", 
    issuer: "IBM", 
    date: "Oct 2025", 
    level: "Credential ID: TLAI0BNXGTWI", 
    url: "https://www.coursera.org/account/accomplishments/verify/TLAI0BNXGTWI",
    skills: [
        "Artificial Intelligence (AI)",
        "Data Science",
        "Machine Learning",
        "Deep Learning",
        "Artificial Neural Networks",
        "Natural Language Processing",
        "Ethics"
    ]
  },
  { 
    name: "Introduction to Generative AI", 
    issuer: "Google Cloud", 
    date: "Oct 2025", 
    level: "Credential ID: V9U4WLVVTNNN", 
    url: "https://www.coursera.org/account/accomplishments/verify/V9U4WLVVTNNN",
    skills: [
        "Google Cloud Platform",
        "Artificial Intelligence",
        "Generative AI",
        "Deep Learning",
        "Machine Learning Methods",
        "Natural Language Processing"
    ]
  }
];

const initialResume: ResumeData = {
  summary: "Software engineering graduate with a passion for integrating AI into robust software solutions. Expert in full-stack mobile development (React Native, Kotlin) and Cloud infrastructure (Oracle), now focused on building intelligent, data-driven applications.",
  experience: [
    {
      role: "Digital Associate",
      company: "Capaciti",
      duration: "October 2025 - Present",
      points: [
        "Engaged in an intensive, project-based program focused on full-stack development, cloud technologies, and AI integration.",
        "Collaborated in agile teams to design, develop, and deploy web applications, contributing to both front-end and back-end components.",
        "Applied UX/UI principles to create intuitive user interfaces and leveraged generative AI APIs for innovative features.",
        "Gained practical experience in modern software development workflows, including version control with Git, CI/CD, and cloud deployment."
      ]
    }
  ],
  education: [
    {
      degree: "Bsc IT: Software Engineering",
      institution: "Eduvos",
      year: "2020 - 2022"
    },
    {
      degree: "Higher Certificate in Information Systems",
      institution: "Pearson Institute",
      year: "2018 - 2019"
    }
  ]
};

// --- COMPONENTS ---

const GlowingSeparator = () => (
    <div className="w-full flex items-center justify-center py-12 relative z-10 select-none pointer-events-none opacity-50">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent w-full max-w-lg"></div>
            <div className="absolute w-2 h-2 bg-brand-orange rounded-full shadow-[0_0_10px_#F97316]"></div>
        </div>
    </div>
);

const Navigation = ({ scrollToSection, onEnterPresentation, isDownloading, setIsDownloading }: { scrollToSection: (id: string) => void, onEnterPresentation: () => void, isDownloading: boolean, setIsDownloading: (loading: boolean) => void }) => {
    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'objectives', label: 'Career Objective' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'certs', label: 'Certifications' },
        { id: 'contact', label: 'Contact' },
    ];

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            const element = document.getElementById('ats-resume-container');
            if (!element) {
                setIsDownloading(false);
                return;
            }

            const opt = {
                margin:       0,
                filename:     'Jacquelyn_Edward_Portfolio.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            if (typeof html2pdf !== 'undefined') {
                html2pdf().set(opt).from(element).save()
                .then(() => setIsDownloading(false))
                .catch((err: any) => {
                    console.error(err);
                    setIsDownloading(false);
                });
            } else {
                window.print();
                setIsDownloading(false);
            }
        }, 100);
    };

    return (
        <nav className="fixed top-0 inset-x-0 z-50 bg-void-950/70 backdrop-blur-lg border-b border-void-800 h-16 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full gap-8">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center select-none cursor-pointer group" onClick={() => scrollToSection('hero')}>
                         <div className="w-10 h-10 border border-void-700 group-hover:border-brand-blue/50 flex items-center justify-center bg-void-900 rounded-lg transition-all duration-300 shadow-lg shadow-void-950 overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-green to-brand-orange opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-blue to-brand-green text-lg z-10">JE</span>
                        </div>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex-1 hidden md:flex items-center justify-center">
                        <div className="flex space-x-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest transition-all rounded-full hover:bg-void-800 hover:text-white text-nebula-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                         <button 
                            type="button"
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="w-9 h-9 flex items-center justify-center text-nebula-300 hover:text-brand-orange transition-colors border border-void-700 hover:border-brand-orange/50 bg-void-900 rounded-lg hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                            title="Download Resume"
                        >
                            <i className={`fas ${isDownloading ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                        </button>

                        <button 
                            onClick={onEnterPresentation}
                            className="w-9 h-9 flex items-center justify-center text-nebula-300 hover:text-brand-blue transition-colors border border-void-700 hover:border-brand-blue/50 bg-void-900 rounded-lg hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                            title="Presentation Mode"
                        >
                            <i className="fas fa-desktop"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ profile }: { profile: UserProfile }) => (
  <section id="hero" className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center justify-center bg-void-950">
    <div className="absolute inset-0 bg-cosmic-gradient opacity-90"></div>
    
    {/* Animated Background Blobs to Add "More Color" */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] mix-blend-screen animate-float" style={{animationDelay: '2s'}}></div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 max-w-5xl mx-auto">
             
             {/* Tri-Color Gradient Title */}
             <h1 className="font-display text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange animate-slide-up leading-[1.1] drop-shadow-2xl">
                {profile.name}
             </h1>
             
             {/* Decorative Divider with Tri-Colors */}
             <div className="flex justify-center items-center gap-4 animate-fade-in opacity-80 py-4" style={{animationDelay: '0.3s'}}>
                 <div className="h-px w-16 md:w-32 bg-gradient-to-l from-brand-blue to-transparent"></div>
                 <div className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_10px_#10B981] animate-pulse"></div>
                 <div className="h-px w-16 md:w-32 bg-gradient-to-r from-brand-orange to-transparent"></div>
             </div>

             {/* Vibrant Subtitle */}
             <h2 className="text-2xl md:text-4xl text-white font-light tracking-wide animate-slide-up font-sans" style={{animationDelay: '0.2s'}}>
                <span className="text-brand-blue font-semibold drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">Digital Associate</span> 
                <span className="mx-3 text-void-700">|</span> 
                <span className="text-brand-green font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">Software Engineer</span>
             </h2>

        </div>
    </div>
  </section>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-20 text-center relative z-10">
        <h2 className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-green to-brand-orange mb-4 tracking-tight drop-shadow-md">{title}</h2>
        <div className="w-24 h-1.5 bg-void-800/50 border border-void-700 mx-auto rounded-full mb-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-brand-green to-brand-blue opacity-30"></div>
        </div>
        {subtitle && <p className="text-nebula-300 font-light max-w-2xl mx-auto">{subtitle}</p>}
    </div>
);

const AboutSection = ({ profile }: { profile: UserProfile }) => (
    <section id="about" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading title="About Me" />
            
            <div className="bg-void-900/90 backdrop-blur-md border border-void-700 p-12 shadow-2xl rounded-3xl text-center relative hover:bg-void-900 transition-colors duration-300">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-void-950 border-4 border-void-800 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                     <i className="fas fa-user-astronaut text-3xl text-brand-blue"></i>
                 </div>

                <p className="text-xl md:text-2xl text-nebula-100 leading-relaxed font-light mt-6">
                    "{profile.about}"
                </p>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-void-800">
                    {[
                        { title: 'Collaboration', icon: 'fa-users', color: 'text-brand-green' },
                        { title: 'Full-Stack', icon: 'fa-layer-group', color: 'text-brand-orange' },
                        { title: 'AI Integration', icon: 'fa-robot', color: 'text-brand-yellow' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3">
                            <i className={`fas ${item.icon} text-2xl ${item.color} opacity-80`}></i>
                            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const SkillsSection = ({ skills }: { skills: Skill[] }) => (
    <section id="skills" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Skills" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skills.map((skillGroup, idx) => (
                    <div key={idx} className="bg-void-900/90 backdrop-blur-md p-8 border border-void-700 hover:border-brand-blue/50 transition-all duration-300 group rounded-2xl hover:bg-void-900 hover:-translate-y-1">
                        <h3 className="font-display text-lg font-bold text-white pb-4 mb-4 border-b border-void-700 flex items-center gap-2 group-hover:text-brand-blue transition-colors">
                            {skillGroup.category}
                        </h3>
                        <ul className="space-y-3">
                            {skillGroup.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-nebula-300 font-mono text-xs uppercase tracking-wide">
                                    <span className="w-1.5 h-1.5 bg-brand-green group-hover:bg-brand-blue rounded-full transition-colors"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ExperienceSection = ({ experience }: { experience: ResumeData['experience'] }) => (
    <section id="experience" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
             <SectionHeading title="Experience" />
            
            <div className="space-y-12 relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-void-700"></div>

                {experience.map((job, idx) => (
                    <div key={idx} className="relative pl-12">
                        
                        {/* Dot */}
                        <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-void-950 border-2 border-brand-orange z-10 -translate-x-1/2 shadow-[0_0_10px_#F97316]"></div>

                        <div className="bg-void-900/90 backdrop-blur-md border border-void-700 p-8 rounded-2xl hover:border-brand-orange/40 transition-all duration-300 group shadow-lg hover:bg-void-900">
                            <div className="flex flex-col gap-1 mb-4">
                                <h3 className="text-2xl font-display font-bold text-white group-hover:text-brand-orange transition-colors">{job.role}</h3>
                                <h4 className="text-lg text-brand-green font-medium">{job.company}</h4>
                                <span className="text-nebula-500 font-mono text-xs uppercase tracking-widest mt-1">{job.duration}</span>
                            </div>
                            
                            <div className="text-nebula-300 leading-relaxed space-y-3">
                                {job.points.map((point, i) => (
                                    <p key={i} className="flex gap-3 text-sm">
                                        <span className="text-brand-orange mt-1.5 text-[10px]">➜</span>
                                        {point}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const EducationSection = ({ education }: { education: ResumeData['education'] }) => (
    <section id="education" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <SectionHeading title="Education" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {education.map((edu, idx) => (
                    <div key={idx} className="bg-void-900/90 backdrop-blur-md p-10 border border-void-700 flex items-start gap-8 hover:border-brand-green transition-all duration-300 rounded-3xl group hover:bg-void-900">
                         <div className="w-16 h-16 rounded-2xl bg-void-950 flex items-center justify-center border border-void-700 group-hover:border-brand-green/50 group-hover:scale-110 transition-all">
                             <i className="fas fa-graduation-cap text-2xl text-brand-green"></i>
                         </div>
                         <div className="flex-1">
                            <h3 className="text-2xl font-display font-bold text-white mb-2">{edu.institution}</h3>
                            <p className="text-nebula-300 text-lg mb-4">{edu.degree}</p>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-xs font-mono font-bold">{edu.year}</span>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-void-900/90 backdrop-blur-md border border-void-700 hover:bg-void-900 transition-all duration-500 flex flex-col h-full rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:-translate-y-2 relative hover:border-brand-blue/60">
    
    {/* Top gradient accent */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-void-900 via-void-700 to-void-900 group-hover:via-brand-blue transition-all duration-500"></div>

    <div className="p-8 flex flex-col flex-grow relative z-10">
      <div className="flex justify-between items-start mb-6 gap-4">
        <h3 className="font-display text-2xl font-bold text-white group-hover:text-brand-blue transition-colors">{project.title}</h3>
        {project.isCapstone && (
             <span className="text-[10px] font-bold uppercase tracking-widest text-void-950 bg-brand-blue px-3 py-1 rounded-full shadow-[0_0_10px_#0EA5E9]">
                Capstone
            </span>
        )}
      </div>

      <p className="text-nebula-300 text-sm leading-relaxed mb-8 flex-grow">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.slice(0, 5).map(tech => (
              <span key={tech} className="px-3 py-1 text-[10px] font-mono text-brand-blue/80 bg-brand-blue/5 border border-brand-blue/10 rounded-full">
                  {tech}
              </span>
          ))}
      </div>

      <div className="flex items-center pt-6 border-t border-void-700 mt-auto gap-4">
          {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-nebula-500 hover:text-white transition-colors flex items-center gap-2">
                <i className="fab fa-github text-lg"></i> Code
              </a>
          )}
          {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="ml-auto px-5 py-2 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-void-950 border border-brand-blue/50 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2">
                Live View <i className="fas fa-external-link-alt"></i>
              </a>
          )}
          {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white border border-brand-orange/50 rounded text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2">
                <i className="fas fa-play"></i> Demo
              </a>
          )}
      </div>
    </div>
  </div>
);

const CertificationsSection = ({ certifications }: { certifications: Certification[] }) => (
    <section id="certs" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Certifications" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, idx) => (
                    <div key={idx} className="p-8 bg-void-900/90 backdrop-blur-md border border-void-700 hover:border-brand-orange/50 transition-colors group flex flex-col h-full rounded-2xl relative overflow-hidden hover:bg-void-900">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-orange/5 rounded-full blur-2xl group-hover:bg-brand-orange/10 transition-all"></div>
                        
                        <div className="flex items-start gap-4 mb-4 relative z-10">
                            <i className="fas fa-certificate text-brand-orange/70 group-hover:text-brand-orange text-xl mt-1 flex-shrink-0 transition-colors"></i>
                            <div className="flex-1">
                                <h4 className="text-white font-medium text-lg leading-tight mb-2 group-hover:text-brand-orange transition-colors">{cert.name}</h4>
                                <div className="text-xs text-nebula-300 font-mono mt-1 flex flex-col gap-1">
                                    <span className="font-bold text-nebula-100">{cert.issuer}</span>
                                    <span className="opacity-60">{cert.date}</span>
                                </div>
                            </div>
                            {cert.url && (
                                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-void-700 hover:text-brand-orange transition-colors">
                                    <i className="fas fa-arrow-up-right-from-square"></i>
                                </a>
                            )}
                        </div>
                        
                        {cert.skills && cert.skills.length > 0 && (
                            <div className="mt-auto pt-4 border-t border-void-800 relative z-10">
                                <div className="flex flex-wrap gap-1.5">
                                    {cert.skills.map((skill, sIdx) => (
                                        <span key={sIdx} className="text-[10px] text-nebula-500 bg-void-950 px-2 py-1 border border-void-800 rounded hover:text-nebula-100 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CareerObjectiveSection = ({ objectives }: { objectives: string }) => (
    <section id="objectives" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading title="Career Objective" />
            
            <div className="bg-void-900/90 backdrop-blur-md border border-void-700 p-12 shadow-2xl rounded-3xl text-center relative hover:bg-void-900 transition-colors duration-300">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-void-950 border-4 border-void-800 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                     <i className="fas fa-rocket text-3xl text-brand-green"></i>
                 </div>

                <p className="text-xl md:text-2xl text-nebula-100 leading-relaxed font-light mt-6">
                    {objectives}
                </p>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-void-800">
                    {[
                        { title: 'Innovation', icon: 'fa-lightbulb', color: 'text-brand-yellow' },
                        { title: 'Security', icon: 'fa-shield-halved', color: 'text-brand-blue' },
                        { title: 'Efficiency', icon: 'fa-bolt', color: 'text-brand-orange' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3">
                            <i className={`fas ${item.icon} text-2xl ${item.color} opacity-80`}></i>
                            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const ContactSection = ({ profile }: { profile: UserProfile }) => (
    <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading title="Get in touch with me" />

            <div className="flex flex-wrap justify-center gap-6">
                {[
                    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'fa-envelope', color: 'text-brand-orange' },
                    { label: 'Phone', value: profile.phone, href: `tel:${profile.phone?.replace(/\s/g, '')}`, icon: 'fa-phone', color: 'text-brand-blue' },
                    { label: 'LinkedIn', value: 'Connect Profile', href: `https://${profile.linkedin}`, icon: 'fa-linkedin-in', color: 'text-brand-green' },
                    { label: 'GitHub', value: 'View Repositories', href: `https://${profile.github}`, icon: 'fa-github', color: 'text-white' },
                    { label: 'Location', value: profile.location, href: null, icon: 'fa-map-pin', color: 'text-brand-yellow' }
                ].map((item, idx) => (
                    <a 
                        key={idx}
                        href={item.href || '#'} 
                        target={item.href && !item.href.startsWith('mail') && !item.href.startsWith('tel') ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`w-full md:w-64 bg-void-900/90 backdrop-blur-md p-8 border border-void-700 hover:border-opacity-100 group transition-all duration-300 rounded-2xl flex flex-col items-center hover:-translate-y-2 hover:bg-void-900 ${!item.href ? 'cursor-default' : ''}`}
                        style={{ borderColor: item.href ? undefined : 'rgba(255,255,255,0.1)' }}
                    >
                        <div className="w-14 h-14 bg-void-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-void-700 group-hover:scale-110 transition-transform shadow-lg">
                            <i className={`fab fas ${item.icon} ${item.color} text-xl`}></i>
                        </div>
                        <h3 className="text-white font-display font-bold text-lg mb-2">{item.label}</h3>
                        <p className="text-nebula-500 text-xs break-all group-hover:text-nebula-100 transition-colors">{item.value}</p>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

// --- MAIN APP ---

export default function App() {
  const [activeSection, setActiveSection] = useState('portfolio');
  const [mode, setMode] = useState<AppMode>(AppMode.VIEW);
  const [isDownloading, setIsDownloading] = useState(false);
  const [profile] = useState<UserProfile>(initialProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [skills] = useState<Skill[]>(initialSkills);
  const [resume] = useState<ResumeData>(initialResume);
  const [certifications] = useState<Certification[]>(initialCertifications);
  
  const scrollToSection = (id: string) => {
      if (mode !== AppMode.VIEW) {
          setMode(AppMode.VIEW);
          setTimeout(() => {
              const element = document.getElementById(id);
              if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
              }
          }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
      }
  };

  if (mode === AppMode.PRESENTATION) {
    return (
      <PresentationMode 
        profile={profile} 
        projects={projects} 
        skills={skills} 
        resume={resume}
        certifications={certifications}
        onExit={() => setMode(AppMode.VIEW)} 
      />
    );
  }

  return (
    <>
      <div id="screen-content" className="relative z-10 min-h-screen bg-void-950 font-sans text-nebula-300 selection:bg-brand-orange/30 selection:text-white">
        <Navigation 
          scrollToSection={scrollToSection}
          onEnterPresentation={() => setMode(AppMode.PRESENTATION)}
          isDownloading={isDownloading}
          setIsDownloading={setIsDownloading}
        />
        
        {/* Animated Particle Background Overlay */}
        <ParticleBackground />

        <main className="relative z-10">
          <div className="space-y-0">
          {/* 1. Cover Page */}
          <Hero profile={profile} />
          
          <GlowingSeparator />

          {/* 2. About Me */}
          <AboutSection profile={profile} />
          
          <GlowingSeparator />

          {/* 3. Career Objectives */}
          <CareerObjectiveSection 
            objectives={profile.futureGoals} 
          />
          
          <GlowingSeparator />

          {/* 4. Skills */}
          <SkillsSection skills={skills} />
          
          <GlowingSeparator />

          {/* 5. Work Experience */}
          <ExperienceSection experience={resume.experience} />
          
          <GlowingSeparator />
          
          {/* 6. Education */}
          <EducationSection education={resume.education} />
          
          <GlowingSeparator />

          {/* 7. Projects (Portfolio) */}
              <div id="projects" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <SectionHeading title="Projects" subtitle="A collection of innovative solutions and creative experiments." />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                      {projects.map((project) => (
                          <div key={project.id} className="h-full">
                              <ProjectCard 
                                  project={project} 
                              />
                          </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <GlowingSeparator />

              {/* 8. Certifications */}
              <CertificationsSection certifications={certifications} />
              
              <GlowingSeparator />

              {/* 9. Contact */}
              <ContactSection profile={profile} />
              
          </div>
        </main>
      </div>

      <div className="fixed top-0 left-0 w-[850px] h-auto min-h-screen z-[0] bg-white p-0 overflow-visible print:block">
        <ATSResume 
            profile={profile} 
            resume={resume} 
            skills={skills} 
            projects={projects} 
            certifications={certifications}
        />
      </div>
    </>
  );
}
