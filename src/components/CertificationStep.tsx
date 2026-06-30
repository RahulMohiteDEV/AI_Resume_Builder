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
  Lightbulb,
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

      router.push(`/resume/${resumeId}/preview?updated=true`);
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
                  Step 8 of 8
                </p>
                <h1 className="text-3xl text-[#1d1a24]">Certifications</h1>
              </div>
              <div className="text-right">
                <span className="text-sm text-[#4a4455]">100% Complete</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-full rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">
                  Certifications
                </h1>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                  Validate your expertise with relevant industry certifications
                  and licenses that showcase your commitment to professional
                  development.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Certification Entries */}
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="group relative bg-white border border-slate-200 rounded-3xl p-6 md:p-8 transition-all hover:border-[#7c3aed]/30 hover:shadow-md"
                    >
                      {/* Certification Icon */}
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-[#a15100] group-hover:scale-110 transition-transform">
                        <Award size={20} />
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

                      <div className="grid grid-cols-1 gap-x-6 gap-y-6 mt-2">
                        {/* Certification Name */}
                        <div className="space-y-2">
                          <label className="text-sm text-slate-900 font-semibold block ml-1">
                            Certification Name
                          </label>
                          <div className="group-input flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                            <Award
                              size={20}
                              className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                            />
                            <input
                              {...register(`certifications.${index}.title`)}
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
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
                    className="w-full py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-[#630ed4] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#7c3aed]/10 transition-all">
                      <Plus size={28} />
                    </div>
                    <span className="font-bold text-sm">Add another certification</span>
                  </button>
                </div>


                          {/* Supportive Info Chips */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              <span className="text-blue-800 text-xs font-semibold">
                Pro Tip:   Include certifications that are specifically mentioned in job
                      descriptions for your target roles to increase your resume
                      relevance by up to 25%.
              </span>
            </div>
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
                      <span>{isSubmitting ? "Saving..." : "Finish Resume"}</span>
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