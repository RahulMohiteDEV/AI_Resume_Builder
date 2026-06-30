"use client";

import Link from "next/link";
import { Bell, Settings } from "lucide-react";
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter() 
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
           <button
  onClick={() => router.push("/resume")}
  className="text-sm text-slate-500 hover:text-violet-700 transition-colors"
>
  Dashboard
</button>

            <Link
              href="/resume"
              className="text-sm font-semibold text-violet-700 border-b-2 border-violet-700 pb-1"
            >
              Resumes
            </Link>

           <button
  onClick={() => alert("Templates page is coming soon!")}
  className="text-sm text-slate-500 hover:text-violet-700 transition-colors cursor-pointer"
>
  Templates
</button>

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

          
        </div>
      </div>
    </header>
  );
}