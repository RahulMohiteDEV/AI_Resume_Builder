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
  Building,
  BookOpen,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Navbar from "./Navbar";

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
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-14 sm:pt-16">
        <main className="w-full max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-6 md:py-8 lg:py-10">
          {/* Progress Header - Full Width */}
          <div className="w-full px-3 sm:px-0 mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <p className="text-[#630ed4] text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                  Step 3 of 8
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl text-[#1d1a24] font-bold">
                  Education
                </h1>
              </div>
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                  36% Complete
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[36%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card - Full Width on Mobile */}
          <div className="w-full bg-white border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg sm:shadow-xl overflow-hidden ">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  Education
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto px-2 sm:px-4">
                  Add your educational background. This helps recruiters
                  understand your qualifications and academic journey.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-8">
                {/* Education List Container */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group relative bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all hover:border-[#7c3aed]/30 hover:shadow-md"
                    >
                      {/* Education Icon */}
                      <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[#630ed4] group-hover:scale-110 transition-transform">
                        <GraduationCap size={16} className="sm:size-[20px]" />
                      </div>

                      {/* Delete Button */}
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-slate-400 hover:text-[#ba1a1a] transition-colors p-1.5 sm:p-2 hover:bg-[#ba1a1a]/10 rounded-lg sm:rounded-xl"
                        >
                          <Trash2 size={16} className="sm:size-[18px]" />
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-2">
                        {/* Institute */}
                        <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Institute Name <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Building
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`education.${index}.institute`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              placeholder="Lakshmi Narain College of Technology"
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Degree */}
                        <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Degree / Course <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <BookOpen
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`education.${index}.degree`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              placeholder="B.Tech Computer Science"
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Calendar
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`education.${index}.startDate`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              type="date"
                            />
                          </div>
                        </div>

                        {/* End Date */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            End Date <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Calendar
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`education.${index}.endDate`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
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
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 border-2 border-dashed border-[#7c3aed]/20 rounded-xl sm:rounded-2xl w-full transition-all"
                >
                  <Plus
                    size={18}
                    className="sm:size-[20px] text-[#630ed4] group-hover:scale-125 transition-transform"
                  />
                  <span className="text-xs sm:text-sm text-[#630ed4] font-bold">
                    Add Education
                  </span>
                </button>

                {/* Footer Actions */}
                <div className="pt-5 sm:pt-6 md:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors py-3 sm:py-2 px-4 w-full sm:w-auto order-2 sm:order-1"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                    <button className="hidden sm:block text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4">
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-5 sm:px-8 md:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      <span>{isSubmitting ? "Saving..." : "Continue"}</span>
                      {isSubmitting ? (
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
              </form>
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