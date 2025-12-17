import React, { useState } from 'react';
import { ResumeData } from '../types';
import { optimizeResumeText } from '../services/geminiService';

interface ResumeOptimizerProps {
  data: ResumeData;
}

const ResumeOptimizer: React.FC<ResumeOptimizerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'view' | 'optimize'>('view');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState(
    `${data.summary}\n\nEXPERIENCE\n${data.experience.map(e => `${e.role} at ${e.company} (${e.duration})\n${e.points.join('\n')}`).join('\n\n')}`
  );

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const resultJson = await optimizeResumeText(resumeText);
      const cleanJson = resultJson.replace(/```json/g, '').replace(/```/g, '').trim();
      setAnalysisResult(JSON.parse(cleanJson));
    } catch (error) {
      alert("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-void-900 rounded-2xl border border-void-700 shadow-2xl overflow-hidden font-sans">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-void-800 bg-void-950 px-6 h-14">
        <div className="flex gap-2 opacity-50">
            <div className="w-3 h-3 rounded-full bg-void-700"></div>
            <div className="w-3 h-3 rounded-full bg-void-700"></div>
            <div className="w-3 h-3 rounded-full bg-void-700"></div>
        </div>
        <div className="flex space-x-8">
             <button
                onClick={() => setActiveTab('view')}
                className={`py-4 text-xs font-mono uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'view' ? 'border-brand-blue text-white' : 'border-transparent text-nebula-500 hover:text-nebula-300'}`}
            >
                Preview
            </button>
            <button
                onClick={() => setActiveTab('optimize')}
                className={`py-4 text-xs font-mono uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'optimize' ? 'border-brand-blue text-white' : 'border-transparent text-nebula-500 hover:text-nebula-300'}`}
            >
                AI Optimization
            </button>
        </div>
        <div className="w-16"></div>
      </div>

      <div className="p-8 min-h-[600px] bg-void-900 relative">
        {activeTab === 'view' ? (
          <div className="space-y-10 animate-fade-in max-w-4xl mx-auto bg-white text-slate-800 p-12 shadow-xl rounded-sm">
            {/* Header / Summary */}
            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Professional Profile</h3>
              <p className="text-slate-700 leading-relaxed text-lg font-serif">{data.summary}</p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Work Experience</h3>
              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="mb-3">
                        <h4 className="text-xl font-bold text-slate-900 font-serif">{exp.role}</h4>
                        <div className="flex justify-between text-sm mt-1 text-slate-500 font-medium font-sans">
                            <span>{exp.company}</span>
                            <span>{exp.duration}</span>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {exp.points.map((pt, i) => (
                          <li key={i} className="flex items-start text-slate-600 text-sm">
                            <span className="mr-2 text-slate-400">•</span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
             <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 border border-slate-100">
                    <h4 className="font-bold text-slate-900 font-serif">{edu.institution}</h4>
                    <p className="text-slate-600 text-sm">{edu.degree}</p>
                    <p className="text-slate-400 text-xs mt-1 font-mono uppercase">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full space-y-8 max-w-4xl mx-auto">
            <div className="bg-void-950 border border-void-800 p-6 flex items-start gap-5 rounded-xl">
                <div className="mt-1">
                    <i className="fas fa-robot text-brand-green"></i>
                </div>
                <div>
                    <h4 className="text-brand-blue font-mono text-sm font-bold mb-2 uppercase tracking-wide">Optimization Engine Ready</h4>
                    <p className="text-sm text-nebula-300 leading-relaxed font-light">
                        Paste your resume content below. Our engine will analyze keyword density, impact verbs, and structure to maximize ATS compatibility.
                    </p>
                </div>
            </div>
            
            <div className="relative">
                <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="relative w-full h-80 p-6 bg-void-950 border border-void-800 text-sm text-nebula-100 focus:outline-none focus:border-brand-green transition-colors resize-none font-mono rounded-xl"
                    spellCheck="false"
                />
            </div>
            
            <div className="flex justify-end">
                <button 
                    onClick={handleAnalyze} 
                    disabled={loading}
                    className={`px-8 py-3 bg-brand-green text-white font-bold text-sm uppercase tracking-wide hover:bg-brand-blue transition-all flex items-center gap-3 rounded-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <><i className="fas fa-circle-notch fa-spin"></i> Analyzing</>
                    ) : (
                        <><i className="fas fa-play"></i> Run Analysis</>
                    )}
                </button>
            </div>

            {analysisResult && (
                <div className="bg-void-950 border border-void-800 p-8 space-y-8 animate-fade-in rounded-xl">
                    <div className="flex items-center justify-between pb-6 border-b border-void-800">
                        <h3 className="text-xl font-display text-white">Analysis Report</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-nebula-500 uppercase">Impact Score</span>
                            <div className="relative">
                                <span className={`text-4xl font-display font-bold ${analysisResult.score > 80 ? 'text-brand-blue' : analysisResult.score > 60 ? 'text-brand-yellow' : 'text-brand-orange'}`}>
                                    {analysisResult.score}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 border border-void-800 bg-void-900/80 rounded-lg">
                            <h4 className="font-bold text-brand-blue mb-4 font-mono text-xs uppercase flex items-center gap-2">
                                Strengths
                            </h4>
                            <ul className="space-y-3">
                                {analysisResult.strengths?.map((s: string, i: number) => (
                                    <li key={i} className="text-sm text-nebula-300 flex items-start gap-3">
                                        <span className="text-brand-blue mt-1.5 text-[8px]">●</span>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 border border-brand-orange/20 bg-brand-orange/5 rounded-lg">
                            <h4 className="font-bold text-brand-orange mb-4 font-mono text-xs uppercase flex items-center gap-2">
                                Needs Improvement
                            </h4>
                             <ul className="space-y-3">
                                {analysisResult.weaknesses?.map((w: string, i: number) => (
                                    <li key={i} className="text-sm text-nebula-300 flex items-start gap-3">
                                        <span className="text-brand-orange mt-1.5 text-[8px]">●</span>
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-void-900 p-8 border border-void-800 rounded-lg">
                        <h4 className="font-bold text-white mb-4 font-mono text-xs uppercase">
                            Suggested Improvement
                        </h4>
                        <p className="text-nebula-100 text-sm leading-relaxed pl-4 border-l-2 border-brand-green font-sans italic">
                            "{analysisResult.suggestedRewrite}"
                        </p>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeOptimizer;