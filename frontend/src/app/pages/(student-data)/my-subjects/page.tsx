"use client";

import api from "@/app/lib/axios";
import useCurrentstudent from "@/app/hooks/useCurrentStudent";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Hash,
  Layers,
  ClipboardList,
  Search,
  Filter,
  Building2,
  Sparkles,
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

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

  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subject_code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.subject_type === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading enrolled subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Student" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                My Enrolled Subjects
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Explore course curriculum subjects, codes, and semester syllabus details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-6">
        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-xl">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search subject by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-xl flex items-center gap-3">
            <Filter size={18} className="text-indigo-400 shrink-0 ml-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-sm font-semibold text-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">All Subject Types</option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Lab">Lab</option>
              <option value="core">Core</option>
              <option value="elective">Elective</option>
            </select>
          </div>
        </div>

        {/* Count Card */}
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 to-slate-900 p-6 sm:p-8 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Total Registered Subjects
              </p>
              <h2 className="mt-2 text-4xl font-black text-white">
                {filteredSubjects.length}
              </h2>
              <p className="mt-1 text-xs text-indigo-200/80">
                Subjects currently assigned for your academic term
              </p>
            </div>
            <GraduationCap size={50} className="text-indigo-400 opacity-60" />
          </div>
        </div>

        {/* Subjects Grid */}
        {filteredSubjects.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl text-slate-500">
            <BookOpen size={40} className="mx-auto text-slate-700 mb-3" />
            <h2 className="text-lg font-bold text-white">No Subjects Found</h2>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search query or subject type filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <BookOpen size={20} />
                  </div>
                  <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-[11px] font-bold text-indigo-400">
                    {subject.subject_type || "Core"}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                  {subject.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{subject.course}</p>

                <div className="mt-5 space-y-2 text-xs">
                  <DetailItem
                    icon={<Hash size={15} className="text-indigo-400" />}
                    label="Code"
                    value={subject.subject_code}
                  />
                  <DetailItem
                    icon={<Layers size={15} className="text-indigo-400" />}
                    label="Semester"
                    value={`Semester ${subject.semester}`}
                  />
                  <DetailItem
                    icon={<ClipboardList size={15} className="text-indigo-400" />}
                    label="Total Marks"
                    value={`${subject.total_marks} Marks`}
                  />
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-bold text-slate-200">{subject.department}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-800/80 p-2.5">
    {icon}
    <div className="flex justify-between w-full pr-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-200">{value}</span>
    </div>
  </div>
);

export default Page;
