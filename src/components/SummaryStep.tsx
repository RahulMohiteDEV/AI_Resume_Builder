"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SummaryStep({
  resumeId,
  onNext,
  onBack,
}: Props) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Step 2 of 8
            </span>

            <span className="text-slate-500">
              24%
            </span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full">
            <div className="h-full w-[25%] bg-violet-600 rounded-full" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Professional Summary
            </h1>

            <p className="text-slate-500 mt-2">
              Write a short summary that highlights your experience,
              skills and career goals.
            </p>
          </div>

          {/* Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Summary
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-5 text-slate-400"
              />

              <textarea
                rows={10}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Example: Full Stack Developer with 2+ years of experience building scalable web applications using React, Next.js, Node.js and MongoDB..."
                className="w-full border border-slate-300 rounded-xl py-4 pl-12 pr-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-8">

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={saveSummary}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Saving..." : "Continue"}

              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}