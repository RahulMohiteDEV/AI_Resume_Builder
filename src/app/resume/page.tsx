"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Plus,
  FileText,
  Trash2,
  Briefcase,
  Search,
  X,
  ChevronRight,
  LayoutDashboard,
  Mail,
  Sparkles,
  HelpCircle,
  LogOut,
  Bell,
  User,
  Menu,
  Eye,
} from "lucide-react";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
  updatedAt?: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Senior",
  });

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();
      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });

      const resumeId = response.data._id;
      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);
      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  const getExperienceColor = (level: string) => {
    const colors: Record<string, string> = {
      Fresher: "bg-emerald-50 text-emerald-700",
      Junior: "bg-blue-50 text-blue-700",
      "Mid-Level": "bg-amber-50 text-amber-700",
      Senior: "bg-violet-50 text-violet-700",
      Expert: "bg-rose-50 text-rose-700",
      "Lead": "bg-indigo-50 text-indigo-700",
      "Executive": "bg-purple-50 text-purple-700",
    };
    return colors[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="flex min-h-screen bg-[#fcfaff] font-sans antialiased overflow-x-hidden">
      {/* Side Navigation (Web) */}
      <aside className="hidden md:flex flex-col h-screen w-64 sticky top-0 left-0 bg-[#f9f1ff] border-r border-[#ccc3d8]/30 py-8 px-4 transition-all duration-300">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} style={{ fontVariationSettings: "'FILL' 1" }} />
          </div>
          <div>
            <h1 className="font-semibold text-xl font-bold text-[#630ed4]">
              Aura AI
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#4a4455] font-bold">
              Premium Suite
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 px-4 py-3 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all group"
            href="#"
          >
            <LayoutDashboard size={20} className="text-[#7b7487]" />
            <span>Overview</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-[#630ed4] bg-[#7c3aed]/10 font-bold rounded-xl transition-all border-r-4 border-[#630ed4]"
            href="#"
          >
            <FileText size={20} style={{ fontVariationSettings: "'FILL' 1" }} />
            <span>My Resumes</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all group"
            href="#"
          >
            <Mail size={20} className="text-[#7b7487]" />
            <span>Cover Letters</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all group"
            href="#"
          >
            <Briefcase size={20} className="text-[#7b7487]" />
            <span>Job Tracker</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all group"
            href="#"
          >
            <Sparkles size={20} className="text-[#7b7487]" />
            <span>AI Assistant</span>
          </a>
        </nav>
        <div className="mt-auto space-y-4 pt-6">
          <div className="bg-gradient-to-br from-[#7c3aed] to-[#630ed4] p-4 rounded-2xl text-white shadow-lg">
            <p className="font-bold text-sm mb-1">Upgrade to Pro</p>
            <p className="text-[11px] opacity-80 mb-3">
              Unlimited AI generation and premium templates.
            </p>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-xs font-bold transition-all">
              Go Premium
            </button>
          </div>
          <div className="space-y-1">
            <a
              className="flex items-center gap-3 px-4 py-2 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all"
              href="#"
            >
              <HelpCircle size={20} className="text-[#7b7487]" />
              <span>Help Center</span>
            </a>
            <a
              className="flex items-center gap-3 px-4 py-2 text-[#4a4455] text-sm font-medium hover:bg-[#ede5f4] rounded-xl transition-all"
              href="#"
            >
              <LogOut size={20} className="text-[#7b7487]" />
              <span>Log Out</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top App Bar */}
        <header className="w-full top-0 sticky z-30 bg-white/80 backdrop-blur-[12px] shadow-sm border-b border-[#ccc3d8]/10">
          <div className="flex justify-between items-center h-16 px-6 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 text-[#4a4455]">
                <Menu size={24} />
              </button>
              <div className="relative hidden sm:block">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7487]"
                />
                <input
                  className="bg-[#f9f1ff] border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-[#7c3aed]/20 transition-all outline-none"
                  placeholder="Search resumes..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-8">
                <a
                  className="text-[#4a4455] hover:text-[#630ed4] text-sm font-medium transition-colors"
                  href="#"
                >
                  Dashboard
                </a>
                <a
                  className="text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1 text-sm font-medium"
                  href="#"
                >
                  Resumes
                </a>
                <a
                  className="text-[#4a4455] hover:text-[#630ed4] text-sm font-medium transition-colors"
                  href="#"
                >
                  Templates
                </a>
                <a
                  className="text-[#4a4455] hover:text-[#630ed4] text-sm font-medium transition-colors"
                  href="#"
                >
                  Analytics
                </a>
              </div>
              <div className="h-6 w-[1px] bg-[#ccc3d8]/30 hidden lg:block"></div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-[#4a4455] hover:bg-[#f9f1ff] rounded-full transition-colors relative">
                  <Bell size={22} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 border border-[#630ed4]/10 overflow-hidden cursor-pointer active:scale-95 transition-transform">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu2UPuyh9sxFqUZdOPwdPidXTUFmCY_KAwwUH2pXuN9v8gggvczQntIDwOAkQl31IIRsNQ67m47umIU7bpxWarFZpLoM2_-_tVPyoQch3t7kdLu877Bkn45J4IHyxcKNnsPT8vG_08yIR1dyhgQixpWI_lfM5MHGrrWrT9uE-OEazGS9bem7wcn-rhC8nqdyxsSJ6jTZd11nOPwRS2aRcX9lpwGObxBEz7XtTIWckZlg4Lj9gigNKvtRTVXaHywCh4ciNNFSs1L8s"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="flex-1 py-12 lg:py-20 px-6 md:px-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1200px] mx-auto space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-3">
                <span className="inline-flex items-center px-3 py-1 bg-[#7c3aed]/10 text-[#630ed4] text-[10px] font-bold rounded-full uppercase tracking-[0.1em]">
                  AI Resume Builder
                </span>
                <h2 className="text-4xl lg:text-5xl text-[#1d1a24] font-extrabold tracking-tight leading-tight">
                  My Resumes
                </h2>
                <p className="text-[#4a4455] text-lg max-w-lg leading-relaxed">
                  Manage, edit and optimize your career documents with our
                  premium AI-driven suite.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-3 bg-[#630ed4] text-white px-8 py-4 rounded-2xl font-bold hover:bg-violet-700 active:scale-95 transition-all shadow-xl shadow-violet-200 group"
              >
                <Plus
                  size={22}
                  className="transition-transform group-hover:rotate-90"
                />
                <span>Create New Resume</span>
              </button>
            </div>

            {/* Filter / Stats Bar */}
            <div className="flex flex-wrap gap-4 items-center border-b border-[#ccc3d8]/10 pb-6">
              <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200">
                <button className="px-6 py-2 bg-white text-[#630ed4] font-bold rounded-xl text-xs shadow-sm">
                  All
                </button>
                <button className="px-6 py-2 text-[#4a4455] hover:text-[#630ed4] rounded-xl text-xs font-semibold transition-colors">
                  Recent
                </button>
                <button className="px-6 py-2 text-[#4a4455] hover:text-[#630ed4] rounded-xl text-xs font-semibold transition-colors">
                  Drafts
                </button>
              </div>
              <div className="text-[#4a4455] text-sm font-medium ml-auto">
                Total documents:{" "}
                <span className="font-bold text-[#1d1a24]">
                  {resumes.length}
                </span>
              </div>
            </div>

            {/* Resume Grid */}
            {!loading && resumes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="group bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-violet-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-100 cursor-pointer relative"
                  >
                    <button
                      onClick={() => handleDelete(resume._id)}
                      className="absolute top-6 right-6 p-2 text-[#7b7487] hover:text-[#ba1a1a] transition-all opacity-0 group-hover:opacity-100 bg-slate-50 rounded-full hover:bg-[#ffdad6]/10"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-[#630ed4] mb-8 transition-colors group-hover:bg-[#630ed4] group-hover:text-white">
                      <Eye size={28} style={{ fontVariationSettings: "'FILL' 0" }} />
                    </div>
                    <h3 className="text-2xl text-[#1d1a24] font-bold mb-3 leading-tight group-hover:text-[#630ed4] transition-colors">
                      {resume.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[#4a4455] mb-8">
                      <Briefcase size={18} className="opacity-50" />
                      <span className="text-sm font-medium">
                        {resume.jobTitle}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span
                        className={`px-4 py-1.5 border border-slate-100 text-[10px] font-bold rounded-lg uppercase tracking-wider ${getExperienceColor(
                          resume.experienceLevel
                        )}`}
                      >
                        {resume.experienceLevel} Level
                      </span>
                      <span className="px-4 py-1.5 bg-slate-50 border border-slate-100 text-[#4a4455] text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        Modern Template
                      </span>
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-[#7b7487] font-medium">
                        Updated {resume.updatedAt || "recently"}
                      </span>
                      <button
                        onClick={() => router.push(`/resume/${resume._id}`)}
                        className="p-2 px-6 bg-slate-50 rounded-xl text-xs font-bold text-[#1d1a24] transition-all group-hover:bg-[#630ed4] group-hover:text-white hover:shadow-lg hover:shadow-primary/20"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && resumes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] border border-slate-200 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"></div>
                <div className="relative mb-10">
                  <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center">
                    <FileText size={60} className="text-slate-200" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#630ed4] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#630ed4]/30 animate-bounce-subtle">
                    <Plus size={24} />
                  </div>
                </div>
                <h3 className="text-3xl text-[#1d1a24] font-extrabold mb-4">
                  Your career journey starts here
                </h3>
                <p className="text-[#4a4455] mt-2 max-w-sm mx-auto font-medium opacity-80 leading-relaxed">
                  Build your first professional resume optimized for modern AI
                  scanners and top recruiters.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-10 bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  Get Started Now
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Create Resume Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 transform transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7c3aed] via-violet-400 to-[#7c3aed]"></div>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-extrabold text-[#1d1a24] tracking-tight">
                  New Resume
                </h2>
                <p className="text-[#4a4455] text-sm mt-1">
                  Tell us about the role you're targeting.
                </p>
              </div>
              <button
                className="p-3 text-[#7b7487] hover:text-[#1d1a24] transition-colors bg-slate-50 rounded-full"
                onClick={() => setShowModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateResume();
              }}
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
                  Resume Title
                </label>
                <div className="relative group">
                  <FileText
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors"
                  />
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.25rem] pl-14 pr-6 py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all placeholder:text-slate-300 font-medium"
                    placeholder="e.g. Design Lead 2024"
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
                  Target Job Title
                </label>
                <div className="relative group">
                  <Briefcase
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors"
                  />
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-[1.25rem] pl-14 pr-6 py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all placeholder:text-slate-300 font-medium"
                    placeholder="e.g. Senior Software Engineer"
                    required
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jobTitle: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
                  Experience Level
                </label>
                <div className="relative group">
                  <Sparkles
                    size={20}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors"
                  />
                  <select
                    className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-[1.25rem] pl-14 pr-12 py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all font-medium"
                    value={formData.experienceLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLevel: e.target.value,
                      })
                    }
                  >
                    <option value="Entry">Entry Level</option>
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid-Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead / Staff</option>
                    <option value="Executive">Executive</option>
                  </select>
                  <ChevronRight
                    size={20}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none rotate-90"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button
                  className="flex-1 px-8 py-5 rounded-[1.25rem] font-bold text-[#4a4455] hover:bg-slate-100 transition-colors"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-8 py-5 rounded-[1.25rem] font-bold bg-[#630ed4] text-white hover:bg-violet-700 active:scale-95 transition-all shadow-xl shadow-violet-100"
                  type="submit"
                >
                  Generate Resume
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[12px] border-t border-[#ccc3d8]/10 flex justify-around items-center h-20 z-40 px-6">
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="#"
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold mt-1">Home</span>
        </a>
        <a
          className="flex flex-col items-center text-[#630ed4] transition-colors"
          href="#"
        >
          <FileText size={24} style={{ fontVariationSettings: "'FILL' 1" }} />
          <span className="text-[10px] font-bold mt-1">Resumes</span>
        </a>
        <div className="relative -top-10">
          <button
            className="w-16 h-16 bg-[#630ed4] rounded-3xl text-white flex items-center justify-center shadow-2xl shadow-[#630ed4]/40 active:scale-90 transition-transform"
            onClick={() => setShowModal(true)}
          >
            <Plus size={32} className="font-bold" />
          </button>
        </div>
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="#"
        >
          <Briefcase size={24} />
          <span className="text-[10px] font-bold mt-1">Jobs</span>
        </a>
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="#"
        >
          <User size={24} />
          <span className="text-[10px] font-bold mt-1">Me</span>
        </a>
      </nav>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc3d8;
          border-radius: 10px;
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}