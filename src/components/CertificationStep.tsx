"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Award,
  RefreshCw,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface FormValues {
  certifications: {
    title: string;
  }[];
}

export default function CertificationStep({
  resumeId,
  onNext,
  onBack,
}: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      certifications: [{ title: "" }],
    },
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    fetchResume();
    // 🔽 Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      reset({
        certifications: data.data.certifications?.length
          ? data.data.certifications.map((item: string) => ({
              title: item,
            }))
          : [{ title: "" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        certifications: values.certifications.map((item) => item.title),
      });

      // 🔽 Scroll to top before navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // 🔽 Small delay for smooth UX
      setTimeout(() => {
        router.push(`/resume/${resumeId}/preview?updated=true`);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔽 Handle back button with scroll
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      onBack();
    }, 300);
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
                  Step 8 of 8
                </p>
                <h1 className="text-lg sm:text-2xl md:text-3xl text-[#1d1a24] font-bold">
                  Certifications
                </h1>
              </div>
              <div className="text-right w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                  100% Complete
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-full rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card - Full Width on Mobile */}
          <div className="w-full bg-white border-0 sm:border sm:border-slate-200 shadow-none sm:shadow-lg sm:shadow-xl overflow-hidden ">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              {/* Heading */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  Certifications
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto px-2 sm:px-4">
                  Validate your expertise with relevant industry certifications
                  and licenses that showcase your commitment to professional
                  development.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 md:space-y-8">
                {/* Certification Entries */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group relative bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all hover:border-[#7c3aed]/30 hover:shadow-md"
                    >
                      {/* Certification Icon */}
                      <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[#a15100] group-hover:scale-110 transition-transform">
                        <Award size={16} className="sm:size-[20px]" />
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

                      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 mt-2">
                        {/* Certification Name */}
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm text-slate-900 font-semibold block ml-1">
                            Certification Name <span className="text-red-500">*</span>
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3.5 sm:py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Award
                              size={18}
                              className="sm:size-[20px] text-slate-400 mr-2.5 sm:mr-3 group-focus-within:text-[#630ed4] transition-colors flex-shrink-0"
                            />
                            <input
                              {...register(`certifications.${index}.title`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
                              placeholder="e.g. AWS Certified Solutions Architect"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Certification (Dashed) */}
                  <button
                    type="button"
                    onClick={() => append({ title: "" })}
                    className="w-full py-6 sm:py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center gap-2 sm:gap-3 text-slate-400 hover:text-[#630ed4] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#7c3aed]/10 transition-all">
                      <Plus size={24} className="sm:size-[28px]" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm">Add another certification</span>
                  </button>
                </div>

                {/* Supportive Info Chips */}
                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                  <div className="bg-blue-50/50 border border-blue-100 px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                    <Info size={16} className="sm:size-[20px] text-blue-600 flex-shrink-0" />
                    <span className="text-blue-800 text-[10px] sm:text-xs font-semibold text-center sm:text-left">
                      Pro Tip: Include certifications that are specifically mentioned in job descriptions
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-5 sm:pt-6 md:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
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
                      <span>{isSubmitting ? "Saving..." : "Finish Resume"}</span>
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