"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    const { data } = await axios.get(
      `/api/resume/${resumeId}`
    );

    setSummary(data.data.summary || "");
  };

  const saveSummary = async () => {
    try {
      setLoading(true);

      await axios.patch(
        `/api/resume/${resumeId}`,
        {
          summary,
        }
      );

      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl">

        <h1 className="text-3xl font-bold mb-4">
          Professional Summary
        </h1>

        <textarea
          rows={8}
          value={summary}
          onChange={(e) =>
            setSummary(e.target.value)
          }
          className="w-full border rounded-xl p-4"
          placeholder="Write summary..."
        />

        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="border px-5 py-3 rounded-xl"
          >
            Back
          </button>

          <button
            onClick={saveSummary}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Saving..."
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}