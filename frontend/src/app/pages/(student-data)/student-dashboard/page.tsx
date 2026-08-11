
"use client";

import useCurrentstudent from "@/app/hooks/useCurrentStudent";
import api from "@/app/lib/axios";
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
  /*
   * IMPORTANT:
   * This hook is always called at the top level.
   */
  useCurrentstudent();

  const { studentData } = useSelector(
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

  // =========================================================
  // FETCH ALL DATA
  // =========================================================

  useEffect(() => {
    fetchNotices();
    fetchTimetable();
    fetchAttendance();
    fetchSubjects();
  }, []);

  // =========================================================
  // NOTICES
  // =========================================================

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

  // =========================================================
  // TIMETABLE
  // =========================================================

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

  // =========================================================
  // ATTENDANCE
  //
  // IMPORTANT:
  // This is EXACTLY the same API used by /my-attendance/
  // =========================================================

  const fetchAttendance = async () => {
    try {
      const response = await api.get("/my-attendance/", {
        withCredentials: true,
      });

      console.log("Dashboard attendance:", response.data);

      setAttendance(response.data);
    } catch (error) {
      console.log("Attendance error:", error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  // =========================================================
  // SUBJECTS
  // =========================================================

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

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await api.post(
        "/logout/",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.log("Logout error:", error);
      setLoggingOut(false);
    }
  };

  // =========================================================
  // GREETING
  // =========================================================

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

  // =========================================================
  // ATTENDANCE
  //
  // SAME LOGIC AS MY-ATTENDANCE PAGE
  // =========================================================

  const totalClasses = attendance.length;

  const presentClasses = attendance.filter(
    (item) => item.is_present === true
  ).length;

  const absentClasses = attendance.filter(
    (item) => item.is_present === false
  ).length;

  const overallAttendance =
    totalClasses === 0
      ? 0
      : Math.round((presentClasses / totalClasses) * 100);

  // =========================================================
  // ATTENDANCE STATUS
  // =========================================================

  const attendanceStatus =
    overallAttendance >= 85
      ? "Excellent"
      : overallAttendance >= 75
      ? "Good"
      : overallAttendance >= 65
      ? "Needs Attention"
      : "Low Attendance";

  // =========================================================
  // SUBJECT ATTENDANCE
  //
  // Use SAME attendance API records.
  // Null-date records are NOT removed here because the
  // /my-attendance/ overall percentage includes all records.
  // =========================================================

  const subjectAttendance = subjects.map((subject) => {
    const records = attendance.filter(
      (item) => item.subject === subject.name
    );

    const present = records.filter(
      (item) => item.is_present === true
    ).length;

    const total = records.length;

    const percentage =
      total === 0 ? 0 : Math.round((present / total) * 100);

    return {
      ...subject,
      present,
      total,
      percentage,
    };
  });

  // =========================================================
  // TODAY'S CLASSES
  // =========================================================

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todaysClasses = timetable.filter(
    (item) => item.day === todayName
  );

  // =========================================================
  // INITIALS
  // =========================================================

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

  // =========================================================
  // LOADING
  // =========================================================

  if (!studentData || loadingAttendance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc]">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-slate-900" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <GraduationCap size={21} />
            </div>

            <div>
              <p className="text-[15px] font-bold tracking-tight text-slate-900">
                Student Portal
              </p>

              <p className="text-xs text-slate-400">
                Academic Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-3 sm:flex">

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">
                  {student?.name ||
                    student?.profile?.user?.username ||
                    "Student"}
                </p>

                <p className="text-xs text-slate-400">
                  {student?.enrollment_no ||
                    student?.student_id ||
                    "Student"}
                </p>
              </div>

              {student?.image ? (
                <img
                  src={student.image}
                  alt="Student"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {initials}
                </div>
              )}

            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut size={17} />

              <span className="hidden sm:block">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-7 lg:px-8 lg:py-9">

        {/* ===================================================
            WELCOME
        =================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {today}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {getGreeting()},{" "}
                {student?.name ||
                  student?.profile?.user?.username ||
                  "Student"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Stay updated with your classes, attendance and academic
                performance.
              </p>

            </div>

            <div className="flex items-center gap-2">

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Course
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {student?.course || "BCA"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Semester
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {student?.semester || "-"}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ===================================================
            PROFILE + ATTENDANCE
        =================================================== */}

        <section className="grid gap-5 lg:grid-cols-3">

          {/* PROFILE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {student?.image ? (
                <img
                  src={student.image}
                  alt="Student profile"
                  className="h-24 w-24 rounded-2xl object-cover ring-1 ring-slate-200"
                />
              ) : (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white">
                  {initials}
                </div>
              )}

              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <UserRound size={14} />
                  Student Profile
                </div>

                <h2 className="mt-2 truncate text-2xl font-bold text-slate-900">
                  {student?.name ||
                    student?.profile?.user?.username ||
                    "Student"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {student?.enrollment_no ||
                    student?.student_id ||
                    "Enrollment number unavailable"}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    <Building2 size={14} />
                    {student?.department || "-"}
                  </span>

                  <span className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    <GraduationCap size={14} />
                    {student?.course || "BCA"}
                  </span>

                  <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    Semester {student?.semester || "-"}
                  </span>

                </div>

              </div>

              <div className="hidden rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 sm:block">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 size={16} />

                  <span className="text-xs font-semibold">
                    Active
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ATTENDANCE */}

          <Link
            href="/pages/my-attendance"
            className="rounded-2xl bg-slate-900 p-6 text-white transition hover:bg-slate-800"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Overall Attendance
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {overallAttendance}%
                </h2>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <TrendingUp size={21} />
              </div>

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  overallAttendance >= 75
                    ? "bg-emerald-400"
                    : "bg-red-400"
                }`}
                style={{
                  width: `${overallAttendance}%`,
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-xs text-slate-400">
                {attendanceStatus}
              </span>

              <span className="text-xs text-slate-400">
                Target: 75%
              </span>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">

              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-slate-400">
                  Present
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-400">
                  {presentClasses}
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-xs text-slate-400">
                  Absent
                </p>

                <p className="mt-1 text-xl font-bold text-red-400">
                  {absentClasses}
                </p>
              </div>

            </div>

          </Link>
        </section>

        {/* ===================================================
            STATS
        =================================================== */}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Subjects"
            value={loadingSubjects ? "..." : subjects.length}
            subtitle="Currently enrolled"
            icon={<BookOpen size={20} />}
          />

          <StatCard
            title="Attendance"
            value={loadingAttendance ? "..." : `${overallAttendance}%`}
            subtitle={`${presentClasses} classes attended`}
            icon={<ClipboardCheck size={20} />}
          />

          <StatCard
            title="Today's Classes"
            value={loadingTimetable ? "..." : todaysClasses.length}
            subtitle="Scheduled for today"
            icon={<CalendarDays size={20} />}
          />

          <StatCard
            title="Notices"
            value={loadingNotices ? "..." : notices.length}
            subtitle="Department updates"
            icon={<Bell size={20} />}
          />

        </section>

        {/* ===================================================
            SUBJECT ATTENDANCE
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Subject Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your attendance across enrolled subjects.
              </p>
            </div>

            <Link
              href="/pages/my-attendance"
              className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
            >
              View details
              <ChevronRight size={16} />
            </Link>

          </div>

          <div className="mt-6 divide-y divide-slate-100">

            {loadingSubjects || loadingAttendance ? (
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="py-5 first:pt-0"
                >
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

                  <div className="mt-3 h-2 animate-pulse rounded bg-slate-100" />
                </div>
              ))
            ) : subjectAttendance.length === 0 ? (

              <div className="py-12 text-center">

                <BookOpen
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No subject attendance available
                </p>

              </div>

            ) : (

              subjectAttendance.slice(0, 6).map((subject) => (

                <div
                  key={subject.id}
                  className="py-5 first:pt-0 last:pb-0"
                >

                  <div className="flex items-center justify-between">

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-slate-800">
                        {subject.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {subject.subject_code} · {subject.subject_type}
                      </p>

                    </div>

                    <div className="ml-4 text-right">

                      <p
                        className={`text-sm font-bold ${
                          subject.total === 0
                            ? "text-slate-400"
                            : subject.percentage >= 75
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {subject.total === 0
                          ? "N/A"
                          : `${subject.percentage}%`}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {subject.present}/{subject.total}
                      </p>

                    </div>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        subject.total === 0
                          ? "bg-slate-200"
                          : subject.percentage >= 75
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${subject.percentage}%`,
                      }}
                    />

                  </div>

                </div>

              ))
            )}

          </div>
        </section>

        {/* ===================================================
            QUICK ACCESS
        =================================================== */}

        <section className="mt-8">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Access
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Access frequently used academic services.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <ActionCard
              title="Attendance"
              description="View attendance records"
              icon={<ClipboardCheck size={20} />}
              sendLink="/pages/my-attendance"
            />

            <ActionCard
              title="Timetable"
              description="Check your class schedule"
              icon={<CalendarDays size={20} />}
              sendLink="/pages/timetable"
            />

            <ActionCard
              title="Assignments"
              description="View pending assignments"
              icon={<FileText size={20} />}
              sendLink="/pages/assignments"
            />

            <ActionCard
              title="Subjects"
              description="Explore enrolled subjects"
              icon={<BookOpen size={20} />}
              sendLink="/pages/subjects"
            />

          </div>
        </section>

        {/* ===================================================
            TODAY + NOTICES
        =================================================== */}

        <section className="mt-8 grid gap-5 lg:grid-cols-2">

          {/* TODAY'S CLASSES */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Today's Classes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your schedule for today.
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <Clock3 size={20} />
              </div>

            </div>

            <div className="mt-6 space-y-2">

              {loadingTimetable ? (

                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl bg-slate-100"
                  />
                ))

              ) : todaysClasses.length === 0 ? (

                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">

                  <CalendarDays
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    No classes today
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    You have no scheduled classes for today.
                  </p>

                </div>

              ) : (

                todaysClasses.slice(0, 4).map((item) => (

                  <div
                    key={item.id}
                    className="group flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <BookOpen size={17} />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.subject}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {typeof item.faculty === "string"
                            ? item.faculty
                            : item.faculty?.name || "Faculty"}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          Room {item.room}
                        </p>

                      </div>

                    </div>

                    <div className="ml-4 shrink-0 text-right">

                      <p className="text-sm font-bold text-slate-800">
                        {item.start_time}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        {item.end_time}
                      </p>

                    </div>

                  </div>
                ))
              )}

            </div>

            {todaysClasses.length > 4 && (
              <Link
                href="/pages/timetable"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                View complete timetable
                <ArrowRight size={15} />
              </Link>
            )}

          </div>

          {/* NOTICES */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Department Notices
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest announcements and updates.
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <Megaphone size={20} />
              </div>

            </div>

            <div className="mt-6 space-y-2">

              {loadingNotices ? (

                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl bg-slate-100"
                  />
                ))

              ) : notices.length === 0 ? (

                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">

                  <Megaphone
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    No new notices
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Department announcements will appear here.
                  </p>

                </div>

              ) : (

                notices.slice(0, 4).map((notice) => (

                  <div
                    key={notice.id}
                    className="flex gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Bell size={16} />
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-slate-800">
                        {notice.title}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {notice.description}
                      </p>

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            ACADEMIC INFORMATION
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Academic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your registered academic details.
              </p>
            </div>

            <span className="w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              Active Student
            </span>

          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <InfoItem
              title="Enrollment Number"
              value={student?.enrollment_no || "-"}
            />

            <InfoItem
              title="Course"
              value={student?.course || "-"}
            />

            <InfoItem
              title="Department"
              value={student?.department || "-"}
            />

            <InfoItem
              title="Semester"
              value={student?.semester || "-"}
            />

          </div>

        </section>

        {/* ===================================================
            FOOTER STATUS
        =================================================== */}

        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={16} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700">
                Account active
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Your academic portal access is active.
              </p>
            </div>

          </div>

          <p className="hidden text-xs text-slate-400 sm:block">
            Student Portal
          </p>

        </div>

      </main>
    </div>
  );
};

// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
          {icon}
        </div>

      </div>

    </div>
  );
};

// =========================================================
// ACTION CARD
// =========================================================

const ActionCard = ({
  title,
  description,
  icon,
  sendLink,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  sendLink: string;
}) => {
  return (
    <Link
      href={sendLink}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
          {icon}
        </div>

        <ArrowRight
          size={17}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-800"
        />

      </div>

      <h3 className="mt-5 text-sm font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </Link>
  );
};

// =========================================================
// INFO ITEM
// =========================================================

const InfoItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-2 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
};

export default Page;
