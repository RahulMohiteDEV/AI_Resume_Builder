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
import Navbar from "./Navbar";

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
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 pt-10">
        <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-10">
           {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[#630ed4] text-xs uppercase tracking-widest mb-1">
                Step 1 of 8
              </p>
              <h1 className="text-3xl text-[#1d1a24]">Personal Information</h1>
            </div>
            <div className="text-right">
              <span className="text-sm text-[#4a4455]">12% Complete</span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-[#e8dfee] rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#630ed4] to-[#7c3aed] h-full w-[12%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"></div>
          </div>
        </div>

          {/* Main Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900">
                  Personal Information
                </h1>
                <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                  Let's start with the basics. This information will appear at
                  the top of your resume and help recruiters contact you.
                </p>
              </div>

              <form
                id="personalInfoForm"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
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

                  {/* GitHub */}
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
                      {isSubmitting ? "Saving Details..." : "Continue"}
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
          </div>

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