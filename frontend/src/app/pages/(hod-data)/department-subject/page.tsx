"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import {
  Plus,
  X,
  BookOpen,
  Pencil,
  Trash2,
  Users,
  Search,
  Filter,
  Layers,
  Award,
} from "lucide-react";
import { Faculty } from "../my-faculty/page";
import Image from "next/image";

export interface Subject {
  id: number;
  name: string;
  subject_code: string;
  course: string;
  department: string;
  semester: number;
  total_marks: number;
  credits: number;
  subject_type: "core" | "elective" | string;
}

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [subjectType, setSubjectType] = useState("core");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [facultyDataOpen, setFacultyDataOpen] = useState(false);

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

  const fetchSubjects = async () => {
    try {
      const response = await api.get("/get-subjects/", {
        withCredentials: true,
      });

      setSubjects(response.data);
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error("Unable to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !subjectCode ||
      !course ||
      !department ||
      !semester ||
      !totalMarks
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await api.post(
        "/create-subject/",
        {
          name,
          subject_code: subjectCode,
          course,
          department,
          semester: Number(semester),
          total_marks: Number(totalMarks),
          subject_type: subjectType,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Subject created successfully");

      setSubjects((prev) => [response.data.data, ...prev]);

      setName("");
      setSubjectCode("");
      setCourse("");
      setDepartment("");
      setSemester("");
      setTotalMarks("");
      setSubjectType("core");

      setShowModal(false);
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <BookOpen size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Subject Management
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Create and manage core & elective courses for your department
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-500 transition-all cursor-pointer"
            >
              <Plus size={18} />
              <span>Add New Subject</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-6">
        {/* Stats Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Department Subjects
              </p>
              <p className="text-3xl font-black text-white mt-0.5">
                {subjects.length}
              </p>
            </div>
          </div>
        </div>

        {/* Subjects List */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl overflow-hidden">
          <div className="border-b border-slate-800 px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                All Registered Subjects
              </h2>
              <p className="text-xs text-slate-400">
                Curriculum course specifications and semester assignments
              </p>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-amber-500/20 border-t-amber-500 mb-3" />
              <p className="text-xs">Loading subjects...</p>
            </div>
          ) : subjects.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <BookOpen size={40} className="mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">
                No subjects created yet.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-3 text-xs font-bold text-amber-400 hover:underline cursor-pointer"
              >
                Create your first subject
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 transition-colors hover:bg-slate-850/60 gap-4"
                >
                  {/* Left info */}
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                      <BookOpen size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base">
                        {subject.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {subject.subject_code}
                        </span>
                        <span className="text-xs text-slate-400">
                          {subject.course} • Sem {subject.semester}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-center sm:text-right">
                      <p className="text-slate-500">Marks</p>
                      <p className="font-bold text-slate-200">{subject.total_marks}</p>
                    </div>

                    <div className="text-center sm:text-right">
                      <p className="text-slate-500">Credits</p>
                      <p className="font-bold text-slate-200">{subject.credits || 4}</p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold border ${
                        subject.subject_type === "core"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                      }`}
                    >
                      {subject.subject_type === "core" ? "Core" : "Elective"}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                        <Pencil size={16} />
                      </button>
                      <button className="rounded-xl p-2 text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subject Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create New Subject
                </h2>
                <p className="text-xs text-slate-400">
                  Add a new course curriculum subject to department catalogue
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subject Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures & Algorithms"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BCA301"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Course
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BCA / BTech"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subject Type
                </label>
                <select
                  value={subjectType}
                  onChange={(e) => setSubjectType(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
                >
                  <option value="core">Core Subject</option>
                  <option value="elective">Elective Subject</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-500 cursor-pointer"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
