"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  Search,
  Lightbulb,
  RefreshCw,
  Info,
  Verified,
} from "lucide-react";
import Navbar from "./Navbar";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SkillsStep({ resumeId, onNext, onBack }: Props) {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}/`);
      setSkills(data.data.skills || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) return;
    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const generateSkills = async () => {
    try {
      setAiLoading(true);
      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);
      const resume = resumeData.resume;

      const { data } = await axios.post("/api/ai/generate-skills", {
        jobTitle: resume?.jobTitle || "web developer",
        experienceLevel: resume?.experienceLevel || "mid-level",
      });

      const aiSkills = data.data.skills || [];
      const newSkills = aiSkills.filter((s: string) => !skills.includes(s));
      setSkills((prev) => [...prev, ...newSkills]);
    } catch (error) {
      console.log(error);
    } finally {
      setAiLoading(false);
    }
  };

  const saveSkills = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/resume/${resumeId}`, {
        skills,
      });
      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-10">
        <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-10">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[#630ed4] text-xs uppercase tracking-widest mb-1">
                  Step 4 of 8
                </p>
                <h1 className="text-3xl text-[#1d1a24]">Skills &amp; Expertise</h1>
              </div>
              <div className="text-right">
                <span className="text-sm text-[#4a4455]">48% Complete</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[48%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">
                  Skills &amp; Expertise
                </h1>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                  Highlight the core competencies and technical proficiencies
                  that set you apart in your field.
                </p>
              </div>

              <div className="space-y-8">
                {/* AI Generate Button - Moved to top right of card */}
                <div className="flex justify-end">
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7c3aed]/10 text-[#630ed4] border border-[#630ed4]/20 rounded-xl text-sm hover:bg-[#7c3aed]/20 transition-all active:scale-95"
                    onClick={generateSkills}
                    disabled={aiLoading}
                  >
                    {aiLoading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles
                          size={18}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        />
                        <span>Generate with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Skill Input Section */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Add a Skill
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-grow group">
                      <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#630ed4] transition-colors"
                      />
                      <input
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#630ed4] focus:bg-white focus:border-[#630ed4] outline-none transition-all text-sm placeholder:text-slate-400"
                        placeholder="e.g., Strategic Leadership, React.js, Financial Modeling..."
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button
                      className="px-8 py-4 bg-[#630ed4] text-white rounded-2xl text-sm hover:bg-[#7c3aed] transition-all active:scale-95 shadow-lg shadow-[#630ed4]/20"
                      onClick={addSkill}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Skills Display Area */}
                <div className="pt-2">
                  <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4 ml-1">
                    Your Selected Skills ({skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-3 min-h-[120px] p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                    {skills.length === 0 ? (
                      <div className="flex flex-col items-center justify-center w-full h-full text-slate-400 py-10">
                        <div className="text-4xl mb-2">📦</div>
                        <p className="text-sm">No skills added yet. Start typing above or use AI.</p>
                      </div>
                    ) : (
                      skills.map((skill) => (
                        <div
                          key={skill}
                          className="group flex items-center gap-2 px-4 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#630ed4] rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"
                        >
                          <span className="text-sm font-medium">{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-sm hover:text-[#630ed4] transition-colors leading-none p-0.5 rounded-full hover:bg-[#7c3aed]/20"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* AI Pro Tip */}
                {/* <div className="bg-[#7c3aed]/5 rounded-[1.5rem] p-6 flex items-start gap-4 border border-[#630ed4]/10">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Lightbulb size={24} className="text-[#630ed4]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#630ed4] font-bold mb-1">
                      Pro Tip
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Tailor your skills to the specific job description to
                      increase your ATS score by up to 35%.
                    </p>
                  </div>
                </div> */}

                 {/* Supportive Info Chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              <span className="text-blue-800 text-xs font-semibold">
                Pro Tip: Tailor your skills to the specific job description to
                      increase your ATS score by up to 35%.
              </span>
            </div>
          </div>

                {/* Footer Actions */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4"
                    onClick={onBack}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button className="hidden sm:block text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4">
                      Save as Draft
                    </button>
                    <button
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-10 py-4 rounded-xl text-sm shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                      onClick={saveSkills}
                      disabled={loading}
                    >
                      <span>{loading ? "Saving..." : "Continue"}</span>
                      {loading ? (
                        <RefreshCw size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Premium Resume Builder by Aura AI
            </p>
          </div>
        </main>
      </div>
    </>
  );
}