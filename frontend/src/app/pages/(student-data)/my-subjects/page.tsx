
"use client";

import api from "@/app/lib/axios";
import useCurrentstudent from "@/app/hooks/useCurrentStudent";
import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Hash,
  Layers,
  ClipboardList,
} from "lucide-react";

interface Subject {
  id: number;
  name: string;
  subject_code: string;
  course: string;
  department: string;
  semester: string | number;
  total_marks: number;
  subject_type: string;
}

const Page = () => {

  useCurrentstudent();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {

      const response = await api.get("/my-subjects/", {
        withCredentials: true,
      });

      setSubjects(response.data);

    } catch (error) {

      console.log("Error fetching subjects:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading subjects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <BookOpen size={26} />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                My Subjects
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View all subjects assigned to your department.
              </p>

            </div>

          </div>

        </div>


        {/* SUBJECT COUNT */}

        <div className="mb-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-indigo-100">
                Total Subjects
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {subjects.length}
              </h2>

              <p className="mt-1 text-sm text-indigo-100">
                Subjects available for your department
              </p>

            </div>

            <GraduationCap size={50} className="text-indigo-200" />

          </div>

        </div>


        {/* SUBJECTS */}

        {subjects.length === 0 ? (

          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <BookOpen
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-semibold text-slate-700">
              No Subjects Found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              No subjects are currently available for your department.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {subjects.map((subject) => (

              <div
                key={subject.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                    <BookOpen size={22} />
                  </div>

                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                    {subject.subject_type}
                  </span>

                </div>


                {/* NAME */}

                <h2 className="mt-5 text-xl font-bold text-slate-800">
                  {subject.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {subject.course}
                </p>


                {/* DETAILS */}

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">

                    <Hash
                      size={18}
                      className="text-indigo-500"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Subject Code
                      </p>

                      <p className="text-sm font-medium text-slate-700">
                        {subject.subject_code}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">

                    <Layers
                      size={18}
                      className="text-indigo-500"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Semester
                      </p>

                      <p className="text-sm font-medium text-slate-700">
                        {subject.semester}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">

                    <ClipboardList
                      size={18}
                      className="text-indigo-500"
                    />

                    <div>

                      <p className="text-xs text-slate-400">
                        Total Marks
                      </p>

                      <p className="text-sm font-medium text-slate-700">
                        {subject.total_marks}
                      </p>

                    </div>

                  </div>

                </div>


                {/* DEPARTMENT */}

                <div className="mt-5 border-t border-slate-100 pt-4">

                  <p className="text-xs text-slate-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {subject.department}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Page;
