"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import { FileText, Plus, Upload, Calendar, BookOpen, Clock, CheckCircle2 } from "lucide-react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const sampleAssignments = [
    {
      id: 1,
      title: "Data Structures - Graph Traversal Algorithms Task",
      subject: "Data Structures & Algorithms",
      dueDate: "2026-08-20",
      status: "Active",
      submissions: "24/30",
    },
    {
      id: 2,
      title: "DBMS - SQL Joins & Normalization Practice Sheet",
      subject: "Database Management System",
      dueDate: "2026-08-25",
      status: "Active",
      submissions: "18/30",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="Faculty" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Course Assignment Portal
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Upload and manage academic assignments and lab tasks for students
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Create Assignment Form Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus size={18} className="text-purple-400" />
              Create New Assignment
            </h2>
            <p className="text-xs text-slate-400">
              Post task instructions and submission deadlines for your classes
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Assignment Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures Graph Traversal Task"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subject Course
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Submission Deadline
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Task Instructions & Guidelines
              </label>
              <textarea
                placeholder="Write task details and guidelines..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/20 hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer"
            >
              <Upload size={16} />
              <span>POST ASSIGNMENT TASK</span>
            </button>
          </form>
        </div>

        {/* Existing Assignments Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-purple-400" />
              Active Course Assignments
            </h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {sampleAssignments.length} Assignments
            </span>
          </div>

          <div className="space-y-4">
            {sampleAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {assignment.title}
                    </h3>
                    <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                      Subject: {assignment.subject}
                    </p>
                  </div>

                  <span className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 shrink-0 w-fit">
                    Deadline: {assignment.dueDate}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Student Submissions: <strong className="text-emerald-400">{assignment.submissions}</strong></span>
                  <span className="text-slate-500">Status: Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
