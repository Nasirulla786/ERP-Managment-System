"use client";

import useCurrentHOD from "@/app/hooks/useCurrentHOD";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { RootState } from "@/redux/store";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  BarChart3,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Building2,
  Award,
  Layers3,
  CheckCircle2,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

type ReportTab = "overview" | "students" | "faculties" | "subjects";

const Page = () => {
  useCurrentHOD();

  const { hodData }: any = useSelector((state: RootState) => state.hod);

  const [students, setStudents] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ReportTab>("overview");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<"student" | "faculty" | "subject" | null>(null);

  const ITEMS_PER_PAGE = 10;

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [studentRes, facultyRes, subjectRes] = await Promise.all([
        api.get("/get-my-students/", { withCredentials: true }),
        api.get("/get-my-faculties/", { withCredentials: true }),
        api.get("/get-subjects/", { withCredentials: true }),
      ]);

      setStudents(studentRes.data || []);
      setFaculties(facultyRes.data || []);
      setSubjects(subjectRes.data || []);
    } catch (error: any) {
      console.log("Report fetch error:", error.response?.data || error);
    } fontally: {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredStudents = useMemo(() => {
    const value = search.toLowerCase();
    return students.filter((student) => {
      const searchable = `
        ${student?.profile?.user?.username || ""}
        ${student?.profile?.user?.email || ""}
        ${student?.enrollment_no || ""}
        ${student?.course || ""}
        ${student?.department || ""}
        ${student?.semester || ""}
      `.toLowerCase();
      return searchable.includes(value);
    });
  }, [students, search]);

  const filteredFaculties = useMemo(() => {
    const value = search.toLowerCase();
    return faculties.filter((faculty) => {
      const searchable = `
        ${faculty?.name || ""}
        ${faculty?.faculty_id || ""}
        ${faculty?.department || ""}
        ${faculty?.assigned_subject || ""}
      `.toLowerCase();
      return searchable.includes(value);
    });
  }, [faculties, search]);

  const filteredSubjects = useMemo(() => {
    const value = search.toLowerCase();
    return subjects.filter((subject) => {
      const searchable = `
        ${subject?.name || ""}
        ${subject?.course || ""}
        ${subject?.semester || ""}
        ${subject?.type || ""}
      `.toLowerCase();
      return searchable.includes(value);
    });
  }, [subjects, search]);

  const currentData = useMemo(() => {
    let data: any[] = [];
    if (activeTab === "students") data = filteredStudents;
    if (activeTab === "faculties") data = filteredFaculties;
    if (activeTab === "subjects") data = filteredSubjects;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [activeTab, currentPage, filteredStudents, filteredFaculties, filteredSubjects]);

  const totalPages = useMemo(() => {
    let length = 0;
    if (activeTab === "students") length = filteredStudents.length;
    if (activeTab === "faculties") length = filteredFaculties.length;
    if (activeTab === "subjects") length = filteredSubjects.length;

    return Math.ceil(length / ITEMS_PER_PAGE);
  }, [activeTab, filteredStudents, filteredFaculties, filteredSubjects]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search]);

  const semesterStats = useMemo(() => {
    const stats: Record<string, number> = {};
    students.forEach((student) => {
      const semester = student?.semester || "Unknown";
      stats[semester] = (stats[semester] || 0) + 1;
    });

    return Object.entries(stats).sort((a, b) => Number(a[0]) - Number(b[0]));
  }, [students]);

  const maxSemesterCount = Math.max(...semesterStats.map(([, count]) => count), 1);

  const assignedFaculty = faculties.filter((faculty) => faculty?.assigned_subject).length;
  const unassignedFaculty = faculties.length - assignedFaculty;

  const subjectTypeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    subjects.forEach((subject) => {
      const type = subject?.type || subject?.category || subject?.subject_type || "Core";
      stats[type] = (stats[type] || 0) + 1;
    });

    return Object.entries(stats);
  }, [subjects]);

  if (!hodData || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500 mb-3" />
          <p className="text-xs font-semibold text-slate-400">Loading department reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <BarChart3 size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Department Analytics & Reports
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Department: <span className="text-indigo-400 font-bold">{hodData?.data?.department}</span>
              </p>
            </div>
          </div>

          <button
            onClick={fetchReports}
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all w-fit cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Refresh Analytics</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Students"
            value={students.length}
            icon={<GraduationCap size={22} />}
            color="emerald"
          />
          <StatCard
            title="Total Faculties"
            value={faculties.length}
            icon={<Users size={22} />}
            color="indigo"
          />
          <StatCard
            title="Curriculum Subjects"
            value={subjects.length}
            icon={<BookOpen size={22} />}
            color="purple"
          />
          <StatCard
            title="Assigned Faculty"
            value={assignedFaculty}
            icon={<UserCheck size={22} />}
            color="amber"
          />
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-2 overflow-x-auto">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<BarChart3 size={16} />}
            text="Overview Summary"
          />
          <TabButton
            active={activeTab === "students"}
            onClick={() => setActiveTab("students")}
            icon={<GraduationCap size={16} />}
            text={`Students (${students.length})`}
          />
          <TabButton
            active={activeTab === "faculties"}
            onClick={() => setActiveTab("faculties")}
            icon={<Users size={16} />}
            text={`Faculties (${faculties.length})`}
          />
          <TabButton
            active={activeTab === "subjects"}
            onClick={() => setActiveTab("subjects")}
            icon={<BookOpen size={16} />}
            text={`Subjects (${subjects.length})`}
          />
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Semester Distribution Bar Chart */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="text-emerald-400" size={20} />
                  Student Distribution by Semester
                </h2>
                <p className="text-xs text-slate-400">
                  Enrolled students batching across academic semesters
                </p>
              </div>

              <div className="space-y-4">
                {semesterStats.map(([semester, count]) => (
                  <div key={semester} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-300">Semester {semester}</span>
                      <span className="font-bold text-emerald-400">{count} Students</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                        style={{ width: `${(count / maxSemesterCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Workload Radial Chart */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="text-indigo-400" size={20} />
                  Faculty Subject Assignment Ratio
                </h2>
                <p className="text-xs text-slate-400">
                  Allocated vs unallocated department teaching staff
                </p>

                <div className="my-8 flex items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-slate-950 border border-slate-800">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(#6366f1 ${
                          faculties.length ? (assignedFaculty / faculties.length) * 360 : 0
                        }deg, #1e293b 0deg)`,
                      }}
                    />
                    <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-center">
                      <p className="text-2xl font-black text-white">
                        {faculties.length
                          ? Math.round((assignedFaculty / faculties.length) * 100)
                          : 0}%
                      </p>
                      <p className="text-[10px] uppercase font-bold text-indigo-400">Assigned</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-2xl bg-indigo-950/40 border border-indigo-500/20 p-3.5 text-center">
                  <span className="text-slate-400">Assigned Faculty</span>
                  <p className="text-xl font-bold text-indigo-400 mt-1">{assignedFaculty}</p>
                </div>
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3.5 text-center">
                  <span className="text-slate-400">Unassigned</span>
                  <p className="text-xl font-bold text-slate-300 mt-1">{unassignedFaculty}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Data Tables */}
        {activeTab !== "overview" && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden space-y-4">
            <div className="p-4 border-b border-slate-800">
              <div className="relative">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Title / Name</th>
                    <th className="px-6 py-4">Identifier</th>
                    <th className="px-6 py-4">Department / Field</th>
                    <th className="px-6 py-4 text-center">Status / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {currentData.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-850/60 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">
                        {item.name || item.profile?.user?.username || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.enrollment_no || item.faculty_id || item.subject_code || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {item.department || item.course || "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-300 border border-slate-700">
                          {item.semester ? `Semester ${item.semester}` : item.assigned_subject || item.subject_type || "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-slate-800 text-xs">
                <span className="text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => {
  const colorMap: any = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className={`h-10 w-10 rounded-2xl flex items-center justify-center border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-4xl font-black text-white">{value}</p>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, text }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
      active
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

export default Page;
