"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Sparkles,
  Info,
  Verified,
  RefreshCw,
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

      <div className="min-h-screen bg-slate-50 pt-14 sm:pt-16">
        <main className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-6 md:py-8 lg:py-10">
          {/* Progress Header - Full Width */}
          <div className="w-full px-3 sm:px-0 mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <p className="text-[#630ed4] text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                  Step 2 of 8
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl text-[#1d1a24] font-bold">
                  Professional Summary
                </h1>
              </div>
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                  25% Complete
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[25%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card - Full Width on Mobile */}
          <div className="w-full bg-white border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg sm:shadow-xl overflow-hidden ">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  Professional Summary
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto px-2 sm:px-4">
                  Write a short summary that highlights your experience, skills
                  and career goals. This is your chance to capture an employer's
                  attention in 30 seconds or less.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6 sm:space-y-8">
                {/* Input Section */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs sm:text-sm text-slate-900 font-semibold block">
                      Summary <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
                      {wordCount} words
                    </span>
                  </div>
                  <div className="relative group">
                    <div className="absolute top-3.5 sm:top-4 left-3 sm:left-4 text-slate-400 group-focus-within:text-[#630ed4] transition-colors duration-200">
                      <FileText size={18} className="sm:size-[20px]" />
                    </div>
                    <textarea
                      className="w-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] pl-9 sm:pl-11 md:pl-12 pr-4 sm:pr-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 text-sm sm:text-base focus:ring-2 focus:ring-[#630ed4] focus:bg-white focus:border-[#630ed4] outline-none transition-all duration-200 resize-none placeholder:text-slate-400 text-slate-900"
                      placeholder="e.g. Innovative Software Engineer with 5+ years of experience in building scalable cloud applications..."
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                    {/* AI Suggestion Trigger */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                      <button
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 text-[#630ed4] border border-[#630ed4]/20 rounded-lg sm:rounded-xl transition-all active:scale-95 group/ai text-xs sm:text-sm"
                        onClick={handleAIImprove}
                        disabled={aiLoading}
                      >
                        {aiLoading ? (
                          <>
                            <RefreshCw size={16} className="sm:size-[18px] animate-spin text-[#630ed4]" />
                            <span className="text-[10px] sm:text-xs font-bold">Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles
                              size={16}
                              className="sm:size-[18px] text-[#630ed4]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            />
                            <span className="text-[10px] sm:text-xs font-bold">AI Improve</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Supportive Info Chips */}
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="bg-blue-50/50 border border-blue-100 px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    <Info size={16} className="sm:size-[20px] text-blue-600 flex-shrink-0" />
                    <span className="text-blue-800 text-[10px] sm:text-xs font-semibold text-center sm:text-left">
                      Pro Tip: Keep it between 3-5 sentences
                    </span>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    <Verified size={16} className="sm:size-[20px] text-emerald-600 flex-shrink-0" />
                    <span className="text-emerald-800 text-[10px] sm:text-xs font-semibold text-center sm:text-left">
                      Include relevant keywords
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
                      onClick={saveSummary}
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