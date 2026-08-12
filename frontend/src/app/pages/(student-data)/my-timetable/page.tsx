"use client";

import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  BookOpen,
} from "lucide-react";

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
  faculty: Faculty;
  start_time: string;
  end_time: string;
  room: string;
  created_at: string;
}

const Page = () => {
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await api.get("/department-timetable/", {
        withCredentials: true,
      });

      setTimetable(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading student timetable...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Student" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <CalendarDays size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Class Schedule
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Weekly department lecture timetable, faculty assignments & room locations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {timetable.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl text-slate-500">
            <CalendarDays size={40} className="mx-auto text-slate-700 mb-3" />
            <h2 className="text-lg font-bold text-white">No Timetable Available</h2>
            <p className="mt-1 text-xs text-slate-400">
              Your department timetable schedule will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {days.map((day) => {
              const dayClasses = timetable.filter((item) => item.day === day);
              if (dayClasses.length === 0) return null;

              return (
                <div
                  key={day}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-5"
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        {day}
                      </span>
                      <span className="text-xs text-slate-400">
                        {dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"} scheduled
                      </span>
                    </div>
                  </div>

                  {/* Class Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {dayClasses.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 hover:border-indigo-500/40 transition-colors"
                      >
                        {/* Subject */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-extrabold text-white">
                              {item.subject}
                            </h3>
                            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                              Lecture Session
                            </p>
                          </div>
                          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400 border border-indigo-500/20">
                            <BookOpen size={16} />
                          </div>
                        </div>

                        {/* Timing */}
                        <div className="flex items-center gap-3 text-xs">
                          <div className="h-8 w-8 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                            <Clock3 size={15} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500">Session Time</p>
                            <p className="font-bold text-emerald-400">
                              {item.start_time} - {item.end_time}
                            </p>
                          </div>
                        </div>

                        {/* Faculty */}
                        <div className="flex items-center gap-3 text-xs">
                          <div className="h-8 w-8 rounded-xl bg-slate-900 border border-slate-800 text-violet-400 flex items-center justify-center shrink-0">
                            <UserRound size={15} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500">Faculty</p>
                            <p className="font-semibold text-slate-200">
                              {item.faculty?.name || "Faculty Member"}
                            </p>
                          </div>
                        </div>

                        {/* Room Location */}
                        <div className="flex items-center gap-3 text-xs pt-3 border-t border-slate-800/80">
                          <div className="h-8 w-8 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0">
                            <MapPin size={15} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500">Room Location</p>
                            <p className="font-bold text-amber-400">
                              {item.room || "Room not assigned"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
