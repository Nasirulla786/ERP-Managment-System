"use client";

import useCurrentFaculty from "@/app/hooks/useCurrentFaculty";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
  RefreshCw,
} from "lucide-react";

interface Timetable {
  id: number;
  day: string;
  subject: string;
  room: string;
  start_time: string;
  end_time: string;
}

const Page = () => {
  useCurrentFaculty();

  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const response = await api.get("/department-timetable/", {
        withCredentials: true,
      });

      console.log(response);
      setTimetable(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Faculty" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <CalendarDays size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Teaching Timetable Schedule
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Weekly class timetable matrix and room allocations
            </p>
          </div>

          <button
            onClick={fetchTimetable}
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all w-fit cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Refresh Schedule</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Assigned Lectures Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Session time slots and room numbers
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {timetable.length} Sessions
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-amber-500/20 border-t-amber-500 mb-3" />
              <p className="text-xs">Loading teaching schedule...</p>
            </div>
          ) : timetable.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <CalendarDays size={40} className="mx-auto text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-300">
                No classes scheduled in timetable.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Day</th>
                    <th className="px-6 py-4">Subject Course</th>
                    <th className="px-6 py-4">Time Slot</th>
                    <th className="px-6 py-4">Room Allocation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {timetable.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-850/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-indigo-400">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-indigo-400" />
                          <span>{item.day}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} className="text-purple-400" />
                          <span>{item.subject}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-emerald-400 font-semibold">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-emerald-400" />
                          <span>
                            {item.start_time} - {item.end_time}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin size={16} className="text-amber-400" />
                          <span className="rounded bg-slate-950 border border-slate-800 px-2 py-1 font-semibold">
                            {item.room}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
