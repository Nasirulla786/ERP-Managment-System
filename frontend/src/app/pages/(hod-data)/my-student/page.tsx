"use client";

import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState, useMemo } from "react";
import { GraduationCap, Search, User, Mail, Phone, Calendar, BookOpen, Building2, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/get-my-students/", {
        withCredentials: true,
      });
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = `
        ${student?.profile?.user?.username || ""}
        ${student?.profile?.user?.email || ""}
        ${student?.enrollment_no || ""}
        ${student?.course || ""}
        ${student?.department || ""}
        ${student?.phone || ""}
      `.toLowerCase();
      return query.includes(search.toLowerCase());
    });
  }, [students, search]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <GraduationCap size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Department Students
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Complete student roster for your department
            </p>
          </div>

          <button
            onClick={fetchStudents}
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all w-fit cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Refresh Roster</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-6">
        {/* Search Input */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search students by name, email, enrollment no, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />
            <p className="mt-4 text-xs font-semibold text-slate-400">
              Loading student records...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredStudents.length === 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl">
            <GraduationCap size={40} className="mx-auto text-slate-600 mb-3" />
            <h2 className="text-lg font-bold text-white">No Students Found</h2>
            <p className="mt-1 text-xs text-slate-400">
              There are no student profiles matching your search criteria.
            </p>
          </div>
        )}

        {/* Students List */}
        {!loading && filteredStudents.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredStudents.map((student) => {
              const isOpen = openId === student.id;

              return (
                <div
                  key={student.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl transition-all hover:border-slate-700"
                >
                  <div className="flex items-start gap-5">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.profile.user.username}
                        className="h-20 w-20 rounded-2xl border border-slate-700 object-cover shadow-md"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                        <User size={30} />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">
                          {student.profile.user.username}
                        </h2>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                          Sem {student.semester}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-slate-400 mt-1">
                        {student.course} • {student.department}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1 text-slate-300">
                          {student.enrollment_no}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenId(isOpen ? null : student.id)
                    }
                    className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 py-2.5 text-xs font-bold text-slate-200 transition-all"
                  >
                    <span>{isOpen ? "Hide Profile Details" : "View Complete Profile"}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {/* Profile Expansion Details */}
                  {isOpen && (
                    <div className="mt-5 pt-5 border-t border-slate-800 rounded-2xl bg-slate-950/70 p-5 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Full Student Details
                      </h3>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-500">Username</span>
                          <p className="font-semibold text-slate-200">{student.profile.user.username}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Email</span>
                          <p className="font-semibold text-slate-200 truncate">{student.profile.user.email}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Enrollment</span>
                          <p className="font-semibold text-emerald-400">{student.enrollment_no}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Phone</span>
                          <p className="font-semibold text-slate-200">{student.phone}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Date of Birth</span>
                          <p className="font-semibold text-slate-200">{student.date_of_birth}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Course</span>
                          <p className="font-semibold text-slate-200">{student.course}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Department</span>
                          <p className="font-semibold text-slate-200">{student.department}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-slate-500">Semester</span>
                          <p className="font-semibold text-slate-200">{student.semester}</p>
                        </div>

                        <div className="space-y-1 col-span-2">
                          <span className="text-slate-500">Admission Date</span>
                          <p className="font-semibold text-slate-200">{student.admission_date}</p>
                        </div>
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

export default Page;
