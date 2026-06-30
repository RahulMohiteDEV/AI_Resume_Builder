"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Trophy,
  Sparkles,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

// ✅ FormValues with full achievement object
interface FormValues {
  achievements: {
    title: string;
    organization: string;
    date: string;
  }[];
}

export default function AchievementStep({ resumeId, onNext, onBack }: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      achievements: [
        {
          title: "",
          organization: "",
          date: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.achievements?.length) {
        // ✅ Handle both string array and object array
        const formattedAchievements = data.data.achievements.map((item: any) => {
          if (typeof item === "string") {
            return { title: item, organization: "", date: "" };
          }
          return {
            title: item.title || "",
            organization: item.organization || "",
            date: item.date || "",
          };
        });
        reset({ achievements: formattedAchievements });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      // ✅ Filter out empty titles
      const filteredAchievements = values.achievements.filter(
        (item) => item.title.trim() !== ""
      );

      await axios.patch(`/api/resume/${resumeId}`, {
        achievements: filteredAchievements,
      });
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Aura AI
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium text-slate-600 hover:text-[#7C3AED] transition-colors"
            href="#"
          >
            Profile
          </a>
          <a
            className="text-sm font-medium text-slate-600 hover:text-[#7C3AED] transition-colors"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-sm font-medium text-slate-600 hover:text-[#7C3AED] transition-colors"
            href="#"
          >
            Settings
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-slate-700">Help</button>
          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="max-w-4xl mx-auto w-full px-6 pt-12 pb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C3AED]">
              Step 7 of 8
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Achievements
            </h1>
          </div>
          <span className="text-sm font-semibold text-slate-500">
            87% Complete
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] rounded-full"
            style={{ width: "87%" }}
          ></div>
        </div>
      </section>

      {/* Main Form Card */}
      <main className="flex-grow flex flex-col items-center justify-start px-6 pb-20">
        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12">
          {/* Instructional Text */}
          <p className="text-slate-500 text-lg mb-10">
            Highlight your key milestones and recognitions.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 relative group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                    <Trophy size={24} className="text-amber-500" />
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Remove achievement"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* Achievement Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Achievement Title
                    </label>
                    <div className="relative flex items-center">
                      <Award
                        size={20}
                        className="absolute left-4 text-slate-400"
                      />
                      <input
                        {...register(`achievements.${index}.title`)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all outline-none"
                        placeholder="e.g. Employee of the Month"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Issuing Organization / Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Issuing Organization / Date
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative flex items-center">
                        <Building2
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`achievements.${index}.organization`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all outline-none"
                          placeholder="Organization name"
                          type="text"
                        />
                      </div>
                      <div className="relative flex items-center">
                        <Calendar
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`achievements.${index}.date`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all outline-none"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  organization: "",
                  date: "",
                })
              }
              className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-3 text-[#7C3AED] font-semibold hover:bg-violet-50 hover:border-[#7C3AED]/30 transition-all group"
            >
              <div className="bg-[#7C3AED]/10 p-1 rounded-full group-hover:scale-110 transition-transform">
                <Plus size={20} />
              </div>
              Add Achievement
            </button>

            <hr className="border-slate-100 my-12" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 font-semibold hover:text-slate-800 transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#7C3AED] hover:bg-violet-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Continue"}
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            Your data is saved securely in the cloud
          </span>
        </div>
        <div className="text-slate-400 text-xs">
          © 2023 Aura AI Professional Suite. All rights reserved.
        </div>
      </footer>
    </div>
  );
}