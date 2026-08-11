
"use client";

import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { CalendarDays, Trash2 } from "lucide-react";

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

      console.log(response)

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

      // form clear
      setDay("");
      setSubject("");
      setFaculty("");
      setRoom("");
      setStartTime("");
      setEndTime("");

      // refresh timetable
      fetchTimetable();
    } catch (error: any) {
      console.log(error);

      setMessage(
        error?.response?.data?.message ||
          "Something went wrong."
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

      setTimetable(
        timetable.filter((item:any) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <CalendarDays size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Department Timetable
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage your department timetable.
              </p>
            </div>

          </div>

        </div>


        {/* ================= CREATE FORM ================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-slate-800">
            Create Timetable
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add a new class to the department timetable.
          </p>


          <form
            onSubmit={createTimetable}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >

            {/* DAY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Day
              </label>

              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              >

                <option value="">
                  Select Day
                </option>

                <option value="Monday">
                  Monday
                </option>

                <option value="Tuesday">
                  Tuesday
                </option>

                <option value="Wednesday">
                  Wednesday
                </option>

                <option value="Thursday">
                  Thursday
                </option>

                <option value="Friday">
                  Friday
                </option>

                <option value="Saturday">
                  Saturday
                </option>

              </select>

            </div>


            {/* SUBJECT */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>


            {/* FACULTY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Faculty
              </label>

              <input
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Enter faculty name"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>


            {/* ROOM */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Room</label>

              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Example: Lab 2"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>


            {/* START TIME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>


            {/* END TIME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />

            </div>


            {/* BUTTON */}

            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >

                {loading
                  ? "Creating..."
                  : "Create Timetable"}

              </button>

            </div>

          </form>


          {message && (
            <p className="mt-4 text-sm text-indigo-600">
              {message}
            </p>
          )}

        </div>


        {/* ================= TIMETABLE LIST ================= */}

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Timetable
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All classes in your department.
            </p>

          </div>


          {timetable.length === 0 ? (

            <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center">

              <CalendarDays
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-600">
                No timetable available
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Create your first timetable entry above.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-slate-200">

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Day
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Subject
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Faculty
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Room
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Time
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {timetable.map((item:any) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100"
                    >

                      <td className="px-4 py-4 text-sm text-slate-700">
                        {item.day}
                      </td>

                      <td className="px-4 py-4 font-medium text-slate-800">
                        {item.subject}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.faculty}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.room}
                      </td>

                      <td className="px-4 py-4 text-sm text-slate-600">
                        {item.start_time} - {item.end_time}
                      </td>

                      <td className="px-4 py-4">

                        <button
                          onClick={() => deleteTimetable(item.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >

                          <Trash2 size={17} />

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
