"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { loginApi } from "@/apis/auth.api";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await loginApi(data);
      router.push("/resume");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-20 -right-20 sm:-top-24 sm:-right-24 md:-top-32 md:-right-32 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-violet-600/5 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 md:-bottom-32 md:-left-32 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>

      {/* Top Navigation */}
      <header className="bg-transparent backdrop-blur-md border-b border-slate-200/50 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/25">
              <span className="text-white text-sm sm:text-base md:text-xl font-bold">AI</span>
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-slate-800">
              Aura AI
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/support"
              className="hidden sm:inline-flex text-slate-500 hover:text-violet-600 transition-colors text-sm md:text-base font-medium"
            >
              Support
            </Link>
            <Link
              href="/auth/register"
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-all active:scale-95 shadow-sm hover:shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 md:pb-12 overflow-y-auto scroll-smooth">
        {/* Login Card */}
        <div className="w-full max-w-[95%] xs:max-w-[400px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[500px] z-10 my-auto">
          <div className="bg-white/95 backdrop-blur-sm  p-6 sm:p-7 md:p-8 lg:p-10 border border-slate-200/50 shadow-2xl shadow-slate-200/50">
            
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 leading-tight">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Access your resume dashboard.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
              {/* Email Address */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-sm sm:text-base font-medium text-slate-700 ml-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors"
                    size={18}
                  />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Mail@example.com"
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-sm sm:text-base"
                    type="email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-sm sm:text-base font-medium text-slate-700 ml-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors"
                    size={18}
                  />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    placeholder="••••••••"
                    className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:ring-4 focus:ring-violet-500/20 focus:border-violet-500 transition-all outline-none text-sm sm:text-base"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm sm:text-base text-violet-600 hover:text-violet-700 font-medium hover:underline transition-all"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 md:py-4.5 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white rounded-xl font-semibold text-sm sm:text-base transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-violet-600/25"
              >
                {isSubmitting || isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Logging In...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-400 bg-white px-4">
                Or continue with
              </div>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 active:scale-95 hover:border-slate-300">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 active:scale-95 hover:border-slate-300">
                <svg className="w-5 h-5 flex-shrink-0 fill-slate-800" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Footer */}
            <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-slate-500">
              Don't have an account?
              <Link
                href="/auth/register"
                className="ml-1.5 text-violet-600 font-semibold hover:underline transition-all"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Footer Compliance */}
          <footer className="mt-6 sm:mt-8 md:mt-10">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 md:gap-6 items-center w-full">
              <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm text-center">
                © 2024 Aura AI. Precision in every career move.
              </p>
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-violet-600 transition-colors text-[11px] sm:text-xs md:text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-violet-600 transition-colors text-[11px] sm:text-xs md:text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}