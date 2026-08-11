
"use client";

import api from "@/app/lib/axios";
import React, { useEffect, useState } from "react";

const Page = () => {

  const [attendance, setAttendance] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);


  // --------------------------------
  // 1. Get all attendance history
  // --------------------------------

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const res = await api.get(
          "/attendance-history/",
          {
            withCredentials: true
          }
        );

        setAttendance(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchHistory();

  }, []);


  // --------------------------------
  // 2. Make unique dates
  // --------------------------------

  const dates = [
    ...new Set(
      attendance.map(
        (item: any) => item.date
      )
    )
  ];


  // --------------------------------
  // 3. When date is clicked
  // --------------------------------

  const handleDateClick = async (date: string) => {

    try {

      setSelectedDate(date);
      setDetailsLoading(true);

      const res = await api.get(
        `/get-attendance/DSA/?date=${date}`,
        {
          withCredentials: true
        }
      );

      setSelectedAttendance(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setDetailsLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-slate-50 p-8">

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Attendance History
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View attendance records by date
        </p>

      </div>


      {/* -------------------------------- */}
      {/* DATE LIST */}
      {/* -------------------------------- */}

      {!selectedDate && (

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="grid grid-cols-[1fr_150px] bg-slate-100 px-6 py-4 font-semibold text-slate-600">

            <div>
              Date
            </div>

            <div className="text-center">
              View
            </div>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="p-10 text-center text-slate-500">
              Loading attendance...
            </div>

          )}


          {/* DATE ROWS */}

          {!loading && dates.map((date) => (

            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className="grid cursor-pointer grid-cols-[1fr_150px] items-center border-t border-slate-100 px-6 py-5 hover:bg-slate-50"
            >

              {/* DATE */}

              <div>

                <p className="font-semibold text-slate-800">

                  {new Date(date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    }
                  )}

                </p>

                <p className="text-sm text-slate-500">
                  Click to view attendance
                </p>

              </div>


              {/* BUTTON */}

              <div className="text-center">

                <span className="rounded-lg bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                  View
                </span>

              </div>

            </div>

          ))}


          {/* EMPTY */}

          {!loading && dates.length === 0 && (

            <div className="p-10 text-center text-slate-500">
              No attendance history found.
            </div>

          )}

        </div>

      )}


      {/* -------------------------------- */}
      {/* SELECTED DATE */}
      {/* -------------------------------- */}

      {selectedDate && (

        <div>

          {/* BACK */}

          <button
            onClick={() => {
              setSelectedDate(null);
              setSelectedAttendance([]);
            }}
            className="mb-6 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Back
          </button>


          {/* DATE */}

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">

              {new Date(selectedDate).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                }
              )}

            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Attendance details
            </p>

          </div>


          {/* DETAILS LOADING */}

          {detailsLoading && (

            <div className="rounded-xl bg-white p-10 text-center text-slate-500">
              Loading students...
            </div>

          )}


          {/* STUDENTS */}

          {!detailsLoading && (

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">

              {/* HEADER */}

              <div className="grid grid-cols-[80px_1fr_180px] bg-slate-100 px-6 py-4 font-semibold text-slate-600">

                <div>
                  #
                </div>

                <div>
                  Student
                </div>

                <div className="text-center">
                  Attendance
                </div>

              </div>


              {/* STUDENTS */}

              {selectedAttendance.map(
                (item: any, index: number) => (

                  <div
                    key={item.id}
                    className="grid grid-cols-[80px_1fr_180px] items-center border-t border-slate-100 px-6 py-5"
                  >

                    {/* NUMBER */}

                    <div className="text-sm text-slate-500">
                      {index + 1}
                    </div>


                    {/* NAME */}

                    <div>

                      <p className="font-semibold text-slate-800">

                        {item.student?.profile?.user?.username ||
                          "Student"}

                      </p>

                      <p className="text-sm text-slate-500">

                        {item.student?.enrollment_no || "-"}

                      </p>

                    </div>


                    {/* STATUS */}

                    <div className="text-center">

                      {item.is_present ? (

                        <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
                          Present
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-700">
                          Absent
                        </span>

                      )}

                    </div>

                  </div>

                )
              )}


              {/* EMPTY */}

              {selectedAttendance.length === 0 && (

                <div className="p-10 text-center text-slate-500">
                  No attendance found for this date.
                </div>

              )}

            </div>

          )}

        </div>

      )}

    </div>

  );

};

export default Page;
