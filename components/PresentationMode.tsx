import React, { useState, useEffect } from 'react';
import { UserProfile, Project, Skill, ResumeData, Certification } from '../types';

interface PresentationModeProps {
  profile: UserProfile;
  projects: Project[];
  skills: Skill[];
  resume: ResumeData;
  certifications: Certification[];
  onExit: () => void;
}

const PresentationMode: React.FC<PresentationModeProps> = ({ profile, projects, skills, resume, certifications, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slides mapping exactly to the main page sections
  const slides = [
    // 1. Cover Page (Hero)
    {
      id: 'intro',
      render: () => (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in bg-void-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-cosmic-gradient opacity-50"></div>
          <div className="flex flex-col items-center max-w-5xl mx-auto px-4 relative z-10">
              <h1 className="font-display text-7xl md:text-9xl font-bold text-white tracking-tight mb-6 leading-tight">{profile.name}</h1>
              <h2 className="text-3xl md:text-4xl text-brand-green font-light tracking-wide font-sans">{profile.title}</h2>
          </div>
        </div>
      )
    },
    // 2. About Me
    {
        id: 'about',
        render: () => (
            <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950 text-center relative">
                 <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/5 blur-3xl"></div>
                 <h2 className="font-display text-5xl md:text-6xl text-white mb-12 relative z-10">About</h2>
                 <div className="max-w-5xl mx-auto bg-void-900/80 p-16 border border-void-700 shadow-2xl relative z-10 rounded-2xl backdrop-blur-xl">
                    <p className="text-2xl md:text-3xl text-nebula-100 leading-relaxed font-light font-sans">"{profile.about}"</p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-void-800">
                        {[
                            { title: 'Collaboration', icon: 'fa-users', color: 'text-brand-green' },
                            { title: 'Full-Stack', icon: 'fa-layer-group', color: 'text-brand-orange' },
                            { title: 'AI Integration', icon: 'fa-robot', color: 'text-brand-yellow' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4">
                                <i className={`fas ${item.icon} text-4xl ${item.color} opacity-80`}></i>
                                <h4 className="text-white font-bold text-lg uppercase tracking-widest">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        )
    },
    // 3. Career Objectives
    {
      id: 'objectives',
      render: () => (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-12 bg-void-950 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-green/10 to-transparent"></div>
            <h2 className="font-display text-5xl md:text-6xl text-white relative z-10">Career Objective</h2>
            
            <div className="bg-void-900/90 p-16 max-w-5xl border border-void-700 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative z-10 rounded-2xl">
                <i className="fas fa-rocket text-5xl text-brand-green mb-8 block opacity-100 mx-auto animate-float"></i>
                <p className="text-2xl text-nebula-100 leading-relaxed font-light font-sans">
                    {profile.futureGoals}
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-void-800">
                    {[
                        { title: 'Innovation', icon: 'fa-lightbulb', color: 'text-brand-yellow' },
                        { title: 'Security', icon: 'fa-shield-halved', color: 'text-brand-blue' },
                        { title: 'Efficiency', icon: 'fa-bolt', color: 'text-brand-orange' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-4">
                            <i className={`fas ${item.icon} text-4xl ${item.color} opacity-80`}></i>
                            <h4 className="text-white font-bold text-lg uppercase tracking-widest">{item.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )
    },
    // 4. Skills
    {
        id: 'skills',
        render: () => (
            <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950">
                 <h2 className="font-display text-5xl md:text-6xl text-white mb-16 text-center">
                    Skills
                 </h2>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx} className="bg-void-900 p-6 border border-void-700 hover:border-brand-blue transition-colors rounded-xl">
                            <h3 className="font-display text-xl text-brand-blue mb-6 pb-2 border-b border-void-800 flex items-center gap-3">
                                {skillGroup.category}
                            </h3>
                            <ul className="space-y-3">
                                {skillGroup.items.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-3 text-nebula-100 text-base">
                                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full shadow-[0_0_5px_#10B981]"></span>
                                        <span className="font-mono text-xs uppercase tracking-wider">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                 </div>
            </div>
        )
    },
    // 5. Work Experience
    {
        id: 'experience',
        render: () => (
            <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950 overflow-y-auto py-12">
                <div className="max-w-5xl mx-auto w-full">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-16 text-center">Experience</h2>
                    <div className="space-y-12 border-l border-void-700 ml-4">
                        {resume.experience.map((job, idx) => (
                            <div key={idx} className="relative pl-12">
                                <div className="absolute -left-2 top-3 w-4 h-4 bg-void-950 border-2 border-brand-orange rounded-full shadow-[0_0_10px_#F97316]"></div>
                                <div className="mb-6">
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">{job.role}</h3>
                                    <div className="flex items-center gap-6">
                                        <h4 className="text-lg text-brand-green font-mono">{job.company}</h4>
                                        <span className="text-void-500 text-sm font-mono uppercase tracking-widest">{job.duration}</span>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {job.points.map((pt, i) => (
                                        <li key={i} className="flex items-start gap-4 text-nebula-300 text-base leading-relaxed font-light">
                                            <span className="text-brand-blue mt-2 text-xs">➜</span>
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    // 6. Education
    {
        id: 'education',
        render: () => (
            <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950 text-center">
                 <h2 className="font-display text-5xl md:text-6xl text-white mb-16">Education</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
                    {resume.education.map((edu, idx) => (
                        <div key={idx} className="bg-void-900 p-16 border border-void-700 flex flex-col items-center gap-6 rounded-3xl hover:border-brand-green transition-all">
                            <i className="fas fa-graduation-cap text-5xl text-brand-green mb-4"></i>
                            <h3 className="text-3xl font-display font-bold text-white">{edu.institution}</h3>
                            <p className="text-xl text-nebula-300">{edu.degree}</p>
                            <span className="px-4 py-2 bg-void-950 border border-void-800 font-mono text-brand-blue text-sm rounded-full">{edu.year}</span>
                        </div>
                    ))}
                 </div>
            </div>
        )
    },
    // 7. Projects (Individual Slides)
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      render: () => (
        <div className="flex flex-col h-full px-12 md:px-24 justify-center bg-void-950">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col items-center text-center mb-12">
                   {project.isCapstone ? (
                       <p className="text-void-950 bg-brand-blue px-6 py-2 rounded-full font-bold uppercase tracking-[0.2em] text-sm mb-4 shadow-[0_0_20px_#0EA5E9]">Capstone Project Showcase</p>
                   ) : (
                       <p className="text-brand-green font-mono uppercase tracking-[0.2em] text-sm mb-4">Selected Work</p>
                   )}
                   
                   <h2 className="font-display text-5xl md:text-6xl text-white tracking-tight mb-6">{project.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-12">
                   <div className="flex flex-col space-y-8 items-center">
                      <p className="text-xl md:text-2xl text-nebula-100 leading-relaxed font-light text-center max-w-4xl font-sans">"{project.description}"</p>
                      
                      {project.features && project.features.length > 0 && (
                          <div className="grid grid-cols-2 gap-6 bg-void-900/80 p-8 border border-void-700 w-full max-w-4xl rounded-xl">
                              {project.features.map((f, i) => (
                                  <div key={i} className="flex items-center gap-3 text-base text-nebula-300">
                                      <i className="fas fa-check text-brand-blue"></i>
                                      <span>{f}</span>
                                  </div>
                              ))}
                          </div>
                      )}

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {project.techStack.map(t => (
                               <span key={t} className="px-4 py-2 bg-void-900 text-brand-blue border border-brand-blue/20 text-sm font-mono rounded-full">
                                  {t}
                               </span>
                          ))}
                      </div>

                      {project.videoUrl && (
                          <div className="mt-4 text-center">
                              <p className="text-nebula-500 text-sm mb-2 uppercase tracking-widest">Video Demonstration Available</p>
                              <i className="fas fa-video text-4xl text-brand-orange animate-pulse"></i>
                          </div>
                      )}
                   </div>
                </div>
            </div>
        </div>
      )
    })),
    // 8. Certifications
    {
        id: 'certs',
        render: () => (
            <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950 overflow-y-auto py-12">
                 <div className="max-w-7xl mx-auto w-full">
                    <h2 className="font-display text-5xl md:text-6xl text-white mb-16 text-center">Certifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="flex flex-col p-6 bg-void-900 border border-void-700 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange/50"></div>
                                <div className="flex items-start gap-4">
                                    <i className="fas fa-certificate text-brand-orange text-2xl mt-1"></i>
                                    <div>
                                        <h4 className="text-white font-medium text-base leading-tight mb-2">{cert.name}</h4>
                                        <p className="text-nebula-500 text-sm mb-1">{cert.issuer}</p>
                                        <p className="text-brand-green font-mono text-xs">{cert.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        )
    },
    // 9. Contact Slide
    {
      id: 'contact',
      render: () => (
        <div className="flex flex-col h-full justify-center px-12 md:px-24 bg-void-950 text-center">
            <h2 className="font-display text-5xl md:text-6xl text-white mb-16">Get in touch with me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
                {[
                    { label: 'Email', value: profile.email, icon: 'fa-envelope', color: 'text-brand-orange' },
                    { label: 'Phone', value: profile.phone, icon: 'fa-phone', color: 'text-brand-blue' },
                    { label: 'LinkedIn', value: 'Connect Profile', icon: 'fa-linkedin-in', color: 'text-brand-green' },
                ].map((item, idx) => (
                    <div key={idx} className="bg-void-900 p-12 border border-void-700 flex flex-col items-center gap-6 rounded-3xl">
                        <i className={`fas ${item.icon} text-5xl ${item.color} mb-4`}></i>
                        <h3 className="text-3xl font-display font-bold text-white">{item.label}</h3>
                        <p className="text-xl text-nebula-300 break-all">{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="mt-20 text-center">
                <button onClick={onExit} className="px-12 py-4 border border-white hover:bg-white hover:text-void-950 text-white text-lg uppercase tracking-widest transition-colors rounded-sm">
                    Exit Presentation
                </button>
            </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-void-950 text-white flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="h-1 bg-void-900 w-full">
        <div 
            className="h-full bg-gradient-to-r from-brand-green to-brand-blue"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-hidden relative">
        {slides[currentSlide].render()}
      </div>

      {/* Controls */}
      <div className="h-24 border-t border-void-800 flex items-center justify-between px-12 bg-void-950/80 backdrop-blur-md">
        <span className="text-nebula-500 font-mono text-sm tracking-widest">SLIDE {currentSlide + 1} / {slides.length}</span>
        <div className="flex gap-6">
            <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 flex items-center justify-center bg-void-900 hover:bg-void-800 disabled:opacity-30 transition-all border border-void-700 text-nebula-300 rounded-full"
            >
                <i className="fas fa-arrow-left text-lg"></i>
            </button>
            <button 
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="w-12 h-12 flex items-center justify-center bg-brand-green text-white hover:bg-brand-blue disabled:opacity-30 transition-all rounded-full shadow-lg"
            >
                <i className="fas fa-arrow-right text-lg"></i>
            </button>
        </div>
        <button onClick={onExit} className="text-nebula-500 hover:text-white transition-colors text-sm font-mono tracking-widest flex items-center gap-3 group">
            <span className="w-1.5 h-1.5 bg-brand-orange group-hover:shadow-[0_0_10px_#F97316] transition-all rounded-full"></span> EXIT
        </button>
      </div>
    </div>
  );
};

export default PresentationMode;