"use client";

import api from "@/app/lib/axios";
import { useEffect, useState } from "react";

export interface Faculty {
  id: number;
  name: string;
  faculty_id: string;
  image: string;
  salary: string;
  subject: string;
  department: string;
  assigned_subject:string
}

const Page = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await api.get("/get-my-faculties/", {
        withCredentials: true,
      });

      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading Faculties...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Faculties</h1>
        <p className="mt-2 text-gray-500">
          Faculties of your department
        </p>
      </div>

      {faculties.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No Faculty Found
          </h2>

          <p className="mt-2 text-gray-500">
            There are no faculties in your department.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="flex flex-col items-center">

                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="h-28 w-28 rounded-full border object-cover"
                />

                <h2 className="mt-4 text-xl font-bold">
                  {faculty.name}
                </h2>

                <p className="text-gray-500">
                  {faculty.subject}
                </p>

              </div>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                  <span className="font-medium">Faculty ID</span>
                  <span>{faculty.faculty_id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Department</span>
                  <span>{faculty.department}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Salary</span>
                  <span>₹ {faculty.salary}</span>
                </div>

              </div>

              <button
                className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
              >
                View Profile
              </button>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Page;
