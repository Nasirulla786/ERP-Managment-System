"use client";

import api from "@/app/lib/axios";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { History, Calendar, ArrowLeft, CheckCircle2, XCircle, User } from "lucide-react";

const Page = () => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/attendance-history/", {
          withCredentials: true,
        });

        setAttendance(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const dates = [
    ...new Set(attendance.map((item: any) => item.date)),
  ];

  const handleDateClick = async (date: string) => {
    try {
      setSelectedDate(date);
      setDetailsLoading(true);

      const res = await api.get(`/get-attendance/DSA/?date=${date}`, {
        withCredentials: true,
      });

      setSelectedAttendance(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDetailsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Faculty" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <History size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Attendance History Logs
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                View submitted class attendance sessions by date
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-8 space-y-6">
        {!selectedDate && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_150px] bg-slate-950 border-b border-slate-800 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <div>Session Date</div>
              <div className="text-center">Action</div>
            </div>

            {loading && (
              <div className="p-12 text-center text-slate-400">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-2" />
                <p className="text-xs">Loading attendance history...</p>
              </div>
            )}

            {!loading &&
              dates.map((date) => (
                <div
                  key={date}
                  onClick={() => handleDateClick(date)}
                  className="grid cursor-pointer grid-cols-[1fr_150px] items-center border-t border-slate-800/80 px-6 py-5 transition-colors hover:bg-slate-850/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {new Date(date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Click to view student attendance log details
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 text-xs font-bold text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors">
                      View Session
                    </span>
                  </div>
                </div>
              ))}

            {!loading && dates.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                <History size={40} className="mx-auto text-slate-700 mb-3" />
                <p className="text-sm font-semibold text-slate-300">
                  No attendance history records found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Date View */}
        {selectedDate && (
          <div className="space-y-6">
            <button
              onClick={() => {
                setSelectedDate(null);
                setSelectedAttendance([]);
              }}
              className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to History List</span>
            </button>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
              <h2 className="text-xl font-extrabold text-white">
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Attendance logs for subject sessions on this date
              </p>
            </div>

            {detailsLoading && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center text-slate-400">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-2" />
                <p className="text-xs">Loading session students...</p>
              </div>
            )}

            {!detailsLoading && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
                <div className="grid grid-cols-[60px_1fr_160px] bg-slate-950 border-b border-slate-800 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <div>#</div>
                  <div>Student</div>
                  <div className="text-center">Status</div>
                </div>

                {selectedAttendance.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[60px_1fr_160px] items-center border-t border-slate-800/80 px-6 py-4 hover:bg-slate-850/60"
                  >
                    <div className="text-xs font-bold text-slate-500">{index + 1}</div>

                    <div>
                      <p className="font-bold text-white text-sm">
                        {item.student?.profile?.user?.username || "Student"}
                      </p>
                      <p className="text-xs text-slate-400">
                        Enrollment: {item.student?.enrollment_no || "-"}
                      </p>
                    </div>

                    <div className="text-center">
                      {item.is_present ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400">
                          <CheckCircle2 size={13} />
                          Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-3.5 py-1 text-xs font-bold text-rose-400">
                          <XCircle size={13} />
                          Absent
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {selectedAttendance.length === 0 && (
                  <div className="p-12 text-center text-slate-500">
                    No attendance records found for this date.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
