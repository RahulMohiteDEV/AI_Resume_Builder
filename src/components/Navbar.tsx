"use client";

import Link from "next/link";
import { Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full h-16 flex items-center justify-between px-4 md:px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-bold text-violet-700"
          >
            Aura AI
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-sm text-slate-500 hover:text-violet-700"
            >
              Dashboard
            </Link>

            <Link
              href="/resume"
              className="text-sm font-semibold text-violet-700 border-b-2 border-violet-700 pb-1"
            >
              Resumes
            </Link>

            <Link
              href="/templates"
              className="text-sm text-slate-500 hover:text-violet-700"
            >
              Templates
            </Link>

            <Link
              href="/analytics"
              className="text-sm text-slate-500 hover:text-violet-700"
            >
              Analytics
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Bell
            size={20}
            className="cursor-pointer text-slate-500 hover:text-violet-700 transition-colors"
          />

          <Settings
            size={20}
            className="cursor-pointer text-slate-500 hover:text-violet-700 transition-colors"
          />

          <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}