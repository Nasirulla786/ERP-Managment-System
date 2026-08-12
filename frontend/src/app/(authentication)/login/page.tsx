"use client";

import api from "@/app/lib/axios";
import Image from "next/image";
import { useState } from "react";
import bg from "../../../../public/bg.png";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { GraduationCap, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.status == 200) {
        toast.success("Login Successfully");
        router.push("/");
      }
      else{
        alert("something went wrong")
      }
    } catch (error: any) {
      console.log(error.response?.data);
      alert(error?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 font-sans text-slate-100 overflow-hidden relative">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

      {/* Left Form Panel */}
      <div className="flex w-full flex-col justify-center px-8 sm:w-[520px] sm:px-14 z-10 bg-slate-950/80 backdrop-blur-xl border-r border-slate-800/80 shadow-2xl">
        <div className="mx-auto w-full max-w-[360px]">
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/25 ring-4 ring-indigo-500/10 transition-all hover:scale-105">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
              </span>
            </div>

            <h1 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
              CampusFlow <span className="text-indigo-400">ERP</span>
            </h1>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Academic Portal Access
            </p>
          </div>

          {/* Form Container Card */}
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-7 shadow-2xl shadow-slate-950/50 backdrop-blur-md">
            <div className="mb-6 text-center">
              <h2 className="text-sm font-bold tracking-wide text-slate-300">
                SIGN IN TO YOUR ACCOUNT
              </h2>
              <div className="mt-2.5 h-0.5 w-12 bg-indigo-500 mx-auto rounded-full" />
            </div>

            <div className="space-y-4">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <User size={17} />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                    <Lock size={17} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="mt-5 flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-xs font-medium text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer accent-indigo-600"
                />
                Remember login
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="group mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-indigo-600/30 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              <span>LOG IN</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Register Link Footer */}
          <div className="mt-7 text-center">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Feature Panel */}
      <div className="relative hidden flex-1 sm:flex flex-col justify-between p-12 overflow-hidden bg-slate-900">
        <Image src={bg} alt="Background" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-indigo-950/40" />

        {/* Floating Top Badge */}
        <div className="relative z-10 flex items-center gap-2 rounded-full bg-slate-900/80 border border-slate-800 px-4 py-2 w-fit backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">Next Generation ERP Portal</span>
        </div>

        {/* Feature Copy Overlay */}
        <div className="relative z-10 max-w-lg space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Streamline Department Management & Academic Excellence
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Real-time attendance tracking, departmental notice distribution, interactive timetable schedules, and comprehensive student & faculty reporting in one unified dashboard.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Smart Attendance System</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Faculty Workload Reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
