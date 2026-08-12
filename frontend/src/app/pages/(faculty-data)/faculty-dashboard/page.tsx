"use client";

import useCurrentFaculty from "@/app/hooks/useCurrentFaculty";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { RootState } from "@/redux/store";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Megaphone,
  Users,
  Clock3,
  ArrowRight,
  CheckCircle2,
  UserRound,
  Building2,
  BookMarked,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Notice {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: string;
}

const Page = () => {
  useCurrentFaculty();

  const { facultyData }: any = useSelector(
    (state: RootState) => state.faculty
  );

  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeLoading, setNoticeLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/department-notices/", {
        withCredentials: true,
      });
      setNotices(res.data);
    } catch (error) {
      console.log("Notice fetch error:", error);
    } finally {
      setNoticeLoading(false);
    }
  };

  if (!facultyData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">
            Loading faculty dashboard...
          </p>
        </div>
      </div>
    );
  }

  const faculty = facultyData?.data || facultyData;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar
        role="Faculty"
        userName={faculty?.name || "Faculty Member"}
        userSubtitle={faculty?.department}
        userImage={faculty?.image}
      />

      {/* Header Portal Banner */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-10 px-4 sm:px-8">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-400 border border-violet-500/20 uppercase tracking-widest mb-3">
              <Sparkles size={14} />
              Faculty Academic Workspace
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Welcome back, {faculty?.name || "Faculty"} 👋
            </h1>
            <p className="mt-1.5 text-sm text-slate-400 max-w-xl leading-relaxed">
              Manage your teaching classes, mark student attendance, track timetable schedules, and upload assignments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Faculty ID
              </p>
              <p className="text-sm font-bold text-violet-400">
                {faculty?.faculty_id || "-"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Department
              </p>
              <p className="text-sm font-bold text-white">
                {faculty?.department || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Profile + Assigned Subject Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Faculty Profile Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {faculty?.image ? (
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="h-28 w-28 rounded-2xl border-2 border-violet-500/40 object-cover shadow-xl ring-4 ring-violet-500/10 shrink-0"
                />
              ) : (
                <div className="h-28 w-28 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-violet-400 shrink-0">
                  <UserRound size={40} />
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-0.5 text-xs font-bold text-violet-400 border border-violet-500/20 mb-2">
                  <UserRound size={13} />
                  Faculty Member
                </div>

                <h2 className="text-2xl font-extrabold text-white">
                  {faculty?.name || "Faculty Name"}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Faculty ID: {faculty?.faculty_id || "-"}
                </p>

                <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-300">
                    <Building2 size={14} className="text-violet-400" />
                    <span>{faculty?.department || "Department"}</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-300">
                    <BookOpen size={14} className="text-violet-400" />
                    <span>{faculty?.subject || "Subject"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Subject Highlight */}
          <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/60 to-slate-900 p-6 sm:p-8 shadow-xl text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-2xl bg-violet-500/20 p-3 text-violet-300 border border-violet-500/30">
                  <BookMarked size={24} />
                </div>
                <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300 border border-violet-500/30 uppercase tracking-widest">
                  Assigned
                </span>
              </div>

              <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider">
                Current Teaching Subject
              </p>

              <h2 className="mt-2 text-2xl font-black text-white">
                {faculty?.assigned_subject || "Not Assigned"}
              </h2>

              <p className="mt-2 text-xs text-violet-200/80 leading-relaxed">
                Currently allocated course subject for session lectures and attendance logs.
              </p>
            </div>
          </div>
        </div>

        {/* Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="My Students"
            value="Directory"
            subtitle="View student list"
            icon={<GraduationCap size={22} />}
            color="blue"
          />
          <StatCard
            title="My Subjects"
            value="1"
            subtitle="Assigned subject"
            icon={<BookOpen size={22} />}
            color="purple"
          />
          <StatCard
            title="Today's Classes"
            value="Timetable"
            subtitle="Teaching schedule"
            icon={<CalendarDays size={22} />}
            color="emerald"
          />
          <StatCard
            title="Attendance"
            value="Marking"
            subtitle="Take attendance"
            icon={<ClipboardCheck size={22} />}
            color="amber"
          />
        </div>

        {/* Quick Actions Grid */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Quick Actions Portal
            </h2>
            <p className="text-xs text-slate-400">
              Frequently accessed teaching tools and student management modules
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ActionCard
              title="My Students"
              description="View enrolled students roster"
              icon={<Users size={22} />}
              color="blue"
              sendLink="/pages/my-students"
            />
            <ActionCard
              title="Mark Attendance"
              description="Take and update class attendance"
              icon={<ClipboardCheck size={22} />}
              color="emerald"
              sendLink="/pages/attendence-page"
            />
            <ActionCard
              title="Assignments"
              description="Create and upload course tasks"
              icon={<FileText size={22} />}
              color="purple"
              sendLink="/pages/assignment-page"
            />
            <ActionCard
              title="Timetable"
              description="View teaching class schedule"
              icon={<CalendarDays size={22} />}
              color="amber"
              sendLink="/pages/timetable-page"
            />
          </div>
        </div>

        {/* Today's Schedule & Department Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Schedule Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Today's Class Schedule
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scheduled lectures and sessions for today
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400 border border-indigo-500/20">
                <Clock3 size={20} />
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 p-8 text-center">
              <CalendarDays size={36} className="mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-bold text-slate-300">
                Class Timetable Configured
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Access your teaching schedule matrix via Timetable link above.
              </p>
            </div>
          </div>

          {/* Department Notices */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Department Notices
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest announcements published by HOD
                </p>
              </div>

              <div className="rounded-2xl bg-rose-500/10 p-3 text-rose-400 border border-rose-500/20">
                <Megaphone size={20} />
              </div>
            </div>

            <div className="space-y-3">
              {noticeLoading ? (
                <div className="rounded-2xl border border-slate-800 p-6 text-center text-slate-400">
                  <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-rose-500/20 border-t-rose-500 mb-2" />
                  <p className="text-xs">Loading department notices...</p>
                </div>
              ) : notices.length === 0 ? (
                <Notice
                  title="No new notices"
                  description="New announcements published by HOD will appear here."
                />
              ) : (
                notices.slice(0, 3).map((notice) => (
                  <Notice
                    key={notice.id}
                    title={notice.title}
                    description={notice.description}
                    date={notice.created_at}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Active Banner */}
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-xs font-semibold text-emerald-400">
          <CheckCircle2 size={20} className="shrink-0" />
          <div>
            <p className="font-bold text-white">Faculty Account Active</p>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">
              Authorized access to department student attendance, timetable and academic resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper UI Components */
const StatCard = ({ title, value, subtitle, icon, color }: any) => {
  const colorMap: any = {
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{value}</h3>
          <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>
        </div>

        <div className={`rounded-2xl p-3 border ${colorMap[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

const ActionCard = ({ title, description, icon, color, sendLink }: any) => {
  const colorMap: any = {
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  };

  return (
    <Link
      href={sendLink}
      className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-violet-500/40 hover:bg-slate-900"
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-2xl p-3 border ${colorMap[color]}`}>{icon}</div>

        <ArrowRight
          size={18}
          className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-violet-400"
        />
      </div>

      <h3 className="mt-5 font-bold text-white text-base group-hover:text-violet-400 transition-colors">
        {title}
      </h3>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </Link>
  );
};

const Notice = ({ title, description, date }: any) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-slate-700">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-rose-500/10 p-2 text-rose-400 border border-rose-500/20 shrink-0">
          <Megaphone size={16} />
        </div>

        <div className="flex-1">
          <p className="font-bold text-sm text-slate-200">{title}</p>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">{description}</p>
          {date && (
            <p className="mt-2 text-[10px] font-semibold text-slate-500">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
