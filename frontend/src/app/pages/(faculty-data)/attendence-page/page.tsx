"use client";

import api from "@/app/lib/axios";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Student } from "../my-students/page";
import { Subject } from "../../(hod-data)/department-subject/page";
import Link from "next/link";
import { ClipboardCheck, History, BookOpen, Layers, X, ArrowRight, Sparkles } from "lucide-react";

const Page = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [mySubjects, setMySubjects] = useState<Subject[]>([]);
  const [selectSem, setSelectSem] = useState<number>();

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

  useEffect(() => {
    const fetchDepSubjects = async () => {
      try {
        const res = await api.get("/get-dep-subjects/", { withCredentials: true });
        setMySubjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepSubjects();
  }, []);

  const selectSemester = mySubjects.filter((subject: Subject) => subject?.semester == selectSem);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Faculty" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <ClipboardCheck size={22} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Class Attendance Management
              </h1>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Select course degree & semester to open subject attendance marking sheet
            </p>
          </div>

          <Link
            href={"/pages/attendance-history"}
            className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 text-xs font-bold text-emerald-400 transition-all w-fit cursor-pointer"
          >
            <History size={16} />
            <span>Attendance History Logs</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8 space-y-8">
        {/* BCA Section */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-emerald-400" />
              Bachelor of Computer Applications (BCA)
            </h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
              Semesters 1 - 6
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((semester) => (
              <div
                key={semester}
                onClick={() => {
                  setModelOpen(true);
                  setSelectSem(semester);
                }}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center transition-all duration-200 hover:border-emerald-500/50 hover:bg-emerald-950/20 hover:-translate-y-1"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Semester
                </p>
                <p className="mt-1 text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                  0{semester}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MCA Section */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-indigo-400" />
              Master of Computer Applications (MCA)
            </h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
              Semesters 1 - 4
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((semester) => (
              <div
                key={semester}
                onClick={() => {
                  setModelOpen(true);
                  setSelectSem(semester);
                }}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-950/20 hover:-translate-y-1"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Semester
                </p>
                <p className="mt-1 text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                  0{semester}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BTech Section */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-purple-400" />
              Bachelor of Technology (BTech)
            </h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
              Semesters 1 - 8
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <div
                key={semester}
                onClick={() => {
                  setModelOpen(true);
                  setSelectSem(semester);
                }}
                className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center transition-all duration-200 hover:border-purple-500/50 hover:bg-purple-950/20 hover:-translate-y-1"
              >
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Sem
                </p>
                <p className="mt-0.5 text-xl font-black text-white group-hover:text-purple-400 transition-colors">
                  0{semester}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Backdrop Modal Overlay */}
      {modelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen size={20} className="text-emerald-400" />
                  Select Subject for Semester {selectSem}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click a subject to open the attendance marking sheet
                </p>
              </div>

              <button
                onClick={() => setModelOpen(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {selectSemester && selectSemester.length > 0 ? (
                selectSemester.map((sub) => (
                  <Link
                    href={"/pages/student-list/" + sub?.name}
                    key={sub?.id}
                    className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4 transition-all hover:border-emerald-500/40 hover:bg-emerald-950/20"
                  >
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                        {sub?.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Code: {sub?.subject_code || "-"} • Semester {sub?.semester}
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400"
                    />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <BookOpen size={36} className="mx-auto text-slate-700 mb-2" />
                  <p className="text-sm font-semibold text-slate-400">
                    No subjects registered for Semester {selectSem}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setModelOpen(false)}
                className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
