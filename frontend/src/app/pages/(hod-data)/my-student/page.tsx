"use client";

import api from "@/app/lib/axios";
import { useEffect, useState } from "react";

export interface Student {
  id: number;
  enrollment_no: string;
  phone: string;
  date_of_birth: string;
  course: string;
  department: string;
  semester: number;
  admission_date: string;
  image: string;

  profile: {
    user: {
      username: string;
      email: string;
    };
  };
}

const Page = () => {

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const response = await api.get(
        "/get-my-students/",
        {
          withCredentials: true,
        }
      );

      setStudents(response.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Students...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="mb-8 text-4xl font-bold">
        My Students
      </h1>

      {students.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">
          No Students Found
        </div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          {students.map((student) => (

            <div
              key={student.id}
              className="rounded-xl bg-white p-6 shadow"
            >

              <div className="flex gap-5">

                <img
                  src={student.image}
                  className="h-24 w-24 rounded-full object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {student.profile.user.username}
                  </h2>

                  <p>{student.course}</p>

                  <p>Semester {student.semester}</p>

                </div>

              </div>

              <button
                className="mt-5 rounded bg-indigo-600 px-4 py-2 text-white"
                onClick={() =>
                  setOpenId(
                    openId === student.id
                      ? null
                      : student.id
                  )
                }
              >
                {openId === student.id
                  ? "Hide Profile"
                  : "View Profile"}
              </button>

              {openId === student.id && (

                <div className="mt-6 rounded-lg border bg-slate-50 p-5">

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <b>Username</b>
                      <p>{student.profile.user.username}</p>
                    </div>

                    <div>
                      <b>Email</b>
                      <p>{student.profile.user.email}</p>
                    </div>

                    <div>
                      <b>Enrollment</b>
                      <p>{student.enrollment_no}</p>
                    </div>

                    <div>
                      <b>Phone</b>
                      <p>{student.phone}</p>
                    </div>

                    <div>
                      <b>DOB</b>
                      <p>{student.date_of_birth}</p>
                    </div>

                    <div>
                      <b>Course</b>
                      <p>{student.course}</p>
                    </div>

                    <div>
                      <b>Department</b>
                      <p>{student.department}</p>
                    </div>

                    <div>
                      <b>Semester</b>
                      <p>{student.semester}</p>
                    </div>

                    <div>
                      <b>Admission</b>
                      <p>{student.admission_date}</p>
                    </div>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default Page;
