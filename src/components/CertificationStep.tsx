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
} from "lucide-react";

import { useRouter } from "next/navigation";

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
    console.log("FORM VALUES", values);
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
    <div className="min-h-screen flex flex-col bg-[#fef7ff]">
      {/* Top Navigation */}
      <header className="w-full top-0 sticky bg-[#fef7ff] shadow-sm z-50">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-bold text-[#630ed4] leading-[1.4] tracking-[-0.01em]">
              Aura AI
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#630ed4] text-[12px] font-semibold tracking-[0.05em] leading-none">
              PRO
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-[#4a4455] text-[14px] font-medium tracking-[0.02em] leading-none hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1 text-[14px] font-medium tracking-[0.02em] leading-none"
              href="#"
            >
              Resumes
            </a>
            <a
              className="text-[#4a4455] text-[14px] font-medium tracking-[0.02em] leading-none hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Templates
            </a>
            <a
              className="text-[#4a4455] text-[14px] font-medium tracking-[0.02em] leading-none hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Analytics
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-[#4a4455] hover:text-[#630ed4] transition-colors p-2">
              notifications
            </button>
            <div className="w-8 h-8 rounded-full bg-[#ede5f4] overflow-hidden border border-[#ccc3d8]">
              <img
                className="w-full h-full object-cover"
                alt="User profile"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO8OPU7mR-A2pOTRl52OEAcp2knnN3By2wd7gn9zPiJdbbphHFTiCj1tfW85094JN3NmCk4l08ZlmWTuGd4i8qoOzvztr-ax717klhR5A_qN63JpuF9nK32sCK-7BkC7_ia2UAeCJKDlfwoEXNWQWRPakF2FM6Y17NRihd4La_dMuhuIAyC_idKbFFPoHMLoj0o6Ws_ZzJGRdiTV0EDYoDOTG8RA_a3QMGEMCPvOfH6KLpsKpOJvrxT55QuF1fe2DeTBRsF8NZBuQ"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-6 py-8">
        <div className="w-full max-w-4xl space-y-8">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.05em] leading-none text-[#630ed4] uppercase">
                  Final Step
                </p>
                <h1 className="text-[48px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1d1a24] mt-2">
                  Certifications
                </h1>
              </div>
              <p className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#4a4455]">
                Step 8 of 8
              </p>
            </div>
            <div className="h-1.5 w-full bg-[#ede5f4] rounded-full overflow-hidden">
              <div className="h-full bg-[#630ed4] w-full transition-all duration-1000 ease-out"></div>
            </div>
            <p className="text-[16px] leading-[1.6] text-[#4a4455]">
              Validate your expertise with relevant industry certifications and licenses.
            </p>
          </div>

          {/* Certification Card */}
          <div className="bg-[#ffffff] rounded-[2.5rem] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] border border-[#ccc3d8]/30 p-8 md:p-10">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Certifications List */}
              <div className="space-y-8">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="group relative bg-[#f9f1ff]/50 rounded-[1.5rem] p-4 border border-transparent hover:border-[#630ed4]/20 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#1d1a24] ml-2">
                          Certification Name
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#a15100]">
                         
                          </span>
                          <input
                            {...register(`certifications.${index}.title`)}
                            placeholder="e.g. AWS Certified Solutions Architect"
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-[1rem] border-none shadow-sm text-[16px] leading-[1.6] input-focus-ring"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#1d1a24] ml-2">
                          Issuing Organization
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7b7487]">
                           
                          </span>
                          <input
                            placeholder="e.g. Amazon Web Services"
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-[1rem] border-none shadow-sm text-[16px] leading-[1.6] input-focus-ring"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#1d1a24] ml-2">
                          Issue Date
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7b7487]">
                           
                          </span>
                          <input
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-[1rem] border-none shadow-sm text-[16px] leading-[1.6] input-focus-ring"
                            type="date"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#1d1a24] ml-2">
                          Credential ID (Optional)
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7b7487]">
                            
                          </span>
                          <input
                            placeholder="e.g. ABC-123-XYZ"
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-[1rem] border-none shadow-sm text-[16px] leading-[1.6] input-focus-ring"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors border border-[#ccc3d8]/30"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={() => append({ title: "" })}
                className="w-full py-8 border-2 border-dashed border-[#ccc3d8] rounded-[1.5rem] flex flex-col items-center justify-center gap-2 group hover:border-[#630ed4]/50 hover:bg-[#7c3aed]/5 transition-all active:scale-[0.99]"
              >
                <div className="w-10 h-10 rounded-full bg-[#ede5f4] flex items-center justify-center group-hover:bg-[#7c3aed]/20 transition-colors">
                  <Plus className="w-6 h-6 text-[#630ed4]" />
                </div>
                <span className="text-[14px] font-medium tracking-[0.02em] leading-none text-[#4a4455] group-hover:text-[#630ed4]">
                  Add Another Certification
                </span>
              </button>

              {/* AI Tip */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-[#d0e1fb]/20 rounded-[2rem] p-4 flex gap-4 items-start border border-[#d0e1fb]/30">
                  <div className="w-10 h-10 rounded-xl bg-[#d0e1fb] flex items-center justify-center shrink-0">
                    
                  </div>
                  <div>
                    <h4 className="text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#54647a]">
                      Aura Assistant Tip
                    </h4>
                    <p className="text-[16px] leading-[1.6] text-[#4a4455] mt-1">
                      Include certifications that are specifically mentioned in job descriptions for
                      your target roles to increase your resume relevance by up to 25%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#ccc3d8]/20 gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-[#4a4455] text-[14px] font-medium tracking-[0.02em] leading-none hover:bg-[#ede5f4] transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-[#630ed4] text-white rounded-full text-[14px] font-medium tracking-[0.02em] leading-none flex items-center justify-center gap-2 shadow-[0_8px_16px_-4px_rgba(99,14,212,0.3)] hover:bg-[#630ed4]/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Finish Resume"}
                  
                </button>
              </div>

              <footer className="text-center pb-8">
                <p className="text-[12px] font-semibold tracking-[0.05em] leading-none text-[#7b7487]">
                  Premium Resume Builder by Aura
                </p>
              </footer>
            </form>
          </div>
        </div>
      </main>

      {/* Background Decorations */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/4 -right-24 w-64 h-64 bg-[#ffb784]/20 rounded-full blur-[80px] pointer-events-none -z-10"></div>

      <style jsx>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
        .input-focus-ring:focus {
          outline: none;
          box-shadow: 0 0 0 2px #630ed4, 0 0 0 4px rgba(99, 14, 212, 0.1);
        }
      `}</style>
    </div>
  );
}