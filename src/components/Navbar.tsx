"use client";

import Link from "next/link";
import { Bell, Settings, Menu, X, LayoutDashboard, FileText, LayoutTemplate } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="w-full h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Left - Logo */}
          <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-violet-700 hover:text-violet-800 transition-colors whitespace-nowrap"
            >
              Aura AI
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
              <button
                onClick={() => handleNavigation("/resume")}
                className="text-sm lg:text-base text-slate-500 hover:text-violet-700 transition-colors flex items-center gap-2"
              >
                <LayoutDashboard size={18} className="lg:size-[20px]" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNavigation("/resume")}
                className="text-sm lg:text-base font-semibold text-violet-700 border-b-2 border-violet-700 pb-1 flex items-center gap-2"
              >
                <FileText size={18} className="lg:size-[20px]" />
                <span>Resumes</span>
              </button>

              <button
                onClick={() => alert("Templates page is coming soon!")}
                className="text-sm lg:text-base text-slate-500 hover:text-violet-700 transition-colors flex items-center gap-2"
              >
                <LayoutTemplate size={18} className="lg:size-[20px]" />
                <span>Templates</span>
              </button>
            </nav>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Desktop Icons */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3">
              <button
                className="p-2 rounded-full hover:bg-violet-50 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell
                  size={18}
                  className="sm:size-[20px] text-slate-500 hover:text-violet-700 transition-colors"
                />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                className="p-2 rounded-full hover:bg-violet-50 transition-colors"
                aria-label="Settings"
              >
                <Settings
                  size={18}
                  className="sm:size-[20px] text-slate-500 hover:text-violet-700 transition-colors"
                />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={22} className="text-slate-700" />
              ) : (
                <Menu size={22} className="text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu */}
          <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl md:hidden animate-slideDown">
            <nav className="flex flex-col p-4 space-y-1">
              <button
                onClick={() => handleNavigation("/resume")}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-violet-50 transition-colors text-base font-medium text-slate-700"
              >
                <LayoutDashboard size={20} className="text-violet-600" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNavigation("/resume")}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-violet-50 text-violet-700 transition-colors text-base font-semibold"
              >
                <FileText size={20} className="text-violet-600" />
                <span>Resumes</span>
                <span className="ml-auto text-xs bg-violet-200 text-violet-700 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </button>

              <button
                onClick={() => {
                  alert("Templates page is coming soon!");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-violet-50 transition-colors text-base font-medium text-slate-700"
              >
                <LayoutTemplate size={20} className="text-violet-600" />
                <span>Templates</span>
              </button>

              <div className="h-px bg-slate-100 my-2"></div>

              {/* Mobile Actions */}
              <div className="flex items-center gap-2 px-4 py-2">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-violet-50 transition-colors text-sm font-medium text-slate-600"
                  aria-label="Notifications"
                >
                  <Bell size={18} className="text-violet-600" />
                  <span>Notifications</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-violet-50 transition-colors text-sm font-medium text-slate-600"
                  aria-label="Settings"
                >
                  <Settings size={18} className="text-violet-600" />
                  <span>Settings</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}