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
     <Navbar/>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-8 lg:flex gap-6 pt-20">
        {/* Left Column: Sticky Action Panel */}
        <aside className="lg:w-1/4 mb-6 lg:mb-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Core Actions */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xs text-[#7b7487] uppercase tracking-wider mb-6 font-medium">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleAtsScore}
                  disabled={atsLoading}
                  className="w-full flex items-center justify-between bg-[#630ed4] text-white py-4 px-6 rounded-2xl font-bold hover:bg-[#7c3aed] hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles
                      size={18}
                      className={atsLoading ? "animate-spin" : "fill-current"}
                    />
                    {atsLoading ? "Checking..." : "ATS Score"}
                  </span>
                  <ChevronRight size={18} />
                </button>

                <PDFDownloadLink
                  document={<ResumePDF resume={resume} />}
                  fileName={`${resume.personalInfo?.fullname || "Resume"}.pdf`}
                >
                  {({ loading }) => (
                    <button className="w-full flex items-center gap-3 border border-slate-200 text-[#4a4455] py-4 px-6 rounded-2xl font-medium hover:bg-slate-50 transition-all active:scale-95 bg-white disabled:opacity-50">
                      <Download size={18} />
                      {loading ? "Generating..." : "Download PDF"}
                    </button>
                  )}
                </PDFDownloadLink>

                <button
                  onClick={() => router.push(`/resume/${resumeId}`)}
                  className="w-full flex items-center gap-3 border border-slate-200 text-[#4a4455] py-4 px-6 rounded-2xl font-medium hover:bg-slate-50 transition-all active:scale-95 bg-white"
                >
                  <Eye size={18} />
                  Edit Resume
                </button>
              </div>
            </div>

            {/* ATS Score Card */}
            {atsResult && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl text-[#1d1a24]">ATS Score</h3>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    {atsResult.atsScore >= 80
                      ? "Excellent"
                      : atsResult.atsScore >= 60
                      ? "Good"
                      : "Needs Work"}
                  </span>
                </div>
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        className="text-slate-100"
                        cx="72"
                        cy="72"
                        fill="transparent"
                        r="64"
                        stroke="currentColor"
                        strokeWidth="10"
                      />
                      <circle
                        className="text-emerald-500 transition-all duration-1000"
                        cx="72"
                        cy="72"
                        fill="transparent"
                        r="64"
                        stroke="currentColor"
                        strokeDasharray="402"
                        strokeDashoffset={
                          402 - (402 * (atsResult.atsScore || 0)) / 100
                        }
                        strokeLinecap="round"
                        strokeWidth="10"
                      />
                    </svg>
                    <span className="absolute text-4xl font-extrabold text-[#1d1a24]">
                      {atsResult.atsScore || 0}
                    </span>
                  </div>
                  <p className="text-[#4a4455] text-center mt-6 text-sm px-2">
                    {atsResult.summary ||
                      "Optimized for high-volume recruitment systems."}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                  <p className="text-xs font-bold text-[#7b7487] uppercase tracking-tight mb-1">
                    Top Strength
                  </p>
                  <p className="text-sm font-medium text-[#1d1a24]">
                    {atsResult.strengths?.[0] ||
                      "Strong keyword density in Skills section."}
                  </p>
                </div>
                <button className="w-full text-[#630ed4] font-bold text-sm hover:underline">
                  View Full Analysis
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Resume Preview */}
        <section className="lg:w-3/4 flex flex-col items-center">
          {/* A4 Wrapper */}
          <div className="resume-paper bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden p-10 md:p-16 flex flex-col gap-10">
            {/* 1. Personal Info */}
            <header>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-[#1d1a24] mb-2">
                    {resume.personalInfo?.fullname || "Alex Sterling"}
                  </h1>
                  <p className="text-[#630ed4] font-bold text-xl tracking-tight">
                    Senior Product Designer &amp; Systems Architect
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <Mail size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.email || "alex.sterling@aura.career"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <Phone size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.mobile || "+1 (555) 234-8901"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <MapPin size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.location || "San Francisco, CA"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <LinkIcon size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.portfolio || "portfolio.alexs.design"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <Share2 size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.linkedIn ||
                      "linkedin.com/in/asterling"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4a4455]">
                  <Code size={18} className="text-[#630ed4] flex-shrink-0" />
                  <span className="text-sm">
                    {resume.personalInfo?.github || "github.com/asterling"}
                  </span>
                </div>
              </div>
            </header>

            {/* 2. Professional Summary */}
            {resume.summary && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <User size={18} className="text-[#630ed4]" />
                  <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                    Professional Summary
                  </h2>
                </div>
                <p className="text-[#4a4455] leading-relaxed text-sm md:text-base">
                  {resume.summary}
                </p>
              </section>
            )}

            {/* 3. Skills */}
            {resume.skills && resume.skills.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={18} className="text-[#630ed4]" />
                  <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                    Expertise &amp; Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-5 py-2 bg-[#7c3aed]/10 text-[#630ed4] font-semibold rounded-full text-xs border border-[#7c3aed]/20"
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
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase size={18} className="text-[#630ed4]" />
                  <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                    Work Experience
                  </h2>
                </div>
                <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-100">
                  {resume.workExperience.map((exp, index) => (
                    <div key={index} className="relative pl-10">
                      <div
                        className={`absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-4 border-white shadow-sm ${
                          index === 0 ? "bg-[#630ed4]" : "bg-slate-200"
                        }`}
                      />
                      <div className="flex flex-wrap justify-between items-start mb-1">
                        <h3 className="font-bold text-lg text-[#1d1a24]">
                          {exp.role}
                        </h3>
                        <span
                          className={`text-sm font-bold ${
                            index === 0 ? "text-[#630ed4]" : "text-[#7b7487]"
                          }`}
                        >
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <p className="text-[#4a4455] font-semibold mb-4">
                        {exp.company}
                      </p>
                      <ul className="text-sm text-[#4a4455] space-y-3 list-disc list-outside ml-4">
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
                <div className="flex items-center gap-3 mb-6">
                  <FolderOpen size={18} className="text-[#630ed4]" />
                  <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                    Featured Projects
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resume.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#630ed4]/20 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-[#1d1a24]">
                          {project.title}
                        </h3>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#630ed4] hover:text-[#7c3aed] transition-colors"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-[#4a4455] mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white text-[10px] font-bold rounded-lg border border-slate-200 uppercase text-[#4a4455]"
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
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap size={18} className="text-[#630ed4]" />
                  <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                    Education
                  </h2>
                </div>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-100">
                  {resume.education.map((edu, index) => (
                    <div key={index} className="relative pl-10">
                      <div
                        className={`absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full border-4 border-white shadow-sm ${
                          index === 0 ? "bg-[#630ed4]" : "bg-slate-200"
                        }`}
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#1d1a24]">
                            {edu.degree}
                          </h3>
                          <p className="text-sm text-[#4a4455]">
                            {edu.institute}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#630ed4]">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Achievements & 8. Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4 border-t border-slate-100">
              {resume.achievements && resume.achievements.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Award size={18} className="text-[#630ed4]" />
                    <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                      Achievements
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {resume.achievements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={20}
                          className="text-emerald-500 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-[#4a4455] font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {resume.certifications && resume.certifications.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Verified size={18} className="text-[#630ed4]" />
                    <h2 className="font-bold text-sm uppercase tracking-widest text-[#4a4455]">
                      Certifications
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    {resume.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Verified
                          size={20}
                          className="text-[#7c3aed] flex-shrink-0 mt-0.5"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#1d1a24]">
                            {cert}
                          </p>
                          <p className="text-[11px] text-[#7b7487]">
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
            <div className="w-full max-w-[850px] mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
              {atsResult.strengths && atsResult.strengths.length > 0 && (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-lg mb-6 flex items-center gap-3 text-[#1d1a24]">
                    <TrendingUp size={20} className="text-emerald-500" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-5">
                    {atsResult.strengths.map((item: string, index: number) => (
                      <li key={index} className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <p className="text-sm text-[#4a4455] leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {atsResult.recommendations &&
                atsResult.recommendations.length > 0 && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-lg mb-6 flex items-center gap-3 text-[#1d1a24]">
                      <Lightbulb size={20} className="text-amber-500" />
                      Recommendations
                    </h4>
                    <ul className="space-y-5">
                      {atsResult.recommendations.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex gap-4 items-start">
                            <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            <p className="text-sm text-[#4a4455] leading-relaxed">
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
        @media (max-width: 768px) {
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