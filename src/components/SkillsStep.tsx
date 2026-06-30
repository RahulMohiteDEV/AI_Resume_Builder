"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  Bell,
  Settings,
  Search,
  Lightbulb,
  Plus,
  RefreshCw,
} from "lucide-react";

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

      // Merge AI skills with existing skills
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
    <div className="min-h-screen bg-slate-50 text-[#1d1a24]">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-50 bg-white shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold text-[#630ed4] cursor-pointer">
              Aura Professional
            </span>
            <nav className="hidden md:flex items-center gap-4 ml-8">
              <a
                className="text-sm text-[#4a4455] hover:text-[#7c3aed] transition-colors duration-200"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-sm text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1"
                href="#"
              >
                Resumes
              </a>
              <a
                className="text-sm text-[#4a4455] hover:text-[#7c3aed] transition-colors duration-200"
                href="#"
              >
                Templates
              </a>
              <a
                className="text-sm text-[#4a4455] hover:text-[#7c3aed] transition-colors duration-200"
                href="#"
              >
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#4a4455] hover:bg-[#ede5f4] rounded-full transition-colors cursor-pointer">
              <Bell size={22} />
            </button>
            <button className="p-2 text-[#4a4455] hover:bg-[#ede5f4] rounded-full transition-colors cursor-pointer">
              <Settings size={22} />
            </button>
            <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 flex items-center justify-center border border-[#630ed4]/10 overflow-hidden cursor-pointer active:scale-95 transition-transform">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApoGe_vQN1Jtr4kXJa-wD3ynRefJH_R0HOi4Y3xAB06bf1RsIdJv7bOoD84u9asXDC7va5566Jm_ks4qFLcA3iy75g09xiFAyyyvcZFI0SWsnSjcrlwxnYQwxXDu00iTnhom-DQl0f56MpoHQkBd7wEPyRh6SvQrHgVvrRBykSWAAl2OaqoPvjebJkeun2nVHTcbuPCaDZeF3D6escwAL5b5PP6a0skeo9YQI5RgdpL4anmNgRkMrFjSMOTbja1FwXFeMGw9YZwB8"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-500">
              Step 4 of 8
            </span>
            <span className="text-sm font-medium text-[#630ed4] font-bold">
              48% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#630ed4] transition-all duration-700 ease-out"
              style={{ width: "48%" }}
            ></div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-white/95 backdrop-blur-[10px] rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10 md:p-14">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="max-w-md">
              <h2 className="text-xl text-slate-950 font-semibold">
                Skills Expertise
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Highlight the core competencies and technical proficiencies that
                set you apart in your field.
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7c3aed] text-white rounded-xl text-sm hover:bg-[#630ed4] transition-all active:scale-95 shadow-lg shadow-[#7c3aed]/20"
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
          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-sm text-slate-700 mb-2 ml-1">
                Add a Proficiency
              </label>
              <div className="flex gap-3">
                <div className="relative flex-grow">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#630ed4] transition-colors"
                  />
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#7c3aed] outline-none transition-all text-sm placeholder:text-slate-400"
                    id="skillInput"
                    placeholder="e.g., Strategic Leadership, React.js, Financial Modeling..."
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button
                  className="px-8 py-4 bg-slate-950 text-white rounded-2xl text-sm hover:bg-slate-800 transition-all active:scale-95"
                  onClick={addSkill}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Skills Display Area */}
            <div className="pt-4">
              <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4 ml-1">
                Your Selected Skills
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
                      className="group flex items-center gap-2 px-4 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#7c3aed] rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300"
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
          </div>

          {/* Footer AI Hint */}
          <div className="mt-12 flex items-start gap-4 p-5 bg-[#ffb784]/10 rounded-2xl border border-[#ffb784]/20">
            <Lightbulb
              size={24}
              className="text-[#7d3d00] leading-none shrink-0"
            />
            <div>
              <p className="text-sm text-[#7d3d00] font-bold">Pro Tip</p>
              <p className="text-xs text-[#713700] mt-1">
                Tailor your skills to the specific job description to increase
                your ATS score by up to 35%.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between py-6">
          <button
            className="flex items-center gap-2 px-8 py-3 text-slate-600 hover:text-slate-900 text-sm transition-colors group"
            onClick={onBack}
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back
          </button>
          <div className="flex items-center gap-8">
            <button className="text-sm text-slate-400 hover:text-[#630ed4] transition-colors decoration-slate-300 underline-offset-4 hover:underline">
              Save as Draft
            </button>
            <button
              className="flex items-center gap-2 px-10 py-3 bg-[#7c3aed] text-white rounded-xl text-sm hover:bg-[#630ed4] transition-all active:scale-95 shadow-xl shadow-[#7c3aed]/20 group"
              onClick={saveSkills}
              disabled={loading}
            >
              {loading ? "Saving..." : "Continue"}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-20 pb-8 border-t border-slate-100 pt-12">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-xs text-slate-400">© 2024 Aura AI Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}