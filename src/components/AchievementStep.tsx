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
  Building2,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Navbar from "./Navbar";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

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
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-10">
        <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-10">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[#630ed4] text-xs uppercase tracking-widest mb-1">
                  Step 7 of 8
                </p>
                <h1 className="text-3xl text-[#1d1a24]">Achievements</h1>
              </div>
              <div className="text-right">
                <span className="text-sm text-[#4a4455]">87% Complete</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[87%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">
                  Achievements
                </h1>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                  Highlight your key milestones and recognitions that showcase
                  your excellence and dedication.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Achievement Entries */}
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group relative bg-white border border-slate-200 rounded-3xl p-6 md:p-8 transition-all hover:border-[#7c3aed]/30 hover:shadow-md"
                    >
                      {/* Achievement Icon */}
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <Trophy size={20} />
                      </div>

                      {/* Delete Button */}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-[#ba1a1a] transition-colors p-2 hover:bg-[#ba1a1a]/10 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-2">
                        {/* Achievement Title */}
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm text-slate-900 font-semibold block ml-1">
                            Achievement Title
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Award
                              size={20}
                              className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                            />
                            <input
                              {...register(`achievements.${index}.title`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                              placeholder="e.g. Employee of the Month"
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Issuing Organization */}
                        <div className="space-y-2">
                          <label className="text-sm text-slate-900 font-semibold block ml-1">
                            Issuing Organization
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Building2
                              size={20}
                              className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                            />
                            <input
                              {...register(`achievements.${index}.organization`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                              placeholder="Organization name"
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                          <label className="text-sm text-slate-900 font-semibold block ml-1">
                            Date
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Calendar
                              size={20}
                              className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                            />
                            <input
                              {...register(`achievements.${index}.date`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                              type="date"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Achievement (Dashed) */}
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        title: "",
                        organization: "",
                        date: "",
                      })
                    }
                    className="w-full py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-[#630ed4] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#7c3aed]/10 transition-all">
                      <Plus size={28} />
                    </div>
                    <span className="font-bold text-sm">Add another achievement</span>
                  </button>
                </div>

                {/* Footer Actions */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button className="hidden sm:block text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4">
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-10 py-4 rounded-xl text-sm shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      <span>{isSubmitting ? "Saving..." : "Continue"}</span>
                      {isSubmitting ? (
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
              </form>
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