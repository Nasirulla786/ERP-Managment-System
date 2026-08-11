
"use client";

import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
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
      const response = await api.get(
        "/department-timetable/",
        {
          withCredentials: true,
        }
      );

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
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading timetable...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <CalendarDays size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                My Timetable
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View your department's class schedule.
              </p>
            </div>

          </div>
        </div>


        {/* ================= EMPTY ================= */}

        {timetable.length === 0 ? (

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <CalendarDays
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              No timetable available
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your department timetable will appear here.
            </p>

          </div>

        ) : (

          /* ================= DAYS ================= */

          <div className="space-y-6">

            {days.map((day) => {

              const dayClasses = timetable.filter(
                (item) => item.day === day
              );

              if (dayClasses.length === 0) {
                return null;
              }

              return (
                <div
                  key={day}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >

                  {/* DAY HEADER */}

                  <div className="mb-5 flex items-center gap-3">

                    <div className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
                      {day}
                    </div>

                    <span className="text-sm text-slate-400">
                      {dayClasses.length}{" "}
                      {dayClasses.length === 1
                        ? "class"
                        : "classes"}
                    </span>

                  </div>


                  {/* CLASS CARDS */}

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {dayClasses.map((item) => (

                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:shadow-sm"
                      >

                        {/* SUBJECT */}

                        <div className="flex items-start justify-between">

                          <div>
                            <h3 className="text-lg font-bold text-slate-800">
                              {item.subject}
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                              Department Class
                            </p>
                          </div>

                          <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                            <Clock3 size={20} />
                          </div>

                        </div>


                        {/* TIME */}

                        <div className="mt-5 flex items-center gap-3">

                          <div className="rounded-lg bg-white p-2 text-indigo-600">
                            <Clock3 size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Time
                            </p>

                            <p className="text-sm font-medium text-slate-700">
                              {item.start_time} - {item.end_time}
                            </p>
                          </div>

                        </div>


                        {/* FACULTY */}

                        <div className="mt-4 flex items-center gap-3">

                          <div className="rounded-lg bg-white p-2 text-indigo-600">
                            <UserRound size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Faculty
                            </p>

                            <p className="text-sm font-medium text-slate-700">
                              {item.faculty?.name ||
                                "Faculty not available"}
                            </p>
                          </div>

                        </div>


                        {/* ROOM */}

                        <div className="mt-4 flex items-center gap-3">

                          <div className="rounded-lg bg-white p-2 text-indigo-600">
                            <MapPin size={17} />
                          </div>

                          <div>
                            <p className="text-xs text-slate-400">
                              Room
                            </p>

                            <p className="text-sm font-medium text-slate-700">
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
