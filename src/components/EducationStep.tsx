"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  GraduationCap,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Bell,
  Settings,
  Building,
  BookOpen,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface EducationForm {
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
}

export default function EducationStep({ resumeId, onNext, onBack }: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EducationForm>({
    defaultValues: {
      education: [
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      if (data.data?.education && data.data.education.length > 0) {
        reset({
          education: data.data.education,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: EducationForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        education: values.education,
      });
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12">
      <main className="w-full max-w-[840px]">
         {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-500">
              Step 3 of 8
            </span>
            <span className="text-sm font-medium text-[#630ed4] font-bold">
              36% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#630ed4] transition-all duration-700 ease-out"
              style={{ width: "36%" }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 relative overflow-hidden">
          {/* Subtle Decorative Background Element */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none"></div>

          <header className="mb-10">
            <p className="text-lg text-slate-500">Add your educational background.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Education List Container */}
            <div className="space-y-12" id="education-list">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="group relative bg-slate-50/50 p-8 rounded-3xl border border-slate-100 transition-all hover:bg-white hover:border-[#7c3aed]/20"
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#630ed4] group-hover:scale-110 transition-transform">
                    <GraduationCap size={20} />
                  </div>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-[#ba1a1a] transition-colors p-2 hover:bg-[#ba1a1a]/10 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Institute */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm text-slate-700 ml-1">
                        Institute Name
                      </label>
                      <div className="relative">
                        <Building
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          {...register(`education.${index}.institute`)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 transition-all focus:border-[#630ed4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/10"
                          placeholder="Lakshmi Narain College of Technology"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Degree */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm text-slate-700 ml-1">
                        Degree / Course
                      </label>
                      <div className="relative">
                        <BookOpen
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          {...register(`education.${index}.degree`)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 transition-all focus:border-[#630ed4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/10"
                          placeholder="B.Tech Computer Science"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                      <label className="text-sm text-slate-700 ml-1">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          {...register(`education.${index}.startDate`)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 transition-all focus:border-[#630ed4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/10"
                          type="date"
                        />
                      </div>
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <label className="text-sm text-slate-700 ml-1">
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                          {...register(`education.${index}.endDate`)}
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 transition-all focus:border-[#630ed4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/10"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Education Button */}
            <button
              type="button"
              onClick={() =>
                append({
                  institute: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
              className="group flex items-center gap-3 px-8 py-4 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 border-2 border-dashed border-[#7c3aed]/20 rounded-2xl w-full justify-center transition-all"
            >
              <Plus
                size={20}
                className="text-[#630ed4] group-hover:scale-125 transition-transform"
              />
              <span className="text-sm text-[#630ed4] font-bold">
                Add Education
              </span>
            </button>

            {/* Navigation Actions */}
            <div className="pt-8 mt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <button
                type="button"
                onClick={onBack}
                className="order-2 md:order-1 flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 text-sm transition-colors group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 md:order-2 w-full md:w-auto min-w-[220px] flex items-center justify-center gap-3 px-10 py-5 bg-[#630ed4] hover:bg-[#7c3aed] text-white rounded-2xl shadow-lg shadow-[#630ed4]/25 text-xl font-semibold transition-all active:scale-95 group"
              >
                {isSubmitting ? "Saving..." : "Continue"}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badge / Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" />
            Your data is saved securely in the cloud
          </p>
        </div>
      </main>
    </div>
  );
}