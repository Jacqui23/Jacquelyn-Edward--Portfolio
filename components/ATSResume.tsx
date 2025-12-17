import React from 'react';
import { UserProfile, ResumeData, Skill, Project, Certification } from '../types';

interface ATSResumeProps {
  profile: UserProfile;
  resume: ResumeData;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export const ATSResume: React.FC<ATSResumeProps> = ({ profile, resume, skills, projects, certifications }) => {
  
  const SectionHeader = ({ title }: { title: string }) => (
    <div className="border-b border-gray-300 mb-4 mt-6 pb-1">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 font-sans">{title}</h2>
    </div>
  );

  return (
    <div id="ats-resume-container" className="bg-white text-gray-800 font-sans w-full max-w-[850px] mx-auto p-10 leading-normal">
        
        {/* HEADER */}
        <header className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900 uppercase tracking-wide mb-2 text-center">{profile.name}</h1>
            <p className="text-sm text-gray-600 font-medium tracking-wide uppercase mb-3 text-center">{profile.title}</p>
            
            <div className="flex flex-wrap justify-center gap-x-2 text-xs text-gray-600">
                <span>{profile.location}</span>
                <span className="text-gray-300">|</span>
                <a href={`mailto:${profile.email}`} className="text-gray-900 no-underline hover:text-blue-700">{profile.email}</a>
                {profile.phone && (
                    <>
                        <span className="text-gray-300">|</span>
                        <span>{profile.phone}</span>
                    </>
                )}
                <span className="text-gray-300">|</span>
                <a href={`https://${profile.linkedin}`} className="text-gray-900 no-underline hover:text-blue-700">LinkedIn</a>
                {profile.github && (
                    <>
                        <span className="text-gray-300">|</span>
                        <a href={`https://${profile.github}`} className="text-gray-900 no-underline hover:text-blue-700">GitHub</a>
                    </>
                )}
            </div>
        </header>

        {/* SUMMARY */}
        <section className="mb-4">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Professional Profile</h3>
            <p className="text-xs text-justify leading-relaxed text-gray-800">{profile.about}</p>
        </section>

        {/* OBJECTIVE */}
        <section className="mb-6">
            <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">Career Objective</h3>
            <p className="text-xs text-justify leading-relaxed text-gray-800">{profile.futureGoals}</p>
        </section>

        {/* SKILLS */}
        <section className="mb-6 break-inside-avoid">
            <SectionHeader title="Technical Skills" />
            <div className="grid grid-cols-1 gap-2">
                {skills.map((skill, idx) => (
                    <div key={idx} className="flex text-xs">
                        <span className="font-bold text-gray-900 w-32 shrink-0">{skill.category}:</span>
                        <span className="text-gray-700">{skill.items.join(', ')}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-6">
            <SectionHeader title="Professional Experience" />
            <div className="space-y-4">
                {resume.experience.map((job, idx) => (
                    <div key={idx} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-sm font-bold text-gray-900">{job.role}</h3>
                            <span className="text-xs font-bold text-gray-600">{job.duration}</span>
                        </div>
                        <div className="text-xs font-medium text-gray-700 mb-2 italic">
                             {job.company}
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-1">
                            {job.points.map((pt, i) => (
                                <li key={i} className="text-xs text-gray-700 leading-snug pl-1 text-justify">
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-6">
             <SectionHeader title="Selected Projects" />
             <div className="space-y-5">
                 {projects.map((proj, idx) => (
                     <div key={idx} className="break-inside-avoid">
                         <div className="flex justify-between items-baseline mb-1">
                             <div className="flex items-center gap-2">
                                <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                                {proj.isCapstone && <span className="text-[9px] border border-gray-300 px-1 rounded text-gray-500 uppercase tracking-wide">Capstone</span>}
                             </div>
                             <div className="flex gap-3 text-[10px] text-blue-600">
                                 {proj.demoUrl && <a href={proj.demoUrl} className="hover:underline">Live Demo</a>}
                                 {proj.videoUrl && <a href={proj.videoUrl} className="hover:underline">Video</a>}
                                 {proj.repoUrl && <a href={proj.repoUrl} className="hover:underline">Code</a>}
                             </div>
                         </div>
                         
                         <p className="text-xs text-gray-700 leading-relaxed text-justify mb-2">{proj.description}</p>
                         
                         <div className="flex flex-wrap gap-1">
                            <span className="text-[10px] font-bold text-gray-900 mr-1">Tech Stack:</span>
                            {proj.techStack.map((tech, tIdx) => (
                                <span key={tIdx} className="text-[10px] text-gray-600 bg-gray-100 px-1.5 rounded">{tech}</span>
                            ))}
                         </div>
                     </div>
                 ))}
             </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-6 break-inside-avoid">
            <SectionHeader title="Education" />
            <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{edu.institution}</h3>
                            <p className="text-xs text-gray-700">{edu.degree}</p>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{edu.year}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="break-inside-avoid">
            <SectionHeader title="Certifications" />
             <div className="space-y-2">
                {certifications.map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-xs">
                         <div className="flex-1 pr-4">
                             <span className="font-bold text-gray-900 mr-1">{cert.name}</span>
                             <span className="text-gray-500 italic">- {cert.issuer}</span>
                         </div>
                         <span className="text-gray-500 whitespace-nowrap">{cert.date}</span>
                    </div>
                ))}
            </div>
        </section>
    </div>
  );
};