import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const optimizeResumeText = async (currentResume: string, jobDescription?: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Act as a senior technical recruiter and ATS optimization expert.
      Analyze the following resume content and provide specific, actionable improvements.
      Focus on impact, active verbs, and keywords relevant to AI/ML and Full Stack Engineering.
      
      Resume Content:
      "${currentResume}"

      ${jobDescription ? `Target Job Description: "${jobDescription}"` : ''}

      Output ONLY a JSON object with this structure:
      {
        "score": number (0-100),
        "strengths": string[],
        "weaknesses": string[],
        "suggestedRewrite": string (Markdown format of a clearer summary or experience point)
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw error;
  }
};

export const generateBio = async (skills: string[], background: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Write a compelling, professional LinkedIn bio (max 150 words) for a software engineer.
      
      Skills: ${skills.join(', ')}
      Background: ${background}

      Tone: Professional, innovative, and eager.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating bio:", error);
    throw error;
  }
};

export const generateInterviewQuestion = async (projectTitle: string, techStack: string[]): Promise<string> => {
    try {
        const ai = getAiClient();
        const prompt = `
          Generate a tough but fair technical interview question related to a project titled "${projectTitle}" 
          which uses the following stack: ${techStack.join(', ')}. 
          Also provide a brief "Interviewer's Note" on what to look for in the answer.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
    
        return response.text || "";
      } catch (error) {
        console.error("Error generating question:", error);
        throw error;
      }
}

export const generateJobApplicationStrategy = async (targetRole: string, skills: string[]): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Act as a Career Coach for a Software Engineer transitioning into AI/ML.
      Create a targeted Job Application Strategy for the role of: "${targetRole}".
      Candidate Skills: ${skills.join(', ')}.

      Output a structured Markdown plan including:
      1. **Strategic Positioning**: How to frame this background.
      2. **Target Industries**: 3 specific industries that need these skills.
      3. **Networking Strategy**: A template message for reaching out to hiring managers.
      4. **Interview Prep Focus**: 3 key technical topics to master for this specific role.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
}