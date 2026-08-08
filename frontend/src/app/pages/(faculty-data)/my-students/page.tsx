"use client";

import React, { useEffect, useMemo, useState } from "react";
import api from "@/app/lib/axios";
import {
  Search,
  Users,
  User,
  Mail,
  Phone,
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

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
  profile?: {
    role: string;
    user?: {
      username: string;
      email: string;
    };
  };
}

const Page = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

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

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const value = `
        ${student?.profile?.user?.username || ""}
        ${student?.profile?.user?.email || ""}
        ${student?.enrollment_no || ""}
        ${student?.course || ""}
        ${student?.department || ""}
        ${student?.phone || ""}
      `.toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [students, search]);

  const toggleProfile = (id: number) => {
    setExpandedStudent((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <div className="bg-indigo-600 px-8 py-8 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <Users size={32} />

                <h1 className="text-3xl font-bold">
                  My Students
                </h1>
              </div>

              <p className="mt-2 text-indigo-100">
                View and manage students assigned to you
              </p>
            </div>

            <button
              onClick={fetchStudents}
              className="flex w-fit items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm transition hover:bg-white/25"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* TOP STATS */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Students
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {students.length}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <GraduationCap size={28} />
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Showing Students
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {filteredStudents.length}
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Users size={28} />
              </div>

            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, email, enrollment, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* STUDENTS */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Students
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Click View Profile to see complete student information
            </p>
          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading students...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredStudents.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Users size={30} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No students found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search.
            </p>

          </div>
        )}

        {/* STUDENT LIST */}
        {!loading && filteredStudents.length > 0 && (
          <div className="space-y-4">

            {filteredStudents.map((student) => {

              const isExpanded =
                expandedStudent === student.id;

              const username =
                student?.profile?.user?.username ||
                "Student";

              const email =
                student?.profile?.user?.email ||
                "No email";

              return (

                <div
                  key={student.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* MAIN STUDENT ROW */}
                  <div className="p-5">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                      {/* STUDENT BASIC INFO */}
                      <div className="flex items-center gap-4">

                        {student.image ? (
                          <img
                            src={student.image}
                            alt={username}
                            className="h-16 w-16 rounded-full border-2 border-slate-100 object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <User size={28} />
                          </div>
                        )}

                        <div>

                          <h3 className="text-lg font-bold text-slate-800">
                            {username}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {email}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">

                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                              {student.enrollment_no}
                            </span>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                              Semester {student.semester}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* BASIC INFORMATION */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">

                        <div>
                          <p className="text-xs text-slate-400">
                            Course
                          </p>

                          <p className="font-medium text-slate-700">
                            {student.course}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Department
                          </p>

                          <p className="font-medium text-slate-700">
                            {student.department}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Semester
                          </p>

                          <p className="font-medium text-slate-700">
                            {student.semester}
                          </p>
                        </div>

                      </div>

                      {/* TOGGLE BUTTON */}
                      <button
                        onClick={() => toggleProfile(student.id)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                      >

                        {isExpanded ? (
                          <>
                            Hide Profile
                            <ChevronUp size={18} />
                          </>
                        ) : (
                          <>
                            View Profile
                            <ChevronDown size={18} />
                          </>
                        )}

                      </button>

                    </div>

                  </div>

                  {/* PROFILE DETAILS */}
                  {isExpanded && (

                    <div className="border-t bg-slate-50 px-5 py-6">

                      <div className="mb-5 flex items-center gap-3">

                        <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                          <User size={20} />
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-800">
                            Complete Student Profile
                          </h3>

                          <p className="text-xs text-slate-500">
                            Student information
                          </p>
                        </div>

                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* NAME */}
                        <DetailCard
                          icon={<User size={18} />}
                          label="Full Name"
                          value={username}
                        />

                        {/* EMAIL */}
                        <DetailCard
                          icon={<Mail size={18} />}
                          label="Email"
                          value={email}
                        />

                        {/* PHONE */}
                        <DetailCard
                          icon={<Phone size={18} />}
                          label="Phone"
                          value={student.phone}
                        />

                        {/* ENROLLMENT */}
                        <DetailCard
                          icon={<GraduationCap size={18} />}
                          label="Enrollment Number"
                          value={student.enrollment_no}
                        />

                        {/* COURSE */}
                        <DetailCard
                          icon={<BookOpen size={18} />}
                          label="Course"
                          value={student.course}
                        />

                        {/* DEPARTMENT */}
                        <DetailCard
                          icon={<Building2 size={18} />}
                          label="Department"
                          value={student.department}
                        />

                        {/* SEMESTER */}
                        <DetailCard
                          icon={<BookOpen size={18} />}
                          label="Semester"
                          value={`Semester ${student.semester}`}
                        />

                        {/* DOB */}
                        <DetailCard
                          icon={<CalendarDays size={18} />}
                          label="Date of Birth"
                          value={student.date_of_birth}
                        />

                        {/* ADMISSION */}
                        <DetailCard
                          icon={<CalendarDays size={18} />}
                          label="Admission Date"
                          value={student.admission_date}
                        />

                      </div>

                      {/* PROFILE ROLE */}
                      <div className="mt-5 rounded-xl bg-white p-4">

                        <p className="text-xs text-slate-400">
                          Account Role
                        </p>

                        <p className="mt-1 font-semibold capitalize text-slate-700">
                          {student?.profile?.role || "Student"}
                        </p>

                      </div>

                    </div>

                  )}

                </div>

              );
            })}

          </div>
        )}

      </div>

    </div>
  );
};


/* DETAIL CARD */

const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) => {

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">

      <div className="flex items-center gap-2 text-indigo-600">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words font-semibold text-slate-700">
        {value || "-"}
      </p>

    </div>
  );
};

export default Page;
