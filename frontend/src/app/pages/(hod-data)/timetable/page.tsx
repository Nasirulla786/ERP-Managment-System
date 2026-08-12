"use client";

import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { CalendarDays, Trash2, Clock, MapPin, Plus, BookOpen, User, CheckCircle2 } from "lucide-react";

interface Timetable {
  id: number;
  day: string;
  subject: string;
  room: string;
  start_time: string;
  end_time: string;
}

const Page = () => {
  // ================= FORM STATES =================
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [faculty, setFaculty] = useState("");
  const [room, setRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // ================= TIMETABLE STATES =================
  const [timetable, setTimetable] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= FETCH TIMETABLE =================
  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await api.get("/department-timetable/", {
        withCredentials: true,
      });
      console.log(response);
      setTimetable(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE TIMETABLE =================
  const createTimetable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(
        "/create-timetable/",
        {
          day: day,
          subject: subject,
          faculty: faculty,
          room: room,
          start_time: startTime,
          end_time: endTime,
        },
        {
          withCredentials: true,
        }
      );

      setMessage("Timetable created successfully.");
      setDay("");
      setSubject("");
      setFaculty("");
      setRoom("");
      setStartTime("");
      setEndTime("");
      fetchTimetable();
    } catch (error: any) {
      console.log(error);
      setMessage(
        error?.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteTimetable = async (id: number) => {
    try {
      await api.delete(`/timetable/${id}/`, {
        withCredentials: true,
      });

      setTimetable(timetable.filter((item: any) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <CalendarDays size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Department Timetable Manager
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Create and manage class schedule sessions and room allocations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Create Form Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-cyan-400" />
                Add Class Session Entry
              </h2>
              <p className="text-xs text-slate-400">
                Configure day, time slot, faculty, and room for a course
              </p>
            </div>
          </div>

          <form onSubmit={createTimetable} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* DAY */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Day of Week
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            {/* SUBJECT */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Data Structures"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* FACULTY */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Faculty Name
              </label>
              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="e.g. Dr. Priya Nair"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* ROOM */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Room / Lab
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. Lab 2 / Room 304"
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>

            {/* START TIME */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              />
            </div>

            {/* END TIME */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-blue-500 transition-all cursor-pointer disabled:opacity-50"
              >
                <Plus size={16} />
                <span>{loading ? "Creating Entry..." : "Add Session to Timetable"}</span>
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-xl">
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Timetable List Table */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Active Department Timetable
              </h2>
              <p className="text-xs text-slate-400">
                Scheduled classes across all days
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {timetable.length} Sessions
            </span>
          </div>

          {timetable.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <CalendarDays size={40} className="mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">
                No timetable entries configured yet.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form above to add your first session.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Day</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Faculty</th>
                    <th className="px-6 py-4">Room</th>
                    <th className="px-6 py-4">Timing</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {timetable.map((item: any) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-850/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-indigo-400">
                        {item.day}
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {item.subject}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.faculty}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <span className="rounded bg-slate-950 border border-slate-800 px-2 py-1 text-slate-300">
                          {item.room}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                          <Clock size={14} />
                          {item.start_time} - {item.end_time}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteTimetable(item.id)}
                          className="rounded-xl bg-rose-950/40 border border-rose-500/20 p-2 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
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
