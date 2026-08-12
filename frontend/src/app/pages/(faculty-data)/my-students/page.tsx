"use client";

import React, { useEffect, useMemo, useState } from "react";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
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
  Sparkles,
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
    setExpandedStudent((current) => (current === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Faculty" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Users size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Enrolled Students
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Directory of students enrolled in your course classes
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
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Class Students
              </p>
              <p className="mt-2 text-3xl font-black text-white">
                {students.length}
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <GraduationCap size={24} />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Filter Results
              </p>
              <p className="mt-2 text-3xl font-black text-emerald-400">
                {filteredStudents.length}
              </p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Users size={24} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search by name, email, enrollment, course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-3" />
            <p className="text-xs font-semibold text-slate-400">
              Loading student roster...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredStudents.length === 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl">
            <Users size={40} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-white">No students found</h3>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search criteria.
            </p>
          </div>
        )}

        {/* Student Cards List */}
        {!loading && filteredStudents.length > 0 && (
          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const isExpanded = expandedStudent === student.id;
              const username = student?.profile?.user?.username || "Student";
              const email = student?.profile?.user?.email || "No email";

              return (
                <div
                  key={student.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden transition-all hover:border-slate-700"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={username}
                            className="h-16 w-16 rounded-2xl border border-slate-700 object-cover shadow-md"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
                            <User size={28} />
                          </div>
                        )}

                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {username}
                          </h3>
                          <p className="text-xs text-slate-400">{email}</p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 font-semibold text-indigo-400">
                              {student.enrollment_no}
                            </span>
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-semibold text-emerald-400">
                              Semester {student.semester}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-slate-500">Course</p>
                          <p className="font-semibold text-slate-200 mt-0.5">{student.course}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Department</p>
                          <p className="font-semibold text-slate-200 mt-0.5">{student.department}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Semester</p>
                          <p className="font-semibold text-slate-200 mt-0.5">{student.semester}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleProfile(student.id)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Profile" : "View Full Profile"}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Drawer Content */}
                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/70 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                        <User size={16} />
                        <span>COMPLETE STUDENT ACADEMIC PROFILE</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                        <DetailCard icon={<User size={16} />} label="Full Name" value={username} />
                        <DetailCard icon={<Mail size={16} />} label="Email" value={email} />
                        <DetailCard icon={<Phone size={16} />} label="Phone" value={student.phone} />
                        <DetailCard icon={<GraduationCap size={16} />} label="Enrollment Number" value={student.enrollment_no} />
                        <DetailCard icon={<BookOpen size={16} />} label="Course" value={student.course} />
                        <DetailCard icon={<Building2 size={16} />} label="Department" value={student.department} />
                        <DetailCard icon={<BookOpen size={16} />} label="Semester" value={`Semester ${student.semester}`} />
                        <DetailCard icon={<CalendarDays size={16} />} label="Date of Birth" value={student.date_of_birth} />
                        <DetailCard icon={<CalendarDays size={16} />} label="Admission Date" value={student.admission_date} />
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

const DetailCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | number }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-2 text-indigo-400">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>
      <p className="mt-1.5 font-bold text-slate-200 truncate">{value || "-"}</p>
    </div>
  );
};

export default Page;
