"use client";

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
      question: "Is CareerFlow AI free to use?",
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
        <nav className="max-w-[1280px] mx-auto px-[48px] flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <span
              className="material-symbols-outlined text-[#630ed4] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-bold text-xl text-[#630ed4]">
              CareerFlow AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-base"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-base"
              href="#templates"
            >
              Templates
            </a>
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-base"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="text-[#4a4455] hover:text-[#630ed4] transition-colors duration-200 text-base"
              href="#faq"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-[#4a4455] hover:text-[#630ed4] transition-colors text-base">
              Log In
            </button>
            <button className="bg-[#630ed4] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-lg shadow-[#630ed4]/20 transition-transform hover:scale-105 active:scale-90">
              Build My Resume
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1)_0%,transparent_50%)]"></div>
          </div>
          <div className="max-w-[1280px] mx-auto px-[48px] grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#630ed4]/5 border border-[#630ed4]/10 text-[#630ed4] text-xs uppercase tracking-wider font-semibold">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Next-Gen Resume Intelligence
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1d1a24] leading-tight">
                Build a Professional{" "}
                <span className="text-[#630ed4] italic">ATS-Ready</span> Resume
                with AI
              </h1>
              <p className="text-lg text-[#4a4455] max-w-lg">
                Land your dream job with precision-engineered templates and
                real-time recruiter insights powered by CareerFlow AI.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-semibold text-[#630ed4]">
                    50K+
                  </span>
                  <span className="text-sm font-medium text-[#4a4455]">
                    Active Professionals
                  </span>
                </div>
                <div className="w-px h-12 bg-[#ccc3d8]/30 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-semibold text-[#630ed4]">
                    95
                  </span>
                  <span className="text-sm font-medium text-[#4a4455]">
                    Avg. ATS Score
                  </span>
                </div>
              </div>
            </div>
            <div className="relative group">
              {/* Glassmorphism Resume Mockup */}
              <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 overflow-hidden border border-white/50">
                <div className="flex gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-3 w-1/3 bg-slate-100 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                  <div className="h-2 w-4/6 bg-slate-50 rounded"></div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="w-16 h-6 bg-[#630ed4]/10 rounded-full"></span>
                    <span className="w-20 h-6 bg-[#d0e1fb]/30 rounded-full"></span>
                  </div>
                  <span className="material-symbols-outlined text-[#630ed4]">
                    check_circle
                  </span>
                </div>
                {/* Floating Insight */}
                <div className="absolute -right-8 top-1/4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#630ed4]/20 max-w-[200px] animate-bounce">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#630ed4] text-sm">
                      psychology
                    </span>
                    <span className="text-sm font-medium text-[#630ed4]">
                      AI Suggestion
                    </span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-[#4a4455]">
                    "Incorporate 'Agile Methodologies' to increase search
                    visibility for PM roles."
                  </p>
                </div>
              </div>
              {/* Background blobs */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#630ed4]/20 rounded-full blur-[80px] -z-10"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#d0e1fb]/40 rounded-full blur-[80px] -z-10"></div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-8 border-y border-[#ccc3d8]/20 bg-white">
          <div className="max-w-[1280px] mx-auto px-[48px] text-center">
            <p className="text-xs font-semibold text-[#4a4455] uppercase tracking-widest mb-4 opacity-60">
              Trusted by pros at the world's best companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40 hover:opacity-100 transition-opacity">
              <img
                className="h-8 w-auto"
                alt="Google logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeMhGxtKGtZmfwkjZNZa8g1Saxb26ZCUqyHvlH0NCUB7vc9H_CQ1g0g5AmPBz4Rz8OCJEdSTVXgicGSG9jMxaEMu2_A3Zyu3AXwdbky_1WJPd0vJSy9jH4fYgoJQAwdZJAGg7lRe7AcccUpJuA1_V9PLd0Dstr1nfgOvKOuasA8M52SDRojIWHqmB4xFzcJ2HQ-ysrmx4d_9nqgYNNk44JTQvTTU1S_AbbS4H5Ru2EBMy0Z_h_ycNLYWKAK-VxJdPoiaC-QAViAac"
              />
              <img
                className="h-8 w-auto"
                alt="Amazon logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMn1oOUbrFzmDEzyCxgCWCshB0yhlRiz2y_05oEGWvrcmPWbtXo3PNTW2Gq0nvgudWepunMyrM1EUD1k6ibAw55Yj-9iLTVmR0ShB9vswtaXCVqFzMtWH2qH9u81MwYK2WgTQU38MNXQJN-lVTXjGoeAW1ORgolsptzKLJUpB2cxbGPxUQG6KNAx3_3FLMQ_0X_ZHQuskJ2JOd5CgqrZNzIt9f1IRWac1ZXZfJDigdodoZ8H7B6Eqe03BshJeJG3nQKPjQ0Od-wCE"
              />
              <img
                className="h-8 w-auto"
                alt="Microsoft logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8dBOrTl0Yg5WD855Pb7QCgd06dsykxkGjxX61MnGEMYew9P2J_RQEoWH7UJQ6rQrS2-_p4yc8kr1O2OwXW4oYT-MldnvVzMrudD3NQdvgqi6tfgVabPHXAjxZ8L3xDVJ7JD-yT6rI7ELob-KEX5UKnfm1H1tuu2k7xWTMogYWYqqVpfO3Ig3gUQ2ciFzapcDPn4_nW07GgA51pDJMuEQjiwOo9Ru_837D1gkhCcONyozqoVqxn3Tdgr2KGpptvDHJ0w_68RBNT_Y"
              />
              <img
                className="h-8 w-auto"
                alt="Adobe logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVXsYsbxsyyw0e8IJ0zxeG-YGZBhJkZrFsjD3ZguRQW_0dryqTXWhqQ_CXTQxjUa0nTK9s8uWPKRvIvqpm66VzT554PxUkG8_HRkLoqK4R95cOmUivS-_8rcAKDb7xYYmwhbSLLXLvTm2vvrht-onWONYPRVQLkCRP8mMQQY7Bf0DZ0Yile6-fMjEg771BMPVy65TV-7Pj1hl7izFYL-e-PTxcqn_GInJ5Ip86AKUAAaqI7xUkCAmFYePSS-_gBtHdIcT61c-7YqI"
              />
              <img
                className="h-8 w-auto"
                alt="Netflix logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvVaBj2ojw-_TcKWDhhsi9F9WG8NOfQXW3i0ShTalLt0dZbjN6TyLQ7-iN7dhOn5aJo48ESbnc-1qj0WVUcmIfhiimAeoQILzxHOH2-LFlSC5MmIs-r6LnElgGiom-YHEsTEhUAtfgNU1l9MCaSvTzTBi5NoBt61H2NYzKgMavd6-Ulh4EEjCYdMPFz8XwqTQ-rA4if_iJk2ZMGM4ZDC7ZNyUsu7ux5PJ9eQnIgdltgNYkedS2hi1QvznWslDrwzBW0T3BkIGYjiY"
              />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-20" id="features">
          <div className="max-w-[1280px] mx-auto px-[48px]">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-semibold text-[#1d1a24]">
                Engineered for Your Success
              </h2>
              <p className="text-base text-[#4a4455]">
                Our platform combines industry expertise with cutting-edge AI to
                give you an unfair advantage in the job market.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* AI Generation */}
              <div className="col-span-1 md:col-span-2 bg-white border border-[#ccc3d8] p-8 rounded-[32px] flex flex-col justify-between overflow-hidden relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-[#630ed4] text-3xl mb-4">
                    auto_awesome
                  </span>
                  <h3 className="font-semibold text-xl mb-2">AI Generation</h3>
                  <p className="text-base text-[#4a4455] max-w-md">
                    Our advanced LLMs write high-impact bullet points that
                    quantify your achievements using the STAR method.
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[200px] absolute -bottom-10 -right-10">
                    description
                  </span>
                </div>
              </div>
              {/* ATS Score */}
              <div className="bg-[#7c3aed] text-[#ede0ff] p-8 rounded-[32px] flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
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
                  <span className="absolute text-xl font-bold">98</span>
                </div>
                <h3 className="font-semibold text-xl mb-2">ATS Score</h3>
                <p className="text-sm font-medium opacity-80">
                  Real-time compatibility check
                </p>
              </div>
              {/* Templates */}
              <div className="bg-[#f9f1ff] border border-[#ccc3d8] p-8 rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="material-symbols-outlined text-[#505f76] text-3xl mb-4">
                  dashboard
                </span>
                <h3 className="font-semibold text-xl mb-2">
                  Premium Templates
                </h3>
                <p className="text-base text-[#4a4455]">
                  Battle-tested layouts designed by top recruiters at Tier-1
                  companies.
                </p>
              </div>
              {/* AI Suggestions */}
              <div className="bg-white border border-[#ccc3d8] p-8 rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="material-symbols-outlined text-[#630ed4] text-3xl mb-4">
                  lightbulb
                </span>
                <h3 className="font-semibold text-xl mb-2">Smart Hints</h3>
                <p className="text-base text-[#4a4455]">
                  Contextual advice while you type to improve keyword density
                  and professional tone.
                </p>
              </div>
              {/* Cover Letter */}
              <div className="bg-white border border-[#ccc3d8] p-8 rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="material-symbols-outlined text-[#713700] text-3xl mb-4">
                  mail
                </span>
                <h3 className="font-semibold text-xl mb-2">Cover Letters</h3>
                <p className="text-base text-[#4a4455]">
                  Generate perfectly matched cover letters for every application
                  in seconds.
                </p>
              </div>
              {/* Job Tracker */}
              <div className="bg-white border border-[#ccc3d8] p-8 rounded-[32px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="material-symbols-outlined text-[#ba1a1a] text-3xl mb-4">
                  track_changes
                </span>
                <h3 className="font-semibold text-xl mb-2">Job Tracker</h3>
                <p className="text-base text-[#4a4455]">
                  Keep organized with a Kanban-style board for all your active
                  applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Score Spotlight */}
        <section className="py-20 bg-[#e8dfee]/30">
          <div className="max-w-[1280px] mx-auto px-[48px]">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="bg-white rounded-[40px] p-10 shadow-xl border border-[#ccc3d8] relative overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h4 className="font-semibold text-xl text-[#1d1a24]">
                        ATS Compatibility Report
                      </h4>
                      <p className="text-[#4a4455] text-base">
                        Resume: Senior Product Manager
                      </p>
                    </div>
                    <div className="bg-[#630ed4]/10 text-[#630ed4] px-4 py-2 rounded-xl font-bold">
                      Excellent
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 items-center mb-10">
                    <div className="relative w-40 h-40">
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
                        <span className="text-4xl font-extrabold text-[#1d1a24]">
                          98
                        </span>
                        <span className="text-xs uppercase text-[#4a4455]">
                          Overall
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Keyword Matching</span>
                          <span className="text-[#630ed4] font-bold">94%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[94%]"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Structure &amp; Formatting</span>
                          <span className="text-[#630ed4] font-bold">100%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[100%]"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Impact Quantification</span>
                          <span className="text-[#630ed4] font-bold">88%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#630ed4] w-[88%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#630ed4]/5 rounded-2xl p-6 border border-[#630ed4]/10">
                    <h5 className="text-sm font-medium text-[#630ed4] mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        tips_and_updates
                      </span>
                      Recruiter's Tip
                    </h5>
                    <p className="text-[#4a4455] text-sm">
                      Include more specific software names like 'Jira' and
                      'Confluence'. Your impact numbers are excellent, but
                      adding more tech-stack keywords will improve search
                      ranking.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Beat the <span className="text-[#630ed4] underline decoration-[#630ed4]/20">Black Hole</span>
                </h2>
                <p className="text-lg text-[#4a4455]">
                  75% of resumes are rejected before a human even sees them. Our
                  proprietary scoring engine simulates the filters used by
                  Fortune 500 recruiters.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#630ed4]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#630ed4]">
                        analytics
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-xl">Keyword Analysis</h5>
                      <p className="text-[#4a4455] text-base">
                        We compare your resume against real job descriptions to
                        identify missing technical and soft skills.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#630ed4]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#630ed4]">
                        rule
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-xl">
                        Formatting Guardrails
                      </h5>
                      <p className="text-[#4a4455] text-base">
                        Automatically fix layout issues that cause parsing
                        errors in Workday, Greenhouse, and Lever.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20" id="faq">
          <div className="max-w-[1280px] mx-auto px-[48px]">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold text-[#1d1a24] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-[#4a4455]">
                Everything you need to know about CareerFlow AI.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#ccc3d8] rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-[#f9f1ff] transition-colors"
                  >
                    <span className="font-semibold text-[#1d1a24]">
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
                    className={`px-6 pb-6 text-[#4a4455] transition-all duration-300 ${
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
        <section className="py-20 px-[48px]">
          <div className="max-w-[1280px] mx-auto bg-[#630ed4] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Your Career Upgrade Starts Now
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                Join 50,000+ professionals who have landed roles at top-tier
                companies using CareerFlow AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="bg-white text-[#630ed4] px-10 py-4 rounded-full font-semibold text-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                  Get Started for Free
                </button>
                <button className="text-white border border-white/30 px-10 py-4 rounded-full font-semibold text-xl hover:bg-white/10 transition-all">
                  View Templates
                </button>
              </div>
              <p className="text-white/60 font-medium">
                No credit card required to build your first resume.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#ccc3d8] w-full py-8">
        <div className="max-w-[1280px] mx-auto px-[48px] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span
              className="material-symbols-outlined text-[#630ed4] text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-semibold text-xl text-[#1d1a24]">
              CareerFlow AI
            </span>
          </div>
          <div className="flex gap-6">
            <a
              className="text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Career Advice
            </a>
            <a
              className="text-sm font-medium text-[#54647a] hover:text-[#630ed4] transition-colors"
              href="#"
            >
              Contact
            </a>
          </div>
          <p className="text-sm font-medium text-[#4a4455] opacity-80 text-center md:text-right">
            © 2024 CareerFlow AI. Precision crafted for professionals.
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
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
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