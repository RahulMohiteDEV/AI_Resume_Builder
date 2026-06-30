"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Sparkles,
  Bell,
  Folder,
  Code,
  ExternalLink,
  Info,
  Verified,
  FolderOpen,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [
        {
          title: "",
          techStack: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.projects?.length) {
        reset({
          projects: data.data.projects.map((project: any) => ({
            ...project,
            techStack: Array.isArray(project.techStack)
              ? project.techStack.join(", ")
              : project.techStack || "",
          })),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const project = watch(`projects.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);
      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate-project-description", {
        jobTitle: resume?.jobTitle || "web developer",
        experienceLevel: resume?.experienceLevel || "mid-level",
        techStack: project.techStack ? project.techStack.split(",").map((t: string) => t.trim()) : [],
      });

      setValue(`projects.${index}.description`, data.data.projectDescription);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((project) => ({
        ...project,
        techStack: project.techStack.split(",").map((tech) => tech.trim()).filter(Boolean),
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        projects: formattedProjects,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="flex justify-between items-center h-16 px-6 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#630ed4]">Aura AI</span>
            <span className="text-xs bg-[#7c3aed]/10 text-[#630ed4] px-2 py-0.5 rounded-full font-bold">
              PRO
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
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
            <button className="text-[#505f76] hover:text-[#630ed4] transition-colors cursor-pointer">
              <Bell size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#630ed4] font-bold text-xs overflow-hidden border border-[#630ed4]/10">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjYXCif_4PQZ3_qqgskcgDQVE-uaN3pRKYsCIGw3yTbxWH2m6Sn4UfnKDArnuSwb-NhcfQEdJRfqiRy61I44u19M8EQLnkAuymxG3jVHElDFzU-k_IvIu6kp1ly7alMIO4ftQoMd-iJhtXuC10AqZkg2PyITlFlRYTFT_eHX9i5JlLR_BeGmPsl1dBzZlUx8WTxqexTsrD8jz9g7HnihIohsM5zyjy2NoVsZn-8-qpZA9FuCGauF9xpvJewNFdiFjVmXB0lmf6XzI"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl px-4 md:px-12 py-12 flex flex-col items-center">
         {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-500">
              Step 5 of 8
            </span>
            <span className="text-sm font-medium text-[#630ed4] font-bold">
              60% Complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#630ed4] transition-all duration-700 ease-out"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Centered Main Card */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100">
          <div className="mb-10 text-center max-w-md mx-auto">
            <p className="text-slate-500 text-lg">
              Showcase your best work. Highlight the impact, tech stack, and
              results of your key initiatives.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Add Project Header Button */}
            <div className="flex justify-center mb-6">
              <button
                className="flex items-center gap-2 px-6 py-3 bg-[#630ed4] text-white rounded-full font-bold shadow-lg shadow-[#630ed4]/20 hover:scale-[1.02] active:scale-95 transition-all"
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    techStack: "",
                    description: "",
                    githubUrl: "",
                    liveUrl: "",
                  })
                }
              >
                <Plus size={22} />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Project List */}
            <div className="space-y-12">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative group bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-6 md:p-10 transition-all hover:bg-white hover:shadow-xl hover:border-[#7c3aed]/20"
                >
                  {/* Remove Action */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-[#ba1a1a] hover:border-[#ba1a1a]/20 transition-colors shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Project Title */}
                    <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="block text-slate-700 text-sm px-1">
                        Project Title
                      </label>
                      <div className="relative flex items-center">
                        <Folder
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`projects.${index}.title`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] transition-all text-slate-900 outline-none"
                          placeholder="e.g. Aura AI Career Suite"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="block text-slate-700 text-sm px-1">
                        Technologies Used
                      </label>
                      <div className="relative flex items-center">
                        <Code
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`projects.${index}.techStack`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] transition-all text-slate-900 outline-none"
                          placeholder="e.g. React, Tailwind, OpenAI"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* GitHub URL */}
                    <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="block text-slate-700 text-sm px-1">
                        GitHub Repository
                      </label>
                      <div className="relative flex items-center">
                        <Code
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`projects.${index}.githubUrl`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] transition-all text-slate-900 outline-none"
                          placeholder="github.com/username/repo"
                          type="url"
                        />
                      </div>
                    </div>

                    {/* Live URL */}
                    <div className="space-y-2 col-span-full md:col-span-1">
                      <label className="block text-slate-700 text-sm px-1">
                        Live Demo URL
                      </label>
                      <div className="relative flex items-center">
                        <ExternalLink
                          size={20}
                          className="absolute left-4 text-slate-400"
                        />
                        <input
                          {...register(`projects.${index}.liveUrl`)}
                          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] transition-all text-slate-900 outline-none"
                          placeholder="aura-career.app"
                          type="url"
                        />
                      </div>
                    </div>

                    {/* Description with AI Sparkle */}
                    <div className="space-y-2 col-span-full relative">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-slate-700 text-sm px-1">
                          Project Description
                        </label>
                        <button
                          type="button"
                          onClick={() => generateDescription(index)}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#630ed4] hover:text-[#7c3aed] transition-colors px-3 py-1 rounded-full bg-[#7c3aed]/5 border border-[#630ed4]/10"
                        >
                          <Sparkles
                            size={16}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          />
                          Generate Description
                        </button>
                      </div>
                      <textarea
                        {...register(`projects.${index}.description`)}
                        className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-[#7c3aed]/20 focus:border-[#630ed4] transition-all text-slate-900 outline-none resize-none"
                        placeholder="Describe the problem you solved and your contribution..."
                        rows={4}
                      ></textarea>
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          AI Suggestions Ready
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Project Button (Dashed Alternative) */}
              <button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    techStack: "",
                    description: "",
                    githubUrl: "",
                    liveUrl: "",
                  })
                }
                className="w-full py-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-[#630ed4] hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#7c3aed]/10 transition-all">
                  <Plus size={28} />
                </div>
                <span className="font-bold text-sm">Add another project</span>
              </button>
            </div>

            {/* Footer Navigation */}
            <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                className="order-2 sm:order-1 flex items-center gap-2 px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-full font-bold hover:bg-slate-50 active:scale-95 transition-all w-full sm:w-auto"
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 sm:order-2 flex items-center justify-center gap-2 px-12 py-4 bg-[#630ed4] text-white rounded-full font-bold shadow-xl shadow-[#630ed4]/30 hover:bg-[#7c3aed] hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto"
              >
                {isSubmitting ? "Saving..." : "Save and Continue"}
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Supportive Info Chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Info size={20} className="text-blue-600" />
            <span className="text-blue-800 text-xs font-semibold">
              Pro Tip: Include links to live projects to increase interview rate
              by 40%
            </span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 px-4 py-2 rounded-full flex items-center gap-2">
            <Verified size={20} className="text-emerald-600" />
            <span className="text-emerald-800 text-xs font-semibold">
              ATS-Optimized Formatting
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}