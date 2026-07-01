"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Eye,
  Download,
  Sparkles,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  User,
  Zap,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Share2,
  Code,
  FolderOpen,
  Verified,
  ExternalLink,
} from "lucide-react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Resume {
  title: string;
  summary: string;
  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    linkedIn: string;
    github: string;
    portfolio: string;
  };
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  achievements: string[];
  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];
  workExperience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [atsResult, setAtsResult] = useState<any>(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { resumeId } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchResume();

    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);
      setResume(data.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAtsScore = async () => {
    if (!resume) return;

    try {
      setAtsLoading(true);

      const resumeText = `
        Name: ${resume.personalInfo?.fullname || ""}
        Summary: ${resume.summary || ""}
        Skills: ${resume.skills?.join(", ") || ""}
        Work Experience: ${resume.workExperience
          ?.map(
            (exp) => `
              Role: ${exp.role}
              Company: ${exp.company}
              Description: ${exp.description}
            `
          )
          .join("\n")}
        Projects: ${resume.projects
          ?.map(
            (project) => `
              Title: ${project.title}
              Description: ${project.description}
              Tech Stack: ${project.techStack?.join(", ")}
            `
          )
          .join("\n")}
        Education: ${resume.education
          ?.map(
            (edu) => `
              Degree: ${edu.degree}
              Institute: ${edu.institute}
            `
          )
          .join("\n")}
      `;

      const { data } = await axios.post("/api/ai/ats-score", {
        resumeText,
      });

      setAtsResult(data.data.AtsScore);
    } catch (error) {
      console.error("Error getting ATS score:", error);
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-[#630ed4] font-medium animate-pulse">
          Loading Resume...
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="text-red-500 font-medium">Resume not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#1d1a24]">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:flex lg:gap-6 pt-20 sm:pt-20">
        {/* Left Column: Sticky Action Panel */}
        <aside className="lg:w-1/3 xl:w-1/4 mb-6 lg:mb-0">
          <div className="lg:sticky lg:top-24 space-y-3 sm:space-y-4">
            {/* Core Actions */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-[10px] sm:text-xs text-[#7b7487] uppercase tracking-wider mb-4 sm:mb-6 font-medium">
                Quick Actions
              </h3>
              <div className="space-y-2.5 sm:space-y-3">
                <button
                  onClick={handleAtsScore}
                  disabled={atsLoading}
                  className="w-full flex items-center justify-between bg-[#630ed4] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold hover:bg-[#7c3aed] hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <Sparkles
                      size={16}
                      className="sm:size-[18px]"
                    />
                    {atsLoading ? "Checking..." : "ATS Score"}
                  </span>
                  <ChevronRight size={16} className="sm:size-[18px]" />
                </button>

                <PDFDownloadLink
                  document={<ResumePDF resume={resume} />}
                  fileName={`${resume.personalInfo?.fullname || "Resume"}.pdf`}
                >
                  {({ loading }) => (
                    <button className="w-full flex items-center justify-center sm:justify-start gap-2 sm:gap-3 border border-slate-200 text-[#4a4455] py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-medium hover:bg-slate-50 transition-all active:scale-95 bg-white disabled:opacity-50 text-sm sm:text-base">
                      <Download size={16} className="sm:size-[18px]" />
                      {loading ? "Generating..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>

                <button
                  onClick={() => router.push(`/resume/${resumeId}`)}
                  className="w-full flex items-center justify-center sm:justify-start gap-2 sm:gap-3 border border-slate-200 text-[#4a4455] py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-medium hover:bg-slate-50 transition-all active:scale-95 bg-white text-sm sm:text-base"
                >
                  <Eye size={16} className="sm:size-[18px]" />
                  Edit Resume
                </button>
              </div>
            </div>

            {/* ATS Score Card */}
            {atsResult && (
              <div className="bg-white p-5 sm:p-8 shadow-sm border border-slate-100 relative overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-4 sm:mb-8">
                  <h3 className="font-bold text-lg sm:text-xl text-[#1d1a24]">
                    ATS Score
                  </h3>
                  <span
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                      atsResult.atsScore >= 80
                        ? "bg-emerald-100 text-emerald-700"
                        : atsResult.atsScore >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {atsResult.atsScore >= 80
                      ? "Excellent"
                      : atsResult.atsScore >= 60
                      ? "Good"
                      : "Needs Work"}
                  </span>
                </div>
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-slate-100"
                        cx="50%"
                        cy="50%"
                        fill="transparent"
                        r="45%"
                        stroke="currentColor"
                        strokeWidth="10"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle
                        className="text-emerald-500 transition-all duration-1000"
                        cx="50%"
                        cy="50%"
                        fill="transparent"
                        r="45%"
                        stroke="currentColor"
                        strokeDasharray="282.74"
                        strokeDashoffset={
                          282.74 - (282.74 * (atsResult.atsScore || 0)) / 100
                        }
                        strokeLinecap="round"
                        strokeWidth="10"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <span className="absolute text-2xl sm:text-4xl font-extrabold text-[#1d1a24]">
                      {atsResult.atsScore || 0}
                    </span>
                  </div>
                  <p className="text-[#4a4455] text-center mt-4 sm:mt-6 text-xs sm:text-sm px-2">
                    {atsResult.summary ||
                      "Optimized for high-volume recruitment systems."}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 mb-3 sm:mb-4">
                  <p className="text-[10px] sm:text-xs font-bold text-[#7b7487] uppercase tracking-tight mb-1">
                    Top Strength
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[#1d1a24]">
                    {atsResult.strengths?.[0] ||
                      "Strong keyword density in Skills section."}
                  </p>
                </div>
                <button className="w-full text-[#630ed4] font-bold text-xs sm:text-sm hover:underline">
                  View Full Analysis
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Resume Preview */}
        <section className="lg:w-2/3 xl:w-3/4 flex flex-col items-center">
          {/* A4 Wrapper */}
          <div className="resume-paper bg-white shadow-xl border border-slate-100 overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 flex flex-col gap-6 sm:gap-8 md:gap-10">
            {/* 1. Personal Info */}
            <header>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1d1a24] mb-1 sm:mb-2">
                    {resume.personalInfo?.fullname || "Alex Sterling"}
                  </h1>
                  <p className="text-[#630ed4] font-bold text-base sm:text-lg md:text-xl tracking-tight">
                    Senior Product Designer &amp; Systems Architect
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 border-t border-slate-100">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <Mail size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.email || "alex.sterling@aura.career"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <Phone size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.mobile || "+1 (555) 234-8901"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <MapPin size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.location || "San Francisco, CA"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <LinkIcon size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.portfolio || "portfolio.alexs.design"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <Share2 size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.linkedIn ||
                      "linkedin.com/in/asterling"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[#4a4455]">
                  <Code size={14} className="sm:size-[18px] text-[#630ed4] flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm truncate">
                    {resume.personalInfo?.github || "github.com/asterling"}
                  </span>
                </div>
              </div>
            </header>

            {/* 2. Professional Summary */}
            {resume.summary && (
              <section>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <User size={16} className="sm:size-[18px] text-[#630ed4]" />
                  <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                    Professional Summary
                  </h2>
                </div>
                <p className="text-[#4a4455] leading-relaxed text-xs sm:text-sm md:text-base">
                  {resume.summary}
                </p>
              </section>
            )}

            {/* 3. Skills */}
            {resume.skills && resume.skills.length > 0 && (
              <section>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Zap size={16} className="sm:size-[18px] text-[#630ed4]" />
                  <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                    Expertise &amp; Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {resume.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 sm:px-5 py-1 sm:py-2 bg-[#7c3aed]/10 text-[#630ed4] font-semibold rounded-full text-[10px] sm:text-xs border border-[#7c3aed]/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Work Experience */}
            {resume.workExperience && resume.workExperience.length > 0 && (
              <section>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Briefcase size={16} className="sm:size-[18px] text-[#630ed4]" />
                  <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                    Work Experience
                  </h2>
                </div>
                <div className="space-y-6 sm:space-y-10 relative before:absolute before:left-[9px] sm:before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-100">
                  {resume.workExperience.map((exp, index) => (
                    <div key={index} className="relative pl-8 sm:pl-10">
                      <div
                        className={`absolute left-0 top-1.5 w-[19px] h-[19px] sm:w-[23px] sm:h-[23px] rounded-full border-4 border-white shadow-sm ${
                          index === 0 ? "bg-[#630ed4]" : "bg-slate-200"
                        }`}
                      />
                      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start mb-1">
                        <h3 className="font-bold text-base sm:text-lg text-[#1d1a24]">
                          {exp.role}
                        </h3>
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            index === 0 ? "text-[#630ed4]" : "text-[#7b7487]"
                          }`}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-[#4a4455] font-semibold text-sm sm:text-base mb-2 sm:mb-4">
                        {exp.company}
                      </p>
                      <ul className="text-xs sm:text-sm text-[#4a4455] space-y-2 sm:space-y-3 list-disc list-outside ml-4">
                        {exp.description
                          ?.split("\n")
                          .map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <section>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <FolderOpen size={16} className="sm:size-[18px] text-[#630ed4]" />
                  <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                    Featured Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {resume.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#630ed4]/20 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <h3 className="font-bold text-sm sm:text-base text-[#1d1a24]">
                          {project.title}
                        </h3>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#630ed4] hover:text-[#7c3aed] transition-colors"
                          >
                            <ExternalLink size={16} className="sm:size-[18px]" />
                          </a>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#4a4455] mb-3 sm:mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.techStack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white text-[8px] sm:text-[10px] font-bold rounded-lg border border-slate-200 uppercase text-[#4a4455]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Education */}
            {resume.education && resume.education.length > 0 && (
              <section>
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <GraduationCap size={16} className="sm:size-[18px] text-[#630ed4]" />
                  <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                    Education
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-[9px] sm:before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-100">
                  {resume.education.map((edu, index) => (
                    <div key={index} className="relative pl-8 sm:pl-10">
                      <div
                        className={`absolute left-0 top-1.5 w-[19px] h-[19px] sm:w-[23px] sm:h-[23px] rounded-full border-4 border-white shadow-sm ${
                          index === 0 ? "bg-[#630ed4]" : "bg-slate-200"
                        }`}
                      />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-[#1d1a24]">
                            {edu.degree}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#4a4455]">
                            {edu.institute}
                          </p>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#630ed4]">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Achievements & 8. Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 pt-4 border-t border-slate-100">
              {resume.achievements && resume.achievements.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Award size={16} className="sm:size-[18px] text-[#630ed4]" />
                    <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                      Achievements
                    </h2>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {resume.achievements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle
                          size={16}
                          className="sm:size-[20px] text-emerald-500 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs sm:text-sm text-[#4a4455] font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {resume.certifications && resume.certifications.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Verified size={16} className="sm:size-[18px] text-[#630ed4]" />
                    <h2 className="font-bold text-[10px] sm:text-sm uppercase tracking-widest text-[#4a4455]">
                      Certifications
                    </h2>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {resume.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <Verified
                          size={16}
                          className="sm:size-[20px] text-[#7c3aed] flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#1d1a24]">
                            {cert}
                          </p>
                          <p className="text-[9px] sm:text-[11px] text-[#7b7487]">
                            Issued {new Date().getFullYear() - 2}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Detailed ATS Analysis Cards */}
          {atsResult && (
            <div className="w-full max-w-[850px] mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-8 sm:pb-16">
              {atsResult.strengths && atsResult.strengths.length > 0 && (
                <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-[#1d1a24]">
                    <TrendingUp size={18} className="sm:size-[20px] text-emerald-500" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-3 sm:space-y-5">
                    {atsResult.strengths.map((item: string, index: number) => (
                      <li key={index} className="flex gap-3 sm:gap-4 items-start">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-[#4a4455] leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {atsResult.recommendations &&
                atsResult.recommendations.length > 0 && (
                  <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-[#1d1a24]">
                      <Lightbulb size={18} className="sm:size-[20px] text-amber-500" />
                      Recommendations
                    </h4>
                    <ul className="space-y-3 sm:space-y-5">
                      {atsResult.recommendations.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex gap-3 sm:gap-4 items-start">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-[#4a4455] leading-relaxed">
                              {item}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .resume-paper {
          width: 100%;
          max-width: 850px;
          min-height: 1100px;
        }
        @media (max-width: 640px) {
          .resume-paper {
            min-height: auto;
            padding: 1rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .resume-paper {
            min-height: auto;
            padding: 1.5rem !important;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}