
"use client";

import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  BookOpen,
  X,
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
  const [selectedDate, setSelectedDate] =
    useState<DateGroup | null>(null);

  // ================= FETCH ATTENDANCE =================

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

  // ================= OVERALL =================

  const totalClasses = attendance.length;

  const presentClasses = attendance.filter(
    (item) => item.is_present === true
  ).length;

  const absentClasses = attendance.filter(
    (item) => item.is_present === false
  ).length;

  const percentage =
    totalClasses === 0
      ? 0
      : Math.round((presentClasses / totalClasses) * 100);

  // ================= GROUP BY DATE =================

  const dateGroups: Record<string, Attendance[]> = {};

  attendance.forEach((item) => {
    // Ignore records where date is null
    if (!item.date) {
      return;
    }

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
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading attendance...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <CalendarCheck size={25} />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                My Attendance
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Check your overall and date-wise attendance.
              </p>

            </div>

          </div>

        </div>

        {/* ================= OVERALL ATTENDANCE ================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Percentage */}

          <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">

            <p className="text-sm text-indigo-100">
              Overall Attendance
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {percentage}%
            </h2>

            <p className="mt-2 text-sm text-indigo-100">
              Overall performance
            </p>

          </div>

          {/* Total */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Classes
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {totalClasses}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Attendance records
            </p>

          </div>

          {/* Present */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={19}
                className="text-green-600"
              />

              <p className="text-sm text-slate-500">
                Present
              </p>

            </div>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {presentClasses}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Classes attended
            </p>

          </div>

          {/* Absent */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-2">

              <XCircle
                size={19}
                className="text-red-600"
              />

              <p className="text-sm text-slate-500">
                Absent
              </p>

            </div>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {absentClasses}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Classes missed
            </p>

          </div>

        </div>

        {/* ================= DATE WISE ================= */}

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Attendance History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Click on a date to view your class-wise attendance.
            </p>

          </div>

          {groupedDates.length === 0 ? (

            <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center">

              <CalendarCheck
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-600">
                No dated attendance records
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Attendance dates will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {groupedDates.map((group) => {

                const present = group.records.filter(
                  (item) => item.is_present
                ).length;

                const absent = group.records.filter(
                  (item) => !item.is_present
                ).length;

                return (

                  <button
                    key={group.date}
                    onClick={() => setSelectedDate(group)}
                    className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                  >

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                      {/* DATE */}

                      <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                          <CalendarCheck size={22} />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">

                            {new Date(
                              group.date
                            ).toLocaleDateString("en-IN", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}

                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {group.records.length} class
                            {group.records.length > 1
                              ? "es"
                              : ""}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div className="flex items-center gap-2">

                        {present > 0 && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                            {present} Present
                          </span>
                        )}

                        {absent > 0 && (
                          <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                            {absent} Absent
                          </span>
                        )}

                        <span className="ml-2 text-sm font-medium text-indigo-600">
                          View
                        </span>

                      </div>

                    </div>

                  </button>

                );
              })}

            </div>

          )}

        </div>

        {/* ================= NULL DATE RECORDS ================= */}

        {attendance.some((item) => item.date === null) && (

          <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

            <p className="text-sm font-medium text-yellow-700">
              Note
            </p>

            <p className="mt-1 text-sm text-yellow-600">
              Some attendance records do not have a date yet,
              so they are not included in the date-wise history.
            </p>

          </div>

        )}

      </div>

      {/* ================= MODAL ================= */}

      {selectedDate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Attendance Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">

                  {new Date(
                    selectedDate.date
                  ).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}

                </p>

              </div>

              <button
                onClick={() => setSelectedDate(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="max-h-[60vh] overflow-y-auto p-6">

              <div className="space-y-3">

                {selectedDate.records.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                  >

                    {/* SUBJECT */}

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                        <BookOpen size={18} />
                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {item.subject}
                        </p>

                        <p className="text-xs text-slate-400">
                          Attendance ID: {item.id}
                        </p>

                      </div>

                    </div>

                    {/* STATUS */}

                    {item.is_present ? (

                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">

                        <CheckCircle2 size={16} />

                        Present

                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">

                        <XCircle size={16} />

                        Absent

                      </span>

                    )}

                  </div>

                ))}

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="border-t border-slate-200 p-4 text-right">

              <button
                onClick={() => setSelectedDate(null)}
                className="rounded-xl bg-slate-100 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Page;
