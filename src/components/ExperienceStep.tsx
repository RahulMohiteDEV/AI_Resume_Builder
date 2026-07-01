"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Sparkles,
  Briefcase,
  Building,
  Calendar,
  Badge,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import Navbar from "./Navbar";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.workExperience?.length) {
        reset({
          experience: data.data.workExperience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    const exp = watch(`experience.${index}`);

    const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);
    const resume = resumeData.data;

    if (!exp?.role || !resume?.experienceLevel) {
      console.log("Missing required fields");
      return;
    }

    const { data } = await axios.post(
      "/api/ai/generate-experience-description",
      {
        jobRole: exp.role,
        experienceLevel: resume.experienceLevel,
        yearsOfExperience: resume.yearsOfExperience,
        techStack: resume.skills?.join(", "),
      }
    );

    setValue(
      `experience.${index}.description`,
      data.data.workExperienceDescription
    );
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        workExperience: values.experience,
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
                  Step 6 of 8
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl text-[#1d1a24] font-bold">
                  Work Experience
                </h1>
              </div>
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                  72% Complete
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[72%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card - Full Width on Mobile */}
          <div className="w-full bg-white border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg sm:shadow-xl overflow-hidden ">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  Work Experience
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto px-2 sm:px-4">
                  Detail your career history to help recruiters understand your
                  professional journey and achievements.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-8">
                {/* Experience Entries */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group relative bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all hover:border-[#7c3aed]/30 hover:shadow-md"
                    >
                      {/* Experience Icon */}
                      <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[#630ed4] group-hover:scale-110 transition-transform">
                        <Briefcase size={16} className="sm:size-[20px]" />
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
                        {/* Job Title */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Briefcase
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`experience.${index}.role`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              placeholder="Senior Product Designer"
                              type="text"
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Building
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`experience.${index}.company`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              placeholder="TechFlow Global"
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
                              {...register(`experience.${index}.startDate`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              type="month"
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
                              {...register(`experience.${index}.endDate`)}
                              disabled={watch(`experience.${index}.currentlyWorking`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                              type="month"
                            />
                          </div>
                        </div>

                        {/* Employment Type */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Employment Type <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                              <Badge
                                size={18}
                                className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                              />
                              <select
                                {...register(`experience.${index}.employmentType`)}
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none appearance-none cursor-pointer"
                              >
                                <option value="">Select Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                              </select>
                              <ChevronDown
                                size={18}
                                className="sm:size-[20px] text-slate-400 flex-shrink-0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Currently Working Checkbox */}
                        <div className="space-y-1.5 sm:space-y-2 flex items-end">
                          <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-900 font-semibold ml-1">
                            <input
                              type="checkbox"
                              {...register(`experience.${index}.currentlyWorking`)}
                              className="w-4 h-4 sm:w-5 sm:h-5 accent-[#630ed4] rounded"
                            />
                            Currently Working Here
                          </label>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                            <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                              Job Description &amp; Achievements <span className="text-red-500">*</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => generateDescription(index)}
                              className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-[#630ed4] hover:text-[#7c3aed] transition-colors px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#7c3aed]/5 border border-[#630ed4]/10"
                            >
                              <Sparkles
                                size={14}
                                className="sm:size-[16px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              />
                              Generate with AI
                            </button>
                          </div>
                          <div className="relative">
                            <textarea
                              {...register(`experience.${index}.description`)}
                              className="w-full min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-[#630ed4] focus:bg-white focus:border-[#630ed4] outline-none transition-all resize-none text-sm sm:text-base placeholder:text-slate-400 text-slate-900"
                              placeholder="Led the redesign of the core dashboard, resulting in a 25% increase in user retention..."
                              rows={4}
                            />
                          </div>
                          <p className="text-[#7b7487] text-[10px] sm:text-[11px] ml-1">
                            Pro Tip: Focus on quantifiable impact and specific tools used.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Experience (Dashed) */}
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        company: "",
                        role: "",
                        employmentType: "",
                        startDate: "",
                        endDate: "",
                        currentlyWorking: false,
                        description: "",
                      })
                    }
                    className="w-full py-6 sm:py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-slate-400 hover:text-[#630ed4] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#7c3aed]/10 transition-all">
                      <Plus size={24} className="sm:size-[28px]" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm">Add another role</span>
                  </button>
                </div>

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