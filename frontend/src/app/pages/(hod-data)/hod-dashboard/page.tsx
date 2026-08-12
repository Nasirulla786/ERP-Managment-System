"use client";

import useCurrentHOD from "@/app/hooks/useCurrentHOD";
import Navbar from "@/app/components/Navbar";
import { RootState } from "@/redux/store";
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  ArrowRight,
  ClipboardList,
  CalendarDays,
  Bell,
  BarChart3,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Page = () => {
  useCurrentHOD();

  const { hodData }: any = useSelector((state: RootState) => state.hod);

  if (!hodData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-4" />
          <h2 className="text-lg font-bold text-slate-200">
            Loading HOD Dashboard...
          </h2>
          <p className="text-xs text-slate-500 mt-1">Fetching department data</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "My Faculties",
      desc: "View and manage department faculty members and workloads",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
      sendLink: "/pages/my-faculty",
      badge: `${hodData?.facultyCount ?? 0} Members`,
    },
    {
      title: "My Students",
      desc: "View all enrolled students across semesters",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      sendLink: "/pages/my-student",
      badge: `${hodData?.studentCount ?? 0} Enrolled`,
    },
    {
      title: "Assign Subjects",
      desc: "Allocate department teaching subjects to faculties",
      icon: BookOpen,
      color: "from-purple-500 to-violet-600",
      sendLink: "/pages/assigned-subjects",
      badge: "Subject Allocation",
    },
    {
      title: "Department Subjects",
      desc: "Create and manage core & elective courses",
      icon: ClipboardList,
      color: "from-amber-500 to-orange-600",
      sendLink: "/pages/department-subject",
      badge: `${hodData?.subjectCount ?? 0} Courses`,
    },
    {
      title: "Class Schedule",
      desc: "View and configure department timetable and room allocation",
      icon: CalendarDays,
      color: "from-cyan-500 to-blue-600",
      sendLink: "/pages/timetable",
      badge: "Timetable Matrix",
    },
    {
      title: "Department Notices",
      desc: "Publish and manage announcements for students and faculty",
      icon: Bell,
      color: "from-rose-500 to-pink-600",
      sendLink: "/pages/notices",
      badge: "Announcements",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      {/* Top Navbar */}
      <Navbar
        role="HOD"
        userName={hodData?.data?.name || "Head of Department"}
        userSubtitle={hodData?.data?.department}
        userImage={hodData?.data?.image}
      />

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-10 px-4 sm:px-8">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-widest mb-3">
              <ShieldCheck size={14} />
              HOD Administration Panel
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome back, {hodData?.data?.name} 👋
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 max-w-xl leading-relaxed">
              Overview of your department&apos;s academic operations, faculty workloads, student enrollments, and announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pages/report-page"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all"
            >
              <BarChart3 size={18} />
              <span>Department Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* ================= PROFILE CARD ================= */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={hodData?.data?.image}
                alt={hodData?.data?.name}
                className="h-28 w-28 rounded-2xl border-2 border-indigo-500/40 object-cover shadow-xl ring-4 ring-indigo-500/10"
              />
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md ring-2 ring-slate-900">
                <ShieldCheck size={14} />
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {hodData?.data?.name}
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mt-0.5">
                    Head of Department
                  </p>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 size={13} />
                    Active Status
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    HOD ID
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-200">
                    {hodData?.data?.hod_id}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Department
                  </p>
                  <p className="mt-1 text-base font-bold text-indigo-400">
                    {hodData?.data?.department}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Official Email
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-200 truncate">
                    {hodData?.data?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DASHBOARD STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Faculties
              </p>
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Users size={20} />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-white">
              {hodData?.facultyCount ?? 0}
            </p>
            <p className="mt-1 text-xs text-slate-500">Active teaching staff</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Students
              </p>
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap size={20} />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-emerald-400">
              {hodData?.studentCount ?? 0}
            </p>
            <p className="mt-1 text-xs text-slate-500">Enrolled across batches</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Subjects
              </p>
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <BookOpen size={20} />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-amber-400">
              {hodData?.subjectCount ?? 0}
            </p>
            <p className="mt-1 text-xs text-slate-500">Curriculum courses</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Semesters
              </p>
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Layers size={20} />
              </div>
            </div>
            <p className="mt-4 text-4xl font-black text-purple-400">
              {hodData?.semesterCount ?? 8}
            </p>
            <p className="mt-1 text-xs text-slate-500">Active academic terms</p>
          </div>
        </div>

        {/* ================= DEPARTMENT MANAGEMENT CARDS ================= */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Department Management
              </h2>
              <p className="text-xs text-slate-400">
                Quick access to core departmental administration tools
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((item) => (
              <Link
                key={item.title}
                href={item.sendLink}
                className="group relative rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <item.icon size={24} />
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {item.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400">
                  <span>Manage Section</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= RECENT ACTIVITY & OVERVIEW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-indigo-400" size={20} />
              <h2 className="text-xl font-extrabold text-white">
                Recent Activity Log
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-200">
                    New Faculty Onboarding
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Faculty profile added and synchronized with department database.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-200">
                    Subject Allocation Updated
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Subject mapping assigned to active teaching faculty.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-200">
                    Attendance Record Logged
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Student attendance logs updated for today&apos;s sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Overview */}
          <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-7 shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-extrabold text-white">
              Department Summary Overview
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-indigo-200">
              Welcome to the central department management panel for{" "}
              <span className="font-bold text-white">
                {hodData?.data?.department}
              </span>
              . Manage faculties, track attendance, and assign subjects efficiently.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-slate-800/80 px-4 py-3 text-xs">
                <span className="text-slate-400">Total Faculties</span>
                <span className="font-bold text-white">
                  {hodData?.facultyCount ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-slate-800/80 px-4 py-3 text-xs">
                <span className="text-slate-400">Total Students</span>
                <span className="font-bold text-emerald-400">
                  {hodData?.studentCount ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-slate-800/80 px-4 py-3 text-xs">
                <span className="text-slate-400">Total Subjects</span>
                <span className="font-bold text-amber-400">
                  {hodData?.subjectCount ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
