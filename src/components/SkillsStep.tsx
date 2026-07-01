"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  Search,
  RefreshCw,
  Info,
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

      <div className="min-h-screen bg-slate-50 pt-14 sm:pt-16">
        <main className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-6 md:py-8 lg:py-10">
          {/* Progress Header - Full Width */}
          <div className="w-full px-3 sm:px-0 mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <p className="text-[#630ed4] text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                  Step 4 of 8
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl text-[#1d1a24] font-bold">
                  Skills &amp; Expertise
                </h1>
              </div>
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                  48% Complete
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[48%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card - Full Width on Mobile */}
          <div className="w-full bg-white border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg sm:shadow-xl overflow-hidden ">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  Skills &amp; Expertise
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto px-2 sm:px-4">
                  Highlight the core competencies and technical proficiencies
                  that set you apart in your field.
                </p>
              </div>

              <div className="space-y-5 sm:space-y-6 md:space-y-8">
                {/* AI Generate Button */}
                <div className="flex justify-end">
                  <button
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#7c3aed]/10 text-[#630ed4] border border-[#630ed4]/20 rounded-lg sm:rounded-xl text-xs sm:text-sm hover:bg-[#7c3aed]/20 transition-all active:scale-95"
                    onClick={generateSkills}
                    disabled={aiLoading}
                  >
                    {aiLoading ? (
                      <>
                        <RefreshCw size={16} className="sm:size-[18px] animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles
                          size={16}
                          className="sm:size-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        />
                        <span>Generate with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Skill Input Section */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                    Add a Skill <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow group">
                      <Search
                        size={18}
                        className="sm:size-[20px] absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#630ed4] transition-colors"
                      />
                      <input
                        className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-3.5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#630ed4] focus:bg-white focus:border-[#630ed4] outline-none transition-all text-sm sm:text-base placeholder:text-slate-400 text-slate-900"
                        placeholder="e.g., Strategic Leadership, React.js, Financial Modeling..."
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button
                      className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#630ed4] text-white rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-[#7c3aed] transition-all active:scale-95 shadow-lg shadow-[#630ed4]/20 w-full sm:w-auto"
                      onClick={addSkill}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Skills Display Area */}
                <div className="pt-2">
                  <h3 className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mb-2 sm:mb-4 ml-1">
                    Your Selected Skills ({skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 min-h-[100px] sm:min-h-[120px] p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl border border-dashed border-slate-200">
                    {skills.length === 0 ? (
                      <div className="flex flex-col items-center justify-center w-full h-full text-slate-400 py-6 sm:py-10">
                        <div className="text-3xl sm:text-4xl mb-2">📦</div>
                        <p className="text-xs sm:text-sm text-center px-4">No skills added yet. Start typing above or use AI.</p>
                      </div>
                    ) : (
                      skills.map((skill) => (
                        <div
                          key={skill}
                          className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#630ed4] rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"
                        >
                          <span className="text-xs sm:text-sm font-medium">{skill}</span>
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-sm hover:text-[#630ed4] transition-colors leading-none p-0.5 rounded-full hover:bg-[#7c3aed]/20"
                          >
                            <X size={14} className="sm:size-[16px]" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Supportive Info Chips */}
                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="bg-blue-50/50 border border-blue-100 px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    <Info size={16} className="sm:size-[20px] text-blue-600 flex-shrink-0" />
                    <span className="text-blue-800 text-[10px] sm:text-xs font-semibold text-center sm:text-left">
                      Pro Tip: Tailor your skills to the specific job description
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 sm:pt-6 md:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-slate-100">
                  <button
                    className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors py-3 sm:py-2 px-4 w-full sm:w-auto order-2 sm:order-1"
                    onClick={onBack}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                    <button className="hidden sm:block text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4">
                      Save as Draft
                    </button>
                    <button
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                      onClick={saveSkills}
                      disabled={loading}
                    >
                      <span>{loading ? "Saving..." : "Continue"}</span>
                      {loading ? (
                        <RefreshCw size={16} className="sm:size-[18px] animate-spin" />
                      ) : (
                        <ArrowRight
                          size={16}
                          className="sm:size-[18px] group-hover:translate-x-1 transition-transform"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-400 font-medium">
              Premium Resume Builder by Aura AI
            </p>
          </div>
        </main>
      </div>
    </>
  );
}