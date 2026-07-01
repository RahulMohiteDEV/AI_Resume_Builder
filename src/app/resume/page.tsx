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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    if (confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResumeApi(resumeId);
        fetchResumes();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getExperienceColor = (level: string) => {
    const colors: Record<string, string> = {
      Fresher: "bg-emerald-50 text-emerald-700",
      Junior: "bg-blue-50 text-blue-700",
      "Mid-Level": "bg-amber-50 text-amber-700",
      Senior: "bg-violet-50 text-violet-700",
      Expert: "bg-rose-50 text-rose-700",
      Lead: "bg-indigo-50 text-indigo-700",
      Executive: "bg-purple-50 text-purple-700",
    };
    return colors[level] || "bg-slate-50 text-slate-700";
  };

  return (
    <div className="flex min-h-screen bg-[#fcfaff] font-sans antialiased overflow-x-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Side Navigation - Mobile Slide */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[280px] bg-[#f9f1ff] border-r border-[#ccc3d8]/30 py-8 px-4 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:flex-col md:w-64`}
      >
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
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

        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-[#4a4455] p-2 hover:bg-[#ede5f4] rounded-lg"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={20} />
        </button>

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

        <div className="mt-auto space-y-4 pt-6 border-t border-[#ccc3d8]/20">
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
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 text-[#4a4455] hover:bg-[#f9f1ff] rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <div className="relative hidden sm:block">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7487]"
                />
                <input
                  className="bg-[#f9f1ff] border-none rounded-full pl-10 pr-4 py-2 text-sm w-48 sm:w-56 lg:w-64 focus:ring-2 focus:ring-[#7c3aed]/20 transition-all outline-none"
                  placeholder="Search resumes..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-6">
              <nav className="hidden lg:flex items-center gap-6">
                <button
                  onClick={() => router.push("/resume")}
                  className="text-sm text-slate-500 hover:text-violet-700 transition-colors"
                >
                  Dashboard
                </button>
                <a
                  className="text-[#630ed4] font-bold border-b-2 border-[#630ed4] pb-1 text-sm font-medium"
                  href="#"
                >
                  Resumes
                </a>
                <button
                  onClick={() => alert("Templates page is coming soon!")}
                  className="text-sm text-slate-500 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  Templates
                </button>
              </nav>
              <div className="h-6 w-[1px] bg-[#ccc3d8]/30 hidden lg:block"></div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="p-2 text-[#4a4455] hover:bg-[#f9f1ff] rounded-full transition-colors relative">
                  <Bell size={20} className="sm:size-[22px]" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
                </button>
                
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="flex-1 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 md:px-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1200px] mx-auto space-y-8 sm:space-y-12">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <span className="inline-flex items-center px-3 py-1 bg-[#7c3aed]/10 text-[#630ed4] text-[10px] font-bold rounded-full uppercase tracking-[0.1em]">
                  AI Resume Builder
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1d1a24] font-extrabold tracking-tight leading-tight">
                  My Resumes
                </h2>
                <p className="text-[#4a4455] text-base sm:text-lg max-w-lg leading-relaxed">
                  Manage, edit and optimize your career documents with our
                  premium AI-driven suite.
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 sm:gap-3 bg-[#630ed4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-violet-700 active:scale-95 transition-all shadow-xl shadow-violet-200 group text-sm sm:text-base"
              >
                <Plus
                  size={18}
                  className="sm:size-[22px] transition-transform group-hover:rotate-90"
                />
                <span>Create New Resume</span>
              </button>
            </div>

            {/* Filter / Stats Bar */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center border-b border-[#ccc3d8]/10 pb-4 sm:pb-6">
              <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200 overflow-x-auto w-full sm:w-auto">
                <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-[#630ed4] font-bold rounded-xl text-xs shadow-sm whitespace-nowrap">
                  All
                </button>
                <button className="px-4 sm:px-6 py-1.5 sm:py-2 text-[#4a4455] hover:text-[#630ed4] rounded-xl text-xs font-semibold transition-colors whitespace-nowrap">
                  Recent
                </button>
                <button className="px-4 sm:px-6 py-1.5 sm:py-2 text-[#4a4455] hover:text-[#630ed4] rounded-xl text-xs font-semibold transition-colors whitespace-nowrap">
                  Drafts
                </button>
              </div>
              <div className="text-[#4a4455] text-sm font-medium ml-auto">
                Total:{" "}
                <span className="font-bold text-[#1d1a24]">
                  {resumes.length}
                </span>
              </div>
            </div>

            {/* Resume Grid */}
            {!loading && resumes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="group bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 hover:border-violet-200 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-100 cursor-pointer relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(resume._id);
                      }}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#7b7487] hover:text-[#ba1a1a] transition-all opacity-0 group-hover:opacity-100 bg-slate-50 rounded-full hover:bg-[#ffdad6]/10"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-[#630ed4] mb-6 sm:mb-8 transition-colors group-hover:bg-[#630ed4] group-hover:text-white"
                      onClick={() => router.push(`/resume/${resume._id}`)}
                    >
                      <Eye size={24} className="sm:size-[28px]" />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl text-[#1d1a24] font-bold mb-2 sm:mb-3 leading-tight group-hover:text-[#630ed4] transition-colors"
                      onClick={() => router.push(`/resume/${resume._id}`)}
                    >
                      {resume.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[#4a4455] mb-4 sm:mb-8">
                      <Briefcase size={18} className="opacity-50 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {resume.jobTitle}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
                      <span
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 border border-slate-100 text-[10px] font-bold rounded-lg uppercase tracking-wider ${getExperienceColor(
                          resume.experienceLevel
                        )}`}
                      >
                        {resume.experienceLevel}
                      </span>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-50 border border-slate-100 text-[#4a4455] text-[10px] font-bold rounded-lg uppercase tracking-wider">
                        Modern
                      </span>
                    </div>
                    <div className="pt-4 sm:pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-[#7b7487] font-medium truncate">
                        Updated {resume.updatedAt || "recently"}
                      </span>
                      <button
                        onClick={() => router.push(`/resume/${resume._id}`)}
                        className="p-2 px-4 sm:px-6 bg-slate-50 rounded-xl text-xs font-bold text-[#1d1a24] transition-all group-hover:bg-[#630ed4] group-hover:text-white hover:shadow-lg hover:shadow-primary/20"
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
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24 text-center bg-white rounded-[2.5rem] border border-slate-200 relative overflow-hidden group shadow-sm px-4">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"></div>
                <div className="relative mb-8 sm:mb-10">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-full flex items-center justify-center">
                    <FileText size={48} className="sm:size-[60px] text-slate-200" />
                 </div>
                </div>
                <h3 className="text-2xl sm:text-3xl text-[#1d1a24] font-extrabold mb-3 sm:mb-4">
                  Your career journey starts here
                </h3>
                <p className="text-[#4a4455] text-sm sm:text-base max-w-sm mx-auto font-medium opacity-80 leading-relaxed">
                  Build your first professional resume optimized for modern AI
                  scanners and top recruiters.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-8 sm:mt-10 bg-slate-950 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm sm:text-base"
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
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
    <div
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setShowModal(false)}
    ></div>
    <div className="relative w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-lg bg-white rounded-[1.75rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 transform transition-all duration-300 overflow-y-auto max-h-[90vh] sm:max-h-[85vh]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7c3aed] via-violet-400 to-[#7c3aed]"></div>
      
      <div className="flex justify-between items-start gap-3 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1d1a24] tracking-tight">
            New Resume
          </h2>
          <p className="text-xs sm:text-sm text-[#4a4455] mt-0.5 sm:mt-1 truncate">
            Tell us about the role you're targeting.
          </p>
        </div>
        <button
          className="flex-shrink-0 p-1.5 sm:p-2 md:p-3 text-[#7b7487] hover:text-[#1d1a24] transition-colors bg-slate-50 rounded-full hover:bg-slate-100"
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
        >
          <X size={18} className="sm:size-[20px] md:size-[24px]" />
        </button>
      </div>

      <form
        className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateResume();
        }}
      >
        {/* Resume Title */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
            Resume Title
          </label>
          <div className="relative group">
            <FileText
              size={16}
              className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors sm:size-[18px] md:size-[20px]"
            />
            <input
              className="w-full bg-slate-50 border border-slate-100 rounded-[1rem] sm:rounded-[1.125rem] md:rounded-[1.25rem] pl-9 sm:pl-11 md:pl-14 pr-3 sm:pr-4 md:pr-6 py-3 sm:py-4 md:py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all placeholder:text-slate-300 font-medium text-sm sm:text-base text-black"
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

        {/* Target Job Title */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
            Target Job Title
          </label>
          <div className="relative group">
            <Briefcase
              size={16}
              className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors sm:size-[18px] md:size-[20px]"
            />
            <input
              className="w-full bg-slate-50 border border-slate-100 rounded-[1rem] sm:rounded-[1.125rem] md:rounded-[1.25rem] pl-9 sm:pl-11 md:pl-14 pr-3 sm:pr-4 md:pr-6 py-3 sm:py-4 md:py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all placeholder:text-slate-300 font-medium text-sm sm:text-base text-black"
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

        {/* Experience Level */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-[10px] sm:text-xs font-bold text-[#4a4455] uppercase tracking-widest ml-1">
            Experience Level
          </label>
          <div className="relative group">
            <Sparkles
              size={16}
              className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#7b7487] group-focus-within:text-[#630ed4] transition-colors sm:size-[18px] md:size-[20px]"
            />
            <select
              className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-[1rem] sm:rounded-[1.125rem] md:rounded-[1.25rem] pl-9 sm:pl-11 md:pl-14 pr-8 sm:pr-10 md:pr-12 py-3 sm:py-4 md:py-5 focus:ring-4 focus:ring-[#7c3aed]/10 focus:border-[#630ed4] outline-none transition-all font-medium text-sm sm:text-base text-black"
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experienceLevel: e.target.value,
                })
              }
            >
              <option value="Entry" className="text-black">Entry Level</option>
              <option value="Junior" className="text-black">Junior</option>
              <option value="Mid" className="text-black">Mid-Level</option>
              <option value="Senior" className="text-black">Senior</option>
              <option value="Lead" className="text-black">Lead / Staff</option>
              <option value="Executive" className="text-black">Executive</option>
            </select>
            <ChevronRight
              size={16}
              className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 text-[#7b7487] pointer-events-none rotate-90 sm:size-[18px] md:size-[20px]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 md:gap-4">
          <button
            className="w-full sm:flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-[1rem] sm:rounded-[1.125rem] md:rounded-[1.25rem] font-bold text-[#4a4455] hover:bg-slate-100 transition-colors text-sm sm:text-base order-2 sm:order-1"
            onClick={() => setShowModal(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-full sm:flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 rounded-[1rem] sm:rounded-[1.125rem] md:rounded-[1.25rem] font-bold bg-[#630ed4] text-white hover:bg-violet-700 active:scale-95 transition-all shadow-xl shadow-violet-100 text-sm sm:text-base order-1 sm:order-2"
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[12px] border-t border-[#ccc3d8]/10 flex justify-around items-center h-16 sm:h-20 z-40 px-4">
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="/"
        >
          <LayoutDashboard size={22} className="sm:size-[24px]" />
          <span className="text-[9px] sm:text-[10px] font-bold mt-0.5">Home</span>
        </a>
        <a
          className="flex flex-col items-center text-[#630ed4] transition-colors"
          href="#"
        >
          <FileText size={22} className="sm:size-[24px]" style={{ fontVariationSettings: "'FILL' 1" }} />
          <span className="text-[9px] sm:text-[10px] font-bold mt-0.5">Resumes</span>
        </a>
        <div className="relative -top-6 sm:-top-10">
          <button
            className="w-14 h-14 sm:w-16 sm:h-16 bg-[#630ed4] rounded-2xl sm:rounded-3xl text-white flex items-center justify-center shadow-2xl shadow-[#630ed4]/40 active:scale-90 transition-transform"
            onClick={() => setShowModal(true)}
          >
            <Plus size={28} className="sm:size-[32px] font-bold" />
          </button>
        </div>
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="#"
        >
          <Briefcase size={22} className="sm:size-[24px]" />
          <span className="text-[9px] sm:text-[10px] font-bold mt-0.5">Jobs</span>
        </a>
        <a
          className="flex flex-col items-center text-[#7b7487] transition-colors"
          href="#"
        >
          <User size={22} className="sm:size-[24px]" />
          <span className="text-[9px] sm:text-[10px] font-bold mt-0.5">Me</span>
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