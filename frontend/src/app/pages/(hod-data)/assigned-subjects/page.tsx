"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import { Subject } from "../department-subject/page";
import { BookOpen, Users, CheckCircle2, User, ArrowRight, Sparkles } from "lucide-react";

const Page = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

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

  const assignSubject = async () => {
    if (!selectedFaculty) {
      return toast.error("Select Faculty");
    }

    if (!subject) {
      return toast.error("Select Subject");
    }

    try {
      await api.put(
        `/assigned-subject/${selectedFaculty.id}/`,
        {
          subject,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Subject Assigned Successfully");
      fetchFaculties();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Assign Teaching Subject
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Allocate department courses and subjects to faculty members
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Faculty List Selection Column */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users size={18} className="text-purple-400" />
                  Select Faculty Member
                </h2>
                <p className="text-xs text-slate-400">
                  Click on a faculty to allocate a teaching subject
                </p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                {faculties.length} Faculties
              </span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-400">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500 mb-2" />
                <p className="text-xs">Loading faculty roster...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {faculties.map((faculty: any) => {
                  const isSelected = selectedFaculty?.id === faculty.id;

                  return (
                    <div
                      key={faculty.id}
                      onClick={() => setSelectedFaculty(faculty)}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                        isSelected
                          ? "border-purple-500 bg-purple-950/30 ring-2 ring-purple-500/20 shadow-lg"
                          : "border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {faculty.image ? (
                            <img
                              src={faculty.image}
                              alt={faculty.name}
                              className="h-11 w-11 rounded-xl object-cover ring-1 ring-purple-500/30"
                            />
                          ) : (
                            <div className="h-11 w-11 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400">
                              <User size={20} />
                            </div>
                          )}

                          <div>
                            <h3 className="font-bold text-white text-sm">
                              {faculty.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              ID: {faculty.faculty_id}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="flex items-center gap-1 text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={13} />
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Current Subject:</span>
                        <span className="font-bold text-indigo-400">
                          {faculty.subject || "Not Assigned"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Subject Assign Panel */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-400" />
                  Subject Allocation Panel
                </h2>
                <p className="text-xs text-slate-400">
                  Assign a course subject to the selected faculty member
                </p>
              </div>

              {selectedFaculty ? (
                <div className="mt-6 space-y-6">
                  {/* Selected Faculty Info Card */}
                  <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 flex items-center gap-4">
                    {selectedFaculty.image ? (
                      <img
                        src={selectedFaculty.image}
                        alt={selectedFaculty.name}
                        className="h-12 w-12 rounded-xl object-cover ring-2 ring-purple-500/40"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center">
                        <User size={24} />
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-purple-300 font-semibold">
                        TARGET FACULTY
                      </p>
                      <h3 className="text-base font-bold text-white">
                        {selectedFaculty.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {selectedFaculty.faculty_id} • {selectedFaculty.department}
                      </p>
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Select Subject to Assign
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3.5 text-sm text-slate-100 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer"
                    >
                      <option value="">Select Subject from Catalogue</option>
                      {subjects.map((sub) => (
                        <option key={sub?.id} value={sub?.name}>
                          {sub?.name} ({sub?.subject_code}) - {sub?.course}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="my-16 text-center text-slate-500">
                  <Users size={40} className="mx-auto text-slate-700 mb-3" />
                  <p className="text-sm font-semibold text-slate-400">
                    No Faculty Selected
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Select a faculty member from the left list first.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            {selectedFaculty && (
              <button
                onClick={assignSubject}
                className="group mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-purple-600/30 transition-all hover:from-purple-500 hover:to-indigo-500 active:scale-[0.98]"
              >
                <span>CONFIRM SUBJECT ASSIGNMENT</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
