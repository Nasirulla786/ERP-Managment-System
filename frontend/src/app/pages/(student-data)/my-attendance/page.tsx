"use client";

import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  BookOpen,
  X,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface Student {
  id: number;
  name?: string;
  student_id?: string;
}

interface Attendance {
  id: number;
  student: Student;
  subject: string;
  date: string | null;
  is_present: boolean;
}

interface DateGroup {
  date: string;
  records: Attendance[];
}

const Page = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected date for modal
  const [selectedDate, setSelectedDate] = useState<DateGroup | null>(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get("/my-attendance/", {
        withCredentials: true,
      });

      console.log(response.data);
      setAttendance(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalClasses = attendance.length;
  const presentClasses = attendance.filter((item) => item.is_present === true).length;
  const absentClasses = attendance.filter((item) => item.is_present === false).length;

  const percentage =
    totalClasses === 0 ? 0 : Math.round((presentClasses / totalClasses) * 100);

  const dateGroups: Record<string, Attendance[]> = {};

  attendance.forEach((item) => {
    if (!item.date) return;

    if (!dateGroups[item.date]) {
      dateGroups[item.date] = [];
    }

    dateGroups[item.date].push(item);
  });

  const groupedDates: DateGroup[] = Object.keys(dateGroups)
    .map((date) => ({
      date: date,
      records: dateGroups[date],
    }))
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading attendance history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Student" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CalendarCheck size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Attendance Record
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Check overall percentage performance and date-wise session breakdown
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Percentage */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 to-slate-900 p-6 shadow-xl text-white">
            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              Overall Attendance
            </p>
            <h2 className="mt-2 text-4xl font-black text-white">{percentage}%</h2>
            <p className="mt-2 text-xs text-emerald-200/80">Academic standing status</p>
          </div>

          {/* Total */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Sessions
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">{totalClasses}</h2>
            <p className="mt-1 text-xs text-slate-500">Attendance logs</p>
          </div>

          {/* Present */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 size={18} />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Classes Present
              </p>
            </div>
            <h2 className="mt-2 text-3xl font-black text-emerald-400">{presentClasses}</h2>
            <p className="mt-1 text-xs text-slate-500">Classes attended</p>
          </div>

          {/* Absent */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400">
              <XCircle size={18} />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Classes Absent
              </p>
            </div>
            <h2 className="mt-2 text-3xl font-black text-rose-400">{absentClasses}</h2>
            <p className="mt-1 text-xs text-slate-500">Classes missed</p>
          </div>
        </div>

        {/* Date Wise Attendance */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar size={18} className="text-emerald-400" />
              Session Date History Log
            </h2>
            <p className="text-xs text-slate-400">
              Click on any date entry to view subject-wise attendance breakdown
            </p>
          </div>

          {groupedDates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center text-slate-500">
              <CalendarCheck size={40} className="mx-auto text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-400">
                No dated attendance records found
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {groupedDates.map((group) => {
                const present = group.records.filter((item) => item.is_present).length;
                const absent = group.records.filter((item) => !item.is_present).length;

                return (
                  <button
                    key={group.date}
                    onClick={() => setSelectedDate(group)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-left transition-all hover:border-emerald-500/40 hover:bg-slate-900 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center">
                        <CalendarCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          {new Date(group.date).toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {group.records.length} {group.records.length > 1 ? "classes" : "class"} logged
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      {present > 0 && (
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-bold text-emerald-400">
                          {present} Present
                        </span>
                      )}

                      {absent > 0 && (
                        <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 font-bold text-rose-400">
                          {absent} Absent
                        </span>
                      )}

                      <span className="ml-2 font-bold text-indigo-400">View Details →</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Null Date Notice */}
        {attendance.some((item) => item.date === null) && (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-400">
            <AlertCircle size={18} className="shrink-0" />
            <div>
              <p className="font-bold text-white">System Note</p>
              <p className="mt-0.5 text-amber-400/80">
                Some overall percentage logs were recorded without an assigned date stamp.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup for Date Details */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Class Session Attendance Details
                </h2>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                  {new Date(selectedDate.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => setSelectedDate(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-1">
              {selectedDate.records.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 flex items-center justify-center">
                      <BookOpen size={17} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{item.subject}</p>
                      <p className="text-[10px] text-slate-500">Log ID: {item.id}</p>
                    </div>
                  </div>

                  {item.is_present ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 font-bold text-emerald-400">
                      <CheckCircle2 size={14} />
                      Present
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-3.5 py-1 font-bold text-rose-400">
                      <XCircle size={14} />
                      Absent
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedDate(null)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
