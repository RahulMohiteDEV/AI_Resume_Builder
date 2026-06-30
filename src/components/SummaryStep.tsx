"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Bell,
  Settings,
  Sparkles,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SummaryStep({ resumeId, onNext, onBack }: Props) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      setSummary(data.data.summary || "");
    } catch (err) {
      console.log(err);
    }
  };

  const saveSummary = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/resume/${resumeId}`, {
        summary,
      });
      onNext();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAIImprove = async () => {
    setAiLoading(true);
    // Simulate AI improvement
    setTimeout(() => {
      setAiLoading(false);
      // You can add actual AI improvement logic here
    }, 1500);
  };

  // Count words
  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-[#1d1a24]">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-slate-100">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-[#630ed4]">Aura AI</span>
            <nav className="hidden md:flex items-center gap-6">
              <a
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
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
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
                href="#"
              >
                Templates
              </a>
              <a
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
                href="#"
              >
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Bell size={22} />
            </button>
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Settings size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGWt0XZnZnoooo97WeNienf64Gp7vWp4uQ4oSc8rueSxFgvI67Cb7X8Hx-R_mp1w3l-LwbBnDb9CB61N4T444G1u0zl1FhhmtX3Fpq-VQpUeFJbXolgrzt5_Mzb4n8T4X0JaRoA6-IUIrF5noAbFXfqRZs6KvjwIcis2mgXXWXCpIMshaN4ABjzsVBgHdwlA7EvMOSSwlq8VCHTIc6qqApbQPrEOifgZPdOHLIVB0oZOaWmvAQPCBgiJk2kT27a4pgN6VrzZY339Y"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col items-center">
        {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-500">
              Step 2 of 8
            </span>
            <span className="text-sm font-medium text-[#630ed4] font-bold">
              25% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#630ed4] transition-all duration-700 ease-out"
              style={{ width: "25%" }}
            ></div>
          </div>
        </div>

        {/* Main Content Card */}
        <section className="w-full max-w-3xl bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="p-8 md:p-14">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl text-slate-950 mb-3 font-bold">
                Professional Summary
              </h1>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                Write a short summary that highlights your experience, skills
                and career goals. This is your chance to capture an employer's
                attention in 30 seconds or less.
              </p>
            </div>

            {/* Form Content */}
            <div className="space-y-8">
              {/* Input Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm text-slate-900 font-semibold block">
                    Summary
                  </label>
                  <span className="text-[11px] font-bold text-slate-400">
                    {wordCount} words
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-[#630ed4] transition-colors duration-200">
                    <FileText size={20} />
                  </div>
                  <textarea
                    className="w-full min-h-[240px] pl-12 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#630ed4] focus:bg-white focus:border-[#630ed4] outline-none transition-all duration-200 resize-none placeholder:text-slate-400"
                    placeholder="e.g. Innovative Software Engineer with 5+ years of experience in building scalable cloud applications..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  {/* AI Suggestion Trigger */}
                  <div className="absolute bottom-4 right-4">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 text-[#630ed4] border border-[#630ed4]/20 rounded-xl transition-all active:scale-95 group/ai"
                      onClick={handleAIImprove}
                      disabled={aiLoading}
                    >
                      {aiLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-[#630ed4]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="text-xs font-bold">Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles
                            size={18}
                            className="text-[#630ed4]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          />
                          <span className="text-xs font-bold">AI Improve</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Helper Cards */}
              <div className="space-y-4">
                <div className="bg-[#7c3aed]/5 rounded-[1.5rem] p-6 flex items-start gap-4 border border-[#630ed4]/10">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Lightbulb size={24} className="text-[#630ed4]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#630ed4] font-bold mb-1">
                      Pro Tip
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Keep it between 3-5 sentences for maximum impact on ATS
                      systems and recruiters.
                    </p>
                  </div>
                </div>
                <div className="bg-[#505f76]/5 rounded-[1.5rem] p-6 flex items-start gap-4 border border-[#505f76]/10">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <TrendingUp size={24} className="text-[#505f76]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#505f76] font-bold mb-1">
                      Visibility
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Include relevant keywords from the job description to
                      increase your search ranking.
                    </p>
                  </div>
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
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-10 py-4 rounded-xl text-sm shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 group"
                    onClick={saveSummary}
                    disabled={loading}
                  >
                    <span>{loading ? "Saving..." : "Continue"}</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Floating Preview Hint */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">
            Premium Resume Builder by Aura
          </p>
        </div>
      </main>

      <footer className="h-20"></footer>
    </div>
  );
}