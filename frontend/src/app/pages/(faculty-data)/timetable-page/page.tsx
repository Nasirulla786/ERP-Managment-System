
"use client";

import useCurrentFaculty from "@/app/hooks/useCurrentFaculty";
import api from "@/app/lib/axios";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
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

      const response = await api.get(
        "/department-timetable/",
        {
          withCredentials: true,
        }
      );


      console.log(
        response
      )

      setTimetable(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <CalendarDays size={25} />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                My Timetable
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View your teaching schedule.
              </p>

            </div>

          </div>

        </div>


        {/* TIMETABLE */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Teaching Schedule
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your assigned classes and timings.
            </p>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="py-10 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading timetable...
              </p>

            </div>

          ) : timetable.length === 0 ? (

            /* EMPTY */

            <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center">

              <CalendarDays
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-medium text-slate-600">
                No classes scheduled
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Your timetable will appear here.
              </p>

            </div>

          ) : (

            /* TABLE */

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
                      Time
                    </th>

                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">
                      Room
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {timetable.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >

                      {/* DAY */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={17}
                            className="text-indigo-500"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {item.day}
                          </span>

                        </div>

                      </td>


                      {/* SUBJECT */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <BookOpen
                            size={17}
                            className="text-purple-500"
                          />

                          <span className="font-medium text-slate-800">
                            {item.subject}
                          </span>

                        </div>

                      </td>


                      {/* TIME */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <Clock
                            size={17}
                            className="text-green-500"
                          />

                          <span className="text-sm text-slate-600">
                            {item.start_time} - {item.end_time}
                          </span>

                        </div>

                      </td>


                      {/* ROOM */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <MapPin
                            size={17}
                            className="text-orange-500"
                          />

                          <span className="text-sm text-slate-600">
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
