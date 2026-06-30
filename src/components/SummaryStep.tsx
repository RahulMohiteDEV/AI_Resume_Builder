"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Sparkles,
  Lightbulb,
  TrendingUp,
  RefreshCw,
  Info,
  Verified
} from "lucide-react";
import Navbar from "./Navbar";

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
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-10">
        <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-10">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[#630ed4] text-xs uppercase tracking-widest mb-1">
                  Step 2 of 8
                </p>
                <h1 className="text-3xl text-[#1d1a24]">Professional Summary</h1>
              </div>
              <div className="text-right">
                <span className="text-sm text-[#4a4455]">25% Complete</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[25%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">
                  Professional Summary
                </h1>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
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
                            <RefreshCw size={18} className="animate-spin text-[#630ed4]" />
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

              {/* Supportive Info Chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              <span className="text-blue-800 text-xs font-semibold">
                Pro Tip:  Keep it between 3-5 sentences for maximum impact on ATS systems and recruiters.
              </span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
              <Verified size={20} className="text-emerald-600" />
              <span className="text-emerald-800 text-xs font-semibold">
                 Include relevant keywords from the job description to increase your search ranking.
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
                      onClick={saveSummary}
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