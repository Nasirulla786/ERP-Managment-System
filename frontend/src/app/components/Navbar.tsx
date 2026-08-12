"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Bell,
} from "lucide-react";
import api from "@/app/lib/axios";

interface NavbarProps {
  role?: "student" | "faculty" | "hod" | string;
  userName?: string;
  userSubtitle?: string;
  userImage?: string;
  activeTab?: string;
}

export default function Navbar({
  role = "User",
  userName = "",
  userSubtitle = "",
  userImage = "",
}: NavbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/logout/", {}, { withCredentials: true });
      router.push("/login");
    } catch (error) {
      console.log("Logout error:", error);
      setLoggingOut(false);
    }
  };

  const getDashboardLink = () => {
    if (role.toLowerCase() === "student") return "/pages/student-dashboard";
    if (role.toLowerCase() === "faculty") return "/pages/faculty-dashboard";
    if (role.toLowerCase() === "hod") return "/pages/hod-dashboard";
    return "/";
  };

  const getRoleBadgeStyle = () => {
    if (role.toLowerCase() === "hod")
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    if (role.toLowerCase() === "faculty")
      return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md text-white shadow-xl shadow-slate-950/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={getDashboardLink()}
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-md shadow-indigo-500/30">
            <GraduationCap className="h-5 w-5 text-white transition-transform group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CampusFlow
              </span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 uppercase tracking-widest border border-indigo-500/30">
                ERP
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Academic Management System
            </span>
          </div>
        </Link>

        {/* Right Section / User Info */}
        <div className="hidden md:flex items-center gap-4">
          {/* Notifications indicator */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 transition-colors hover:text-white hover:border-slate-700 cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500"></span>
          </div>

          {/* User Profile Pill */}
          {userName && (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 px-3.5 py-1.5">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="h-8 w-8 rounded-xl object-cover ring-1 ring-indigo-500/30"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-200">
                    {userName}
                  </span>
                  <span
                    className={`rounded-md border px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeStyle()}`}
                  >
                    {role}
                  </span>
                </div>
                {userSubtitle && (
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                    {userSubtitle}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-rose-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <LogOut size={15} />
            <span>{loggingOut ? "Exiting..." : "Logout"}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl bg-slate-900 border border-slate-800 p-2 text-slate-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 p-4 md:hidden flex flex-col gap-3">
          {userName && (
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{userName}</p>
                <p className="text-xs text-slate-400">{userSubtitle || role}</p>
              </div>
            </div>
          )}

          <Link
            href={getDashboardLink()}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-xl bg-slate-900 p-3 text-sm font-medium text-slate-200"
          >
            <span>Dashboard Home</span>
            <ChevronRight size={16} className="text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600/20 border border-rose-500/30 p-3 text-sm font-semibold text-rose-300"
          >
            <LogOut size={16} />
            <span>{loggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
