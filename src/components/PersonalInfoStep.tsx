"use client";

import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  Link,
  Briefcase,
  Settings,
  Bell,
  Sparkles,
  Code,
  RefreshCw,
} from "lucide-react";

interface Props {
  resumeId: string | null;
  onNext: () => void;
}

interface PersonalInfoForm {
  fullname: string;
  title: string;
  email: string;
  mobile: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoStep({ resumeId, onNext }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PersonalInfoForm>();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      reset(data.data.personalInfo || {});
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: PersonalInfoForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        personalInfo: values,
      });
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky Navigation (TopAppBar) */}
      <header className="w-full top-0 sticky z-50 bg-white border-b border-slate-100">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-[#630ed4]">Aura AI</span>
            <nav className="hidden md:flex items-center gap-6">
              <a
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-sm text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1"
                href="#"
              >
                Resumes
              </a>
              <a
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
                href="#"
              >
                Templates
              </a>
              <a
                className="text-sm text-slate-500 hover:text-[#630ed4] transition-colors duration-200"
                href="#"
              >
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Bell size={22} />
            </button>
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
              <Settings size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#7c3aed]/10 flex items-center justify-center text-[#630ed4] font-bold text-xs">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col items-center">
        {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-500">
              Step 1 of 8
            </span>
            <span className="text-sm font-medium text-[#630ed4] font-bold">
              12% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#630ed4] transition-all duration-700 ease-out"
              style={{ width: "12%" }}
            ></div>
          </div>
        </div>

        {/* Main Form Card */}
        <section className="w-full max-w-3xl bg-white border border-slate-200 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="p-8 md:p-14">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl text-slate-950 mb-3 font-bold">
                Personal Information
              </h1>
              <p className="text-sm text-slate-500 max-w-lg mx-auto">
                Let's start with the basics. This information will appear at the
                top of your resume.
              </p>
            </div>

            {/* Form Content */}
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              id="personalInfoForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Full Name
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <User
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="Jane Doe"
                      required
                      type="text"
                      {...register("fullname")}
                    />
                  </div>
                </div>

                {/* Professional Title */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Professional Title
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Briefcase
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="Senior Product Designer"
                      required
                      type="text"
                      {...register("title")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Email Address
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Mail
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="jane.doe@example.com"
                      required
                      type="email"
                      {...register("email")}
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Mobile Number
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Phone
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="+1 (555) 000-0000"
                      required
                      type="tel"
                      {...register("mobile")}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Location
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <MapPin
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="San Francisco, CA"
                      required
                      type="text"
                      {...register("location")}
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    LinkedIn Profile
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Link
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="linkedin.com/in/janedoe"
                      type="url"
                      {...register("linkedIn")}
                    />
                  </div>
                </div>

                {/* GitHub - Using Code icon instead of Github */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    GitHub Profile
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Code
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="github.com/janedoe"
                      type="url"
                      {...register("github")}
                    />
                  </div>
                </div>

                {/* Portfolio */}
                <div className="space-y-2">
                  <label className="text-sm text-slate-900 font-semibold block ml-1">
                    Portfolio URL
                  </label>
                  <div className="group flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#630ed4] focus-within:bg-white transition-all">
                    <Globe
                      size={20}
                      className="text-slate-400 mr-3 group-focus-within:text-[#630ed4] transition-colors"
                    />
                    <input
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm outline-none"
                      placeholder="www.janedoe.design"
                      type="url"
                      {...register("portfolio")}
                    />
                  </div>
                </div>
              </div>

              {/* AI Tip */}
              <div className="bg-[#7c3aed]/5 rounded-[1.5rem] p-6 flex items-start gap-4 border border-[#630ed4]/10 mt-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles
                    size={24}
                    className="text-[#630ed4]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  />
                </div>
                <div>
                  <p className="text-sm text-[#630ed4] font-bold mb-1">
                    AI Pro-Tip
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete profiles with LinkedIn and Portfolio links see 40%
                    higher engagement from recruiters. Make sure your links are
                    active!
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                <button
                  className="text-sm text-slate-400 hover:text-slate-900 transition-colors py-2 px-4"
                  type="button"
                >
                  Save as Draft
                </button>
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#630ed4] hover:bg-[#7c3aed] text-white px-10 py-4 rounded-xl text-sm shadow-lg shadow-[#630ed4]/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? "Saving Details..." : "Continue to Work History"}
                  </span>
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
            </form>
          </div>
        </section>

        {/* Sidebar Floating Preview Hint */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-medium">
            Premium Resume Builder by Aura
          </p>
        </div>
      </main>

      <footer className="h-20"></footer>
    </div>
  );
}