"use client";

import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState, useMemo } from "react";
import { Users, Search, User, BookOpen, Building2, IndianRupee, RefreshCw, Briefcase } from "lucide-react";

export interface Faculty {
  id: number;
  name: string;
  faculty_id: string;
  image: string;
  salary: string;
  subject: string;
  department: string;
  assigned_subject: string;
}

const Page = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
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

  const filteredFaculties = useMemo(() => {
    return faculties.filter((faculty) => {
      const query = `
        ${faculty?.name || ""}
        ${faculty?.faculty_id || ""}
        ${faculty?.department || ""}
        ${faculty?.subject || ""}
        ${faculty?.assigned_subject || ""}
      `.toLowerCase();
      return query.includes(search.toLowerCase());
    });
  }, [faculties, search]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Users size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Department Faculties
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Directory of all teaching faculties in your department
            </p>
          </div>

          <button
            onClick={fetchFaculties}
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all w-fit cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Refresh Roster</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-6">
        {/* Search Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search faculty by name, ID, department or subject..."
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
              Loading faculty directory...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredFaculties.length === 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center shadow-xl">
            <Users size={40} className="mx-auto text-slate-600 mb-3" />
            <h2 className="text-lg font-bold text-white">No Faculties Found</h2>
            <p className="mt-1 text-xs text-slate-400">
              There are no faculty profiles matching your search criteria.
            </p>
          </div>
        )}

        {/* Faculty Grid */}
        {!loading && filteredFaculties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1"
              >
                {/* Faculty Card Top */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800/80">
                  {faculty.image ? (
                    <img
                      src={faculty.image}
                      alt={faculty.name}
                      className="h-24 w-24 rounded-full border-2 border-indigo-500/40 object-cover shadow-xl ring-4 ring-indigo-500/10"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-indigo-400">
                      <User size={36} />
                    </div>
                  )}

                  <h2 className="mt-4 text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                    {faculty.name}
                  </h2>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5">
                    {faculty.subject || "Faculty Member"}
                  </p>
                </div>

                {/* Details List */}
                <div className="py-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
                    <span className="text-slate-400 font-medium">Faculty ID</span>
                    <span className="font-bold text-slate-200">{faculty.faculty_id}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
                    <span className="text-slate-400 font-medium">Department</span>
                    <span className="font-bold text-slate-200">{faculty.department}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
                    <span className="text-slate-400 font-medium">Assigned Subject</span>
                    <span className="font-bold text-emerald-400">
                      {faculty.assigned_subject || "Not Assigned"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 border border-slate-800/60">
                    <span className="text-slate-400 font-medium">Salary</span>
                    <span className="font-bold text-amber-400">₹ {faculty.salary}</span>
                  </div>
                </div>

                {/* Action */}
                <button className="w-full rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 py-2.5 text-xs font-bold text-indigo-300 hover:text-white transition-all cursor-pointer">
                  View Profile & Workload
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
