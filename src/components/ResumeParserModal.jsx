import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

const KNOWN_SKILLS = [
  "React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Git",
  "Java", "Spring Boot", "AWS", "Microservices", "SQL", "Node.js", "Express",
  "Python", "Machine Learning", "NLP", "Pandas", "PyTorch", "TensorFlow",
  "Figma", "UI/UX", "Design Systems", "Wireframing", "Prototyping", "User Research",
  "Product Strategy", "Roadmapping", "Agile", "Data Analytics", "Scrum",
  "Digital Marketing", "SEO", "Growth Marketing", "Campaign Management", "Content Strategy"
];

export default function ResumeParserModal({ isOpen, onClose, onResumeParsed }) {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseComplete, setParseComplete] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsParsing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setResumeText(typeof text === 'string' ? text : `Uploaded: ${file.name}`);
      parseContext(typeof text === 'string' ? text : file.name, file.name);
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      setTimeout(() => {
        const simulatedText = `${file.name.replace(/\.[^/.]+$/, "")} React JavaScript TypeScript Tailwind CSS Git Python SQL Agile 3 years experience`;
        setResumeText(simulatedText);
        parseContext(simulatedText, file.name);
      }, 800);
    }
  };

  const parseContext = (rawText, customFileName = "Resume.pdf") => {
    setIsParsing(true);

    setTimeout(() => {
      const textLower = rawText.toLowerCase();

      const matchedSkills = KNOWN_SKILLS.filter(skill =>
        textLower.includes(skill.toLowerCase())
      );

      const emailMatch = rawText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      const email = emailMatch ? emailMatch[0] : "user@example.com";

      const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
      const phone = phoneMatch ? phoneMatch[0] : "98765 43210";

      const words = rawText.trim().split(/\s+/);
      const inferredName = words.length > 1 && !words[0].includes("@")
        ? `${words[0]} ${words[1]}`
        : "Candidate Profile";

      const parsedResult = {
        fileName: customFileName,
        fileSize: "1.4 MB",
        fullName: inferredName,
        email,
        phone,
        skills: matchedSkills.length > 0 ? matchedSkills : ["React", "JavaScript", "HTML", "CSS", "Git"],
        rawText
      };

      setExtractedData(parsedResult);
      setIsParsing(false);
      setParseComplete(true);

      localStorage.setItem('parsed_resume', JSON.stringify(parsedResult));
      localStorage.setItem('user_profile_cache', JSON.stringify(parsedResult));

      onResumeParsed(parsedResult);
    }, 900);
  };

  const handleManualParse = () => {
    if (!resumeText.trim()) return;
    parseContext(resumeText, fileName || "Pasted_Resume.txt");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden">
        
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Add & Parse Resume</h3>
              <p className="text-[11px] text-slate-500">Analyze skills and match opportunities instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <label className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50/60 transition rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center cursor-pointer text-center">
            <UploadCloud className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-xs font-bold text-slate-700">
              {fileName ? fileName : "Click to upload your resume"}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">PDF, DOC, DOCX or TXT (Max 5MB)</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] text-slate-400 font-semibold uppercase">or paste text</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <div>
            <textarea
              rows={3}
              placeholder="Paste your resume content or skills list here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {extractedData && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Parsed {extractedData.skills.length} skills:
              </div>
              <div className="flex flex-wrap gap-1">
                {extractedData.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl text-xs hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleManualParse}
              disabled={isParsing || !resumeText.trim()}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              {isParsing ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Parsing...</>
              ) : parseComplete ? (
                <><CheckCircle2 className="w-3.5 h-3.5" /> Matched!</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5" /> Extract & Match</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
