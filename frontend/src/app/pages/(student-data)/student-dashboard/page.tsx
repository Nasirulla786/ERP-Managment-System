"use client";

import useCurrentstudent from "@/app/hooks/useCurrentStudent";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { RootState } from "@/redux/store";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  GraduationCap,
  LogOut,
  Megaphone,
  TrendingUp,
  UserRound,
  XCircle,
  ChevronRight,
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

interface Faculty {
  id: number;
  name: string;
  faculty_id: string;
  department: string;
  image?: string;
}

interface Timetable {
  id: number;
  department: string;
  day: string;
  subject: string;
  faculty: Faculty | string;
  room: string;
  start_time: string;
  end_time: string;
}

interface AttendanceStudent {
  id: number;
  name?: string;
  student_id?: string;
}

interface Attendance {
  id: number;
  student: AttendanceStudent;
  subject: string;
  date: string | null;
  is_present: boolean;
}

interface Subject {
  id: number;
  name: string;
  subject_code: string;
  course: string;
  department: string;
  semester: number;
  total_marks: number;
  subject_type: string;
}

const Page = () => {
  useCurrentstudent();

  const { studentData }: any = useSelector(
    (state: RootState) => state.student
  );

  const student: any = studentData?.data || studentData;

  const [notices, setNotices] = useState<Notice[]>([]);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [loadingNotices, setLoadingNotices] = useState(true);
  const [loadingTimetable, setLoadingTimetable] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchNotices();
    fetchTimetable();
    fetchAttendance();
    fetchSubjects();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await api.get("/department-notices/", {
        withCredentials: true,
      });
      setNotices(response.data);
    } catch (error) {
      console.log("Notices error:", error);
    } finally {
      setLoadingNotices(false);
    }
  };

  const fetchTimetable = async () => {
    try {
      const response = await api.get("/timetable/", {
        withCredentials: true,
      });
      setTimetable(response.data);
    } catch (error) {
      console.log("Timetable error:", error);
    } finally {
      setLoadingTimetable(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await api.get("/my-attendance/", {
        withCredentials: true,
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("Attendance error:", error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/subjects/", {
        withCredentials: true,
      });
      setSubjects(response.data);
    } catch (error) {
      console.log("Subjects error:", error);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/logout/", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.log("Logout error:", error);
      setLoggingOut(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const totalClasses = attendance.length;
  const presentClasses = attendance.filter((item) => item.is_present === true).length;
  const absentClasses = attendance.filter((item) => item.is_present === false).length;

  const overallAttendance =
    totalClasses === 0 ? 0 : Math.round((presentClasses / totalClasses) * 100);

  const attendanceStatus =
    overallAttendance >= 85
      ? "Excellent Performance"
      : overallAttendance >= 75
      ? "Good Standing"
      : overallAttendance >= 65
      ? "Needs Attention"
      : "Low Attendance Warning";

  const subjectAttendance = subjects.map((subject) => {
    const records = attendance.filter((item) => item.subject === subject.name);
    const present = records.filter((item) => item.is_present === true).length;
    const total = records.length;
    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    return {
      ...subject,
      present,
      total,
      percentage,
    };
  });

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todaysClasses = timetable.filter((item) => item.day === todayName);

  const initials = (
    student?.name ||
    student?.profile?.user?.username ||
    "S"
  )
    .split(" ")
    .map((name: string) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!studentData || loadingAttendance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      {/* Top Navbar Component */}
      <Navbar
        role="Student"
        userName={student?.name || student?.profile?.user?.username}
        userSubtitle={student?.enrollment_no}
        userImage={student?.image}
      />

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 py-10 px-4 sm:px-8">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-widest mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {today}
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {getGreeting()},{" "}
              <span className="text-emerald-400">
                {student?.name || student?.profile?.user?.username || "Student"}
              </span>
            </h1>

            <p className="mt-1.5 text-sm text-slate-400 max-w-xl leading-relaxed">
              Stay updated with your daily timetable schedule, overall attendance metrics, enrolled subjects, and department announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Course Degree
              </p>
              <p className="text-sm font-bold text-white">{student?.course || "BCA"}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 backdrop-blur">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Semester
              </p>
              <p className="text-sm font-bold text-emerald-400">Semester {student?.semester || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Profile Card + Overall Attendance Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {student?.image ? (
                <img
                  src={student.image}
                  alt="Student Profile"
                  className="h-24 w-24 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-xl ring-4 ring-emerald-500/10 shrink-0"
                />
              ) : (
                <div className="h-24 w-24 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-xl font-bold text-emerald-400 shrink-0">
                  {initials}
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
                  <UserRound size={13} />
                  Student Academic Profile
                </div>

                <h2 className="text-2xl font-extrabold text-white">
                  {student?.name || student?.profile?.user?.username || "Student"}
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  Enrollment: {student?.enrollment_no || student?.student_id || "-"}
                </p>

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2.5 text-xs">
                  <span className="flex items-center gap-1.5 rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 font-semibold text-slate-300">
                    <Building2 size={14} className="text-emerald-400" />
                    {student?.department || "-"}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 font-semibold text-slate-300">
                    <GraduationCap size={14} className="text-emerald-400" />
                    {student?.course || "BCA"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Attendance Card Widget */}
          <Link
            href="/pages/my-attendance"
            className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Overall Attendance
                  </p>
                  <h2 className="mt-2 text-4xl font-black text-white">
                    {overallAttendance}%
                  </h2>
                </div>

                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <TrendingUp size={20} />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-950 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    overallAttendance >= 75
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : "bg-gradient-to-r from-rose-500 to-pink-500"
                  }`}
                  style={{ width: `${overallAttendance}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400">{attendanceStatus}</span>
                <span className="text-slate-500">Target: 75%</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs pt-4 border-t border-slate-800/80">
              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <p className="text-slate-500">Present</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{presentClasses}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-2.5 border border-slate-800/80">
                <p className="text-slate-500">Absent</p>
                <p className="text-lg font-bold text-rose-400 mt-0.5">{absentClasses}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Enrolled Subjects"
            value={loadingSubjects ? "..." : subjects.length}
            subtitle="Current semester"
            icon={<BookOpen size={20} />}
            color="purple"
          />
          <StatCard
            title="Attendance"
            value={loadingAttendance ? "..." : `${overallAttendance}%`}
            subtitle={`${presentClasses} classes attended`}
            icon={<ClipboardCheck size={20} />}
            color="emerald"
          />
          <StatCard
            title="Today's Classes"
            value={loadingTimetable ? "..." : todaysClasses.length}
            subtitle="Scheduled lectures"
            icon={<CalendarDays size={20} />}
            color="blue"
          />
          <StatCard
            title="Notices"
            value={loadingNotices ? "..." : notices.length}
            subtitle="Department updates"
            icon={<Bell size={20} />}
            color="amber"
          />
        </div>

        {/* Subject Attendance Breakdown */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Course Subject Attendance
              </h2>
              <p className="text-xs text-slate-400">
                Monitor your present vs absent record across individual subjects
              </p>
            </div>

            <Link
              href="/pages/my-attendance"
              className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline"
            >
              <span>View Attendance History</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {loadingSubjects || loadingAttendance ? (
              [1, 2, 3].map((item) => (
                <div key={item} className="py-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
                  <div className="mt-2 h-2 animate-pulse rounded bg-slate-800" />
                </div>
              ))
            ) : subjectAttendance.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <BookOpen size={36} className="mx-auto text-slate-700 mb-2" />
                <p className="text-xs font-semibold text-slate-400">
                  No subject attendance records found
                </p>
              </div>
            ) : (
              subjectAttendance.slice(0, 6).map((subject) => (
                <div key={subject.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white text-sm">{subject.name}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {subject.subject_code} • {subject.subject_type || "Core"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-black text-sm ${
                          subject.total === 0
                            ? "text-slate-500"
                            : subject.percentage >= 75
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {subject.total === 0 ? "N/A" : `${subject.percentage}%`}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500">
                        {subject.present}/{subject.total} Present
                      </p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-950 border border-slate-800/80">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        subject.total === 0
                          ? "bg-slate-800"
                          : subject.percentage >= 75
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Portal Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link
            href="/pages/my-subjects"
            className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-purple-500/40"
          >
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 mb-3">
              <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-purple-400 transition-colors">
              My Subjects
            </h3>
            <p className="text-xs text-slate-400 mt-1">Explore course syllabus & marks</p>
          </Link>

          <Link
            href="/pages/my-timetable"
            className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 mb-3">
              <CalendarDays size={20} />
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
              My Timetable
            </h3>
            <p className="text-xs text-slate-400 mt-1">View class lecture timings</p>
          </Link>

          <Link
            href="/pages/my-attendance"
            className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl transition-all hover:-translate-y-1 hover:border-emerald-500/40"
          >
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-3">
              <ClipboardCheck size={20} />
            </div>
            <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
              My Attendance
            </h3>
            <p className="text-xs text-slate-400 mt-1">Detailed date-wise attendance</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, color }: any) => {
  const colorMap: any = {
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
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

export default Page;
  