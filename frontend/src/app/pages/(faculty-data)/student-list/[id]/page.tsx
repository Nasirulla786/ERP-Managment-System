
"use client";

import api from "@/app/lib/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Student } from "../../my-students/page";

const Page = () => {
  const params = useParams();

  const subject = params.id;

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAttendance, setTotalAttendance] = useState([])
  const [fromBackendAttendance, setFromBackendAttendance] = useState([])


  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/my-students/", {
        withCredentials: true,
      });

      setStudents(response.data);


    } catch (err) {
      console.log("Student fetch error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get(`/get-attendance/${subject}/`, { withCredentials: true })
        // console.log("this is",res)
        setFromBackendAttendance(res.data)

      } catch (error) {
        console.log(error)

      }
    }
    fetchAttendance()

  }, [])


  const handleSubmit = async () => {
    console.log("Subject:", subject);
    const res = await api.post("/mark-attendance/", totalAttendance, { withCredentials: true })
    console.log("this is ", res)

  };


  const [attendance, setAttendance] = useState<any>({});

  useEffect(() => {
    const data: any = {};

    fromBackendAttendance.forEach((att: any) => {
      data[att.student] = att.is_present;
    });

    setAttendance(data);
  }, [fromBackendAttendance]);



  // console.log(fromBackendAttendance)

  // console.log("this is",totalAttendance)


  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Subject: {subject}
        </p>
      </div>

      {/* STUDENT LIST */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[80px_1fr_180px_120px] items-center bg-slate-100 px-6 py-4 text-sm font-semibold text-slate-600">

          <div>#</div>

          <div>Student</div>

          <div>Enrollment No</div>

          <div className="text-center">
            Attendance
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="p-10 text-center text-slate-500">
            Loading students...
          </div>
        )}

        {/* EMPTY */}
        {!loading && students.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No students found.
          </div>
        )}

        {/* STUDENTS */}
        {!loading &&
          students.map((student, index) => {


            return (
              <div
                key={student.id}
                className="grid grid-cols-[80px_1fr_180px_120px] items-center border-t border-slate-100 px-6 py-4 hover:bg-slate-50"
              >

                {/* NUMBER */}
                <div className="text-sm text-slate-500">
                  {index + 1}
                </div>

                {/* STUDENT */}
                <div>

                  <p className="font-semibold text-slate-800">
                    {student?.profile?.user?.username || "Student"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {student?.profile?.user?.email || "-"}
                  </p>

                </div>

                {/* ENROLLMENT */}
                <div className="text-sm text-slate-600">
                  {student?.enrollment_no || "-"}
                </div>

                {/* CHECKBOX */}
                <div className="flex justify-center">

                  <label className="flex cursor-pointer items-center gap-2">

                    <input
                      type="checkbox"
                      checked={attendance[student.id] || false}
                      onChange={(e) => {
                        const value = e.target.checked;

                        // UI immediately update
                        setAttendance((prev: any) => ({
                          ...prev,
                          [student.id]: value,
                        }));

                        const obj = {
                          is_present: e.target.checked,
                          subject: subject,
                          student: student?.id
                        }

                        setTotalAttendance((pre: any) => {
                          const alreadyChecked = pre.some((item: any) => item.student == student.id)
                          if (alreadyChecked) {
                            return pre.map((item: any) => item.student == student.id ? obj : item)
                          }

                          return [...pre, obj];


                        })


                      }}
                      className="h-5 w-5 cursor-pointer accent-green-600"
                    />

                    {/* <span
                    className={`text-sm font-medium ${
                      attendance[student.id]
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {attendance[student.id]
                      ? "Present"
                      : "Absent"}
                  </span> */}

                  </label>

                </div>

              </div>
            )

          })}

      </div>

      {/* FOOTER */}
      {!loading && students.length > 0 && (
        <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">

          <div className="text-sm text-slate-600">

            Present:{" "}
            {/* <span className="font-bold text-green-600">
              {
                Object.values(attendance).filter(
                  (value) => value
                ).length
              }
            </span> */}

            {" / "}

            {students.length}

          </div>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Submit Attendance
          </button>

        </div>
      )}

    </div>
  );
};

export default Page;
