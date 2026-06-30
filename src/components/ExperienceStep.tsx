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
  Bell,
  Briefcase,
  Building,
  Calendar,
  Badge,
  List,
  ChevronDown,
} from "lucide-react";

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
    <div className="min-h-screen bg-[#fef7ff] text-[#1d1a24]">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles
              size={28}
              className="text-[#630ed4]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            />
            <span className="text-xl font-bold text-[#630ed4]">Aura AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-[#4a4455] text-sm hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1 text-sm"
              href="#"
            >
              Resumes
            </a>
            <a
              className="text-[#4a4455] text-sm hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Templates
            </a>
            <a
              className="text-[#4a4455] text-sm hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Analytics
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-[#4a4455] hover:text-[#630ed4] transition-colors cursor-pointer">
              <Bell size={22} />
            </button>
            <div className="h-8 w-8 rounded-full bg-[#7c3aed]/20 overflow-hidden border border-[#630ed4]/10">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp--2nCZVE3mMVFFVwFTleF90o0toi3_Cb_CGARLEtK8c8OG33RjPjQ8DExD7xUE8CF5fTIxRd-ewHzHMvem5yZxaGpLUagSGiO4P2HII1R-iWPUwtmHNEkJ16F5OvaaJzZtsO83dLK630bPmKuNGOnOnAuRHeAV9xHlGXmkXAORFQE__uDK2e0KJ7XywTBb5ZYMmdYOzKH1QJ4lbhvByAPZe5XlecfxscMyqwoQtjZsz1NgUoULmkt89AsLhDwQyFw89GzTpH-Xg"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-0 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[#630ed4] text-xs uppercase tracking-widest mb-1">
                Step 6 of 8
              </p>
              <h1 className="text-3xl text-[#1d1a24]">Work Experience</h1>
            </div>
            <div className="text-right">
              <span className="text-sm text-[#4a4455]">72% Complete</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[72%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
          </div>
        </div>

        {/* Main Experience Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#ccc3d8]/30 p-8 md:p-12">
          {/* Context & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="max-w-md">
              <h2 className="text-xl text-[#1d1a24] mb-2 font-semibold">
                Professional Journey
              </h2>
              <p className="text-sm text-[#505f76]">
                Detail your career history to help Aura AI tailor your profile
                for your next dream role.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
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
                className="flex items-center gap-2 bg-[#630ed4] text-white px-6 py-3 rounded-full text-sm hover:shadow-lg hover:shadow-[#630ed4]/20 active:scale-95 transition-all"
              >
                <Plus size={20} />
                Add Experience
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-[#d2bbff]/20 text-[#630ed4] px-6 py-3 rounded-full text-sm hover:bg-[#d2bbff]/30 transition-all"
              >
                <Sparkles
                  size={20}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                />
                AI Optimizer
              </button>
            </div>
          </div>

          {/* Experience Form Entries */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-[#f9f1ff] rounded-[2.5rem] p-6 md:p-10 border border-[#ccc3d8]/20 relative group"
              >
                {/* Delete Button */}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#ba1a1a] hover:bg-[#ffdad6]/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="text-sm text-[#4a4455] flex items-center gap-2 ml-2">
                      <Briefcase size={18} />
                      Job Title
                    </label>
                    <input
                      {...register(`experience.${index}.role`)}
                      className="w-full h-14 bg-white border border-[#ccc3d8] rounded-2xl px-6 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all placeholder:text-[#7b7487]"
                      placeholder="e.g. Senior Product Designer"
                      type="text"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-sm text-[#4a4455] flex items-center gap-2 ml-2">
                      <Building size={18} />
                      Company Name
                    </label>
                    <input
                      {...register(`experience.${index}.company`)}
                      className="w-full h-14 bg-white border border-[#ccc3d8] rounded-2xl px-6 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all placeholder:text-[#7b7487]"
                      placeholder="e.g. TechFlow Global"
                      type="text"
                    />
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-2 gap-4 col-span-full">
                    <div className="space-y-2">
                      <label className="text-sm text-[#4a4455] flex items-center gap-2 ml-2">
                        <Calendar size={18} />
                        Start Date
                      </label>
                      <input
                        {...register(`experience.${index}.startDate`)}
                        className="w-full h-14 bg-white border border-[#ccc3d8] rounded-2xl px-4 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all"
                        type="month"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-[#4a4455] flex items-center gap-2 ml-2">
                        <Calendar size={18} />
                        End Date
                      </label>
                      <input
                        {...register(`experience.${index}.endDate`)}
                        disabled={watch(`experience.${index}.currentlyWorking`)}
                        className="w-full h-14 bg-white border border-[#ccc3d8] rounded-2xl px-4 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        type="month"
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="space-y-2 col-span-full">
                    <label className="text-sm text-[#4a4455] flex items-center gap-2 ml-2">
                      <Badge size={18} />
                      Employment Type
                    </label>
                    <div className="relative">
                      <select
                        {...register(`experience.${index}.employmentType`)}
                        className="w-full h-14 bg-white border border-[#ccc3d8] rounded-2xl px-6 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                      <ChevronDown
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#7b7487]"
                      />
                    </div>
                  </div>

                  {/* Currently Working Checkbox */}
                  <div className="space-y-2 col-span-full">
                    <label className="flex items-center gap-3 ml-2 text-sm text-[#4a4455]">
                      <input
                        type="checkbox"
                        {...register(`experience.${index}.currentlyWorking`)}
                        className="w-4 h-4 accent-[#630ed4]"
                      />
                      Currently Working Here
                    </label>
                  </div>

                  {/* Description (Full Width) */}
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex justify-between items-center ml-2">
                      <label className="text-sm text-[#4a4455] flex items-center gap-2">
                        <List size={18} />
                        Job Description &amp; Achievements
                      </label>
                      <button
                        type="button"
                        onClick={() => generateDescription(index)}
                        className="text-[#630ed4] text-xs flex items-center gap-1 hover:underline"
                      >
                        <Sparkles
                          size={14}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        />
                        Generate with AI
                      </button>
                    </div>
                    <textarea
                      {...register(`experience.${index}.description`)}
                      className="w-full bg-white border border-[#ccc3d8] rounded-[2rem] p-6 text-sm focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] outline-none transition-all placeholder:text-[#7b7487] resize-none"
                      placeholder="Led the redesign of the core dashboard, resulting in a 25% increase in user retention..."
                      rows={5}
                    ></textarea>
                    <p className="text-[#7b7487] text-[12px] ml-4">
                      Pro Tip: Focus on quantifiable impact and specific tools
                      used.
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Ghost Item for UX */}
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
              className="border-2 border-dashed border-[#ccc3d8]/40 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all w-full"
            >
              <div className="h-12 w-12 rounded-full bg-[#e8dfee] flex items-center justify-center mb-3 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                <Plus size={24} />
              </div>
              <p className="text-sm text-[#4a4455] group-hover:text-[#630ed4] transition-colors">
                Add another role
              </p>
            </button>

            {/* Step Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-[#ccc3d8]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-10 py-4 border-2 border-[#ccc3d8] text-[#4a4455] rounded-[2rem] text-sm hover:bg-[#ede5f4] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  className="px-8 py-4 text-[#4a4455] text-sm hover:text-[#630ed4] transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-[#630ed4] text-white rounded-[2rem] text-sm shadow-xl shadow-[#630ed4]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Continue"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Branding Footer */}
        <footer className="mt-8 text-center">
          <p className="text-[#7b7487] text-xs tracking-wide">
            PREMIUM RESUME BUILDER BY{" "}
            <span className="text-[#630ed4] font-bold">AURA AI</span>
          </p>
          <div className="mt-4 flex justify-center gap-6 text-[#7b7487] text-[13px]">
            <a className="hover:text-[#630ed4] transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-[#630ed4] transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-[#630ed4] transition-colors" href="#">
              Support Center
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}