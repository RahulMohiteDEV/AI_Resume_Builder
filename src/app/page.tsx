"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Aura AI free to use?",
      answer:
        "Yes, we offer a free plan that lets you build and download your first resume without any credit card. Pro plans start at just $9/month.",
    },
    {
      question: "How does the ATS scoring work?",
      answer:
        "Our ATS scoring engine simulates how Applicant Tracking Systems parse and score resumes. It checks for keyword density, formatting, section headers, and quantifiable achievements.",
    },
    {
      question: "Can I use my own templates?",
      answer:
        "Currently we support a growing library of recruiter-approved templates. Custom templates are on our roadmap for early 2025.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use end-to-end encryption and never share your data with third parties. Your resume data belongs to you.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fef7ff] text-[#1d1a24] font-sans selection:bg-[#7c3aed] selection:text-white">
      {/* Top Navigation Bar */}
      <header
        className={`fixed top-0 w-full z-50 bg-[#fef7ff]/80 backdrop-blur-md border-b border-[#ccc3d8]/30 shadow-sm transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <nav className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px] flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg sm:text-xl text-[#630ed4]">
              CareerFlow AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-sm lg:text-base"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-sm lg:text-base"
              href="#templates"
            >
              Templates
            </a>
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-sm lg:text-base"
              href="#faq"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Login Button */}
            <button
              onClick={() => router.push("auth/login")}
              className="hidden lg:block text-[#4a4455] hover:text-[#630ed4] transition-colors text-sm lg:text-base"
            >
              Log In
            </button>

            {/* Build My Resume Button */}
            <button
              onClick={() => router.push("/resume")}
              className="bg-[#630ed4] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-lg shadow-[#630ed4]/20 transition-transform hover:scale-105 active:scale-90 whitespace-nowrap"
            >
              Build My Resume
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#4a4455] hover:text-[#630ed4] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fef7ff] border-b border-[#ccc3d8]/30 py-4 px-4">
            <div className="flex flex-col space-y-3">
              <a
                className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-base py-2"
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-base py-2"
                href="#templates"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </a>
              <a
                className="text-[#4a4455] hover:text-[#630ed4] transition-colors text-base py-2"
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <button
                onClick={() => {
                  router.push("auth/login");
                  setMobileMenuOpen(false);
                }}
                className="text-left text-[#4a4455] hover:text-[#630ed4] transition-colors text-base py-2"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16 sm:pt-20">
        {/* Hero Section - Updated with Content First on Mobile */}
        <section className="relative overflow-hidden pt-12 sm:pt-8 pb-12 sm:pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1)_0%,transparent_50%)]"></div>
          </div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px] grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
            {/* Content - First on Mobile */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#630ed4]/5 border border-[#630ed4]/10 text-[#630ed4] text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                Next-Gen Resume Intelligence
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1a24] leading-tight">
                Build a Professional{" "}
                <span className="text-[#630ed4] italic">ATS-Ready</span> Resume
                with AI
              </h1>
              <p className="text-base sm:text-lg text-[#4a4455] max-w-lg">
                Land your dream job with precision-engineered templates and
                real-time recruiter insights powered by CareerFlow AI.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#630ed4]">
                    50K+
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#4a4455]">
                    Active Pros
                  </span>
                </div>
                <div className="w-px h-10 sm:h-12 bg-[#ccc3d8]/30 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#630ed4]">
                    95
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#4a4455]">
                    Avg. ATS Score
                  </span>
                </div>
              </div>
              {/* Hero CTA Button */}
              <button
                onClick={() => router.push("/resume")}
                className="bg-[#630ed4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-[#630ed4]/30 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
              >
                Get Started Now
              </button>
            </div>

            {/* Image/Mockup - Second on Mobile */}
            <div className="relative group order-2 lg:order-2">
              {/* Glassmorphism Resume Mockup */}
              <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 overflow-hidden border border-white/50">
                <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 sm:h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-2 sm:h-3 w-1/3 bg-slate-100 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                  <div className="h-2 w-4/6 bg-slate-50 rounded"></div>
                </div>
                <div className="mt-4 sm:mt-8 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-12 sm:w-16 h-5 sm:h-6 bg-[#630ed4]/10 rounded-full"></span>
                    <span className="w-16 sm:w-20 h-5 sm:h-6 bg-[#d0e1fb]/30 rounded-full"></span>
                  </div>
                </div>
              </div>
              {/* Background blobs */}
              <div className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#630ed4]/20 rounded-full blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-[#d0e1fb]/40 rounded-full blur-[80px] -z-10"></div>
            </div>

            {/* Floating Insight - Hidden on Mobile, Visible on Tablet+ */}
            <div className="hidden sm:block absolute -right-4 md:-right-8 top-1/4 bg-white/70 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-xl border border-[#630ed4]/20 max-w-[160px] sm:max-w-[200px] animate-bounce z-20">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium text-[#630ed4]">
                  AI Suggestion
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] leading-relaxed text-[#4a4455]">
                "Incorporate 'Agile Methodologies' for PM roles."
              </p>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-12 sm:py-20" id="features">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px]">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1a24]">
                Engineered for Your Success
              </h2>
              <p className="text-sm sm:text-base text-[#4a4455]">
                Our platform combines industry expertise with cutting-edge AI to
                give you an unfair advantage in the job market.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* AI Generation */}
              <div className="sm:col-span-2 bg-white border border-[#ccc3d8] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between overflow-hidden relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative z-10">
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">AI Generation</h3>
                  <p className="text-sm sm:text-base text-[#4a4455] max-w-md">
                    Our advanced LLMs write high-impact bullet points that
                    quantify your achievements using the STAR method.
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[150px] sm:text-[200px] absolute -bottom-10 -right-10">
                    description
                  </span>
                </div>
              </div>
              {/* ATS Score */}
              <div className="bg-[#7c3aed] text-[#ede0ff] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="opacity-20"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="44"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-white"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="44"
                      stroke="currentColor"
                      strokeDasharray="276"
                      strokeDashoffset="20"
                      strokeWidth="8"
                    />
                  </svg>
                  <span className="absolute text-lg sm:text-xl font-bold">98</span>
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2">ATS Score</h3>
                <p className="text-xs sm:text-sm font-medium opacity-80">
                  Real-time check
                </p>
              </div>
              {/* Templates */}
              <div className="bg-[#f9f1ff] border border-[#ccc3d8] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold text-lg sm:text-xl mb-2">
                  Premium Templates
                </h3>
                <p className="text-sm sm:text-base text-[#4a4455]">
                  Battle-tested layouts by top recruiters.
                </p>
              </div>
              {/* AI Suggestions */}
              <div className="bg-white border border-[#ccc3d8] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold text-lg sm:text-xl mb-2">Smart Hints</h3>
                <p className="text-sm sm:text-base text-[#4a4455]">
                  Contextual advice to improve keyword density.
                </p>
              </div>
              {/* Cover Letter */}
              <div className="bg-white border border-[#ccc3d8] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold text-lg sm:text-xl mb-2">Cover Letters</h3>
                <p className="text-sm sm:text-base text-[#4a4455]">
                  Generate matched cover letters in seconds.
                </p>
              </div>
              {/* Job Tracker */}
              <div className="bg-white border border-[#ccc3d8] p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold text-lg sm:text-xl mb-2">Job Tracker</h3>
                <p className="text-sm sm:text-base text-[#4a4455]">
                  Kanban-style board for applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Score Spotlight */}
        <section className="py-12 sm:py-20 bg-[#e8dfee]/30">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px]">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative">
                <div className="bg-white rounded-[28px] sm:rounded-[40px] p-6 sm:p-8 lg:p-10 shadow-xl border border-[#ccc3d8] relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
                    <div>
                      <h4 className="font-semibold text-lg sm:text-xl text-[#1d1a24]">
                        ATS Compatibility Report
                      </h4>
                      <p className="text-sm sm:text-base text-[#4a4455]">
                        Resume: Senior Product Manager
                      </p>
                    </div>
                    <div className="bg-[#630ed4]/10 text-[#630ed4] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-bold text-sm sm:text-base">
                      Excellent
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center mb-6 sm:mb-10">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          r="45"
                          stroke="#f3f4f6"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          fill="none"
                          r="45"
                          stroke="#630ed4"
                          strokeDasharray="282.7"
                          strokeDashoffset="5.6"
                          strokeLinecap="round"
                          strokeWidth="10"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#1d1a24]">
                          98
                        </span>
                        <span className="text-[10px] sm:text-xs uppercase text-[#4a4455]">
                          Overall
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 w-full space-y-3 sm:space-y-4">
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm font-medium">
                          <span>Keyword Matching</span>
                          <span className="text-[#630ed4] font-bold">94%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[94%]"></div>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm font-medium">
                          <span>Structure &amp; Formatting</span>
                          <span className="text-[#630ed4] font-bold">100%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[100%]"></div>
                        </div>
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm font-medium">
                          <span>Impact Quantification</span>
                          <span className="text-[#630ed4] font-bold">88%</span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[88%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#630ed4]/5 rounded-2xl p-4 sm:p-6 border border-[#630ed4]/10">
                    <h5 className="text-xs sm:text-sm font-medium text-[#630ed4] mb-1 sm:mb-2 flex items-center gap-2">
                      Recruiter's Tip
                    </h5>
                    <p className="text-xs sm:text-sm text-[#4a4455]">
                      Include more specific software names like 'Jira' and
                      'Confluence' to improve search ranking.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  Beat the <span className="text-[#630ed4] underline decoration-[#630ed4]/20">Black Hole</span>
                </h2>
                <p className="text-base sm:text-lg text-[#4a4455]">
                  75% of resumes are rejected before a human even sees them. Our
                  proprietary scoring engine simulates the filters used by
                  Fortune 500 recruiters.
                </p>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#630ed4]/10 flex items-center justify-center">
                      <span className="text-sm sm:text-base">📊</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-base sm:text-xl">Keyword Analysis</h5>
                      <p className="text-sm sm:text-base text-[#4a4455]">
                        Compare your resume against real job descriptions.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#630ed4]/10 flex items-center justify-center">
                      <span className="text-sm sm:text-base">🛡️</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-base sm:text-xl">
                        Formatting Guardrails
                      </h5>
                      <p className="text-sm sm:text-base text-[#4a4455]">
                        Fix layout issues that cause parsing errors.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-20" id="faq">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px]">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1a24] mb-3 sm:mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-[#4a4455]">
                Everything you need to know about CareerFlow AI.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#ccc3d8] rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-4 sm:p-6 text-left hover:bg-[#f9f1ff] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#1d1a24]">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[#4a4455] transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-[#4a4455] transition-all duration-300 ${
                      openFaq === index ? "block" : "hidden"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-[48px]">
          <div className="max-w-[1280px] mx-auto bg-[#630ed4] rounded-[28px] sm:rounded-[40px] p-8 sm:p-12 md:p-16 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-4 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Your Career Upgrade Starts Now
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
                Join 50,000+ professionals who have landed roles at top-tier
                companies using CareerFlow AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <button
                  onClick={() => router.push("/resume")}
                  className="bg-white text-[#630ed4] px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  Get Started for Free
                </button>
                <button className="text-white border border-white/30 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl hover:bg-white/10 transition-all w-full sm:w-auto">
                  View Templates
                </button>
              </div>
              <p className="text-sm sm:text-base text-white/60 font-medium">
                No credit card required to build your first resume.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#ccc3d8] w-full py-6 sm:py-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-[48px] flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg sm:text-xl text-[#1d1a24]">
              CareerFlow AI
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              className="text-xs sm:text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs sm:text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs sm:text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Career Advice
            </a>
            <a
              className="text-xs sm:text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Contact
            </a>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#4a4455] opacity-80 text-center">
            © 2024 CareerFlow AI. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce {
          animation: bounce 2.5s ease-in-out infinite;
        }
        .material-symbols-outlined {
          font-family: "Material Symbols Outlined";
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
          -webkit-font-feature-settings: "liga";
          -webkit-font-smoothing: antialiased;
        }
        button:active {
          transform: scale(0.95) !important;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}