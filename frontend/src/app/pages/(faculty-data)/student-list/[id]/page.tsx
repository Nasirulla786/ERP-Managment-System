"use client";

import api from "@/app/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Student } from "../../my-students/page";

import {
  CalendarDays,
  CheckCircle2,
  Users,
  BookOpen,
  ClipboardCheck,
  CircleX,
  Save,
} from "lucide-react";

const Page = () => {
  const params = useParams();

  const subject = params.id;

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [fromBackendAttendance, setFromBackendAttendance] = useState<any[]>(
    []
  );

  const [selectData, setSelectData] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/my-students/", {
        withCredentials: true,
      });

      console.log("STUDENTS:", response.data);

      setStudents(response.data);
    } catch (error) {
      console.log("Student fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH ATTENDANCE
  // =========================================================

  useEffect(() => {
    if (!subject || !selectData) return;

    fetchAttendance();
  }, [subject, selectData]);

  const fetchAttendance = async () => {
    try {
      const response = await api.get(
        `/get-attendance/${subject}/?date=${selectData}`,
        {
          withCredentials: true,
        }
      );

      console.log("BACKEND ATTENDANCE:", response.data);

      setFromBackendAttendance(response.data);
    } catch (error) {
      console.log("Attendance fetch error:", error);

      setFromBackendAttendance([]);
      setAttendance({});
    }
  };

  // =========================================================
  // CONVERT BACKEND DATA -> FRONTEND STATE
  // =========================================================

  useEffect(() => {
    const data: Record<string, boolean> = {};

    fromBackendAttendance.forEach((att: any) => {
      let studentId: any = null;

      if (typeof att.student === "object" && att.student !== null) {
        studentId = att.student.id;
      } else {
        studentId = att.student;
      }

      if (studentId !== null && studentId !== undefined) {
        data[String(studentId)] = Boolean(att.is_present);
      }
    });

    console.log("FINAL ATTENDANCE STATE:", data);

    setAttendance(data);
  }, [fromBackendAttendance]);

  // =========================================================
  // CHECKBOX CHANGE
  // =========================================================

  const handleAttendanceChange = (
    studentId: number,
    value: boolean
  ) => {
    setAttendance((previous) => ({
      ...previous,
      [String(studentId)]: value,
    }));
  };

  // =========================================================
  // SUBMIT ATTENDANCE
  // =========================================================

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const attendanceData = students.map((student) => ({
        is_present: attendance[String(student.id)] === true,
        subject: subject,
        student: student.id,
        date: selectData,
      }));

      console.log("SENDING ATTENDANCE:", attendanceData);

      const response = await api.post(
        "/mark-attendance/",
        attendanceData,
        {
          withCredentials: true,
        }
      );

      console.log("ATTENDANCE RESPONSE:", response.data);

      const freshAttendance = await api.get(
        `/get-attendance/${subject}/?date=${selectData}`,
        {
          withCredentials: true,
        }
      );

      console.log(
        "UPDATED BACKEND ATTENDANCE:",
        freshAttendance.data
      );

      setFromBackendAttendance(freshAttendance.data);

      alert("Attendance marked successfully!");
    } catch (error: any) {
      console.log(
        "Attendance submit error:",
        error?.response?.data || error
      );

      alert("Failed to mark attendance.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // PRESENT COUNT
  // =========================================================

  const presentCount = students.filter(
    (student) => attendance[String(student.id)] === true
  ).length;

  const absentCount = students.length - presentCount;

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-800 bg-slate-900 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}

            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  <ClipboardCheck size={23} />
                </div>

                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white">
                    Attendance
                  </h1>

                  <p className="mt-1 text-xs text-slate-400">
                    Manage and record student attendance
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <BookOpen
                    size={15}
                    className="text-purple-400"
                  />

                  <span className="text-xs font-semibold text-slate-300">
                    Subject:
                  </span>

                  <span className="text-xs font-bold text-white">
                    {subject}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                  <CalendarDays
                    size={15}
                    className="text-amber-400"
                  />

                  <span className="text-xs font-semibold text-slate-300">
                    Attendance Date
                  </span>
                </div>

              </div>
            </div>

            {/* DATE */}

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-lg">

              <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Select Date
              </label>

              <div className="relative">

                <CalendarDays
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400"
                />

                <input
                  type="date"
                  value={selectData}
                  onChange={(e) => {
                    setSelectData(e.target.value);
                  }}
                  className="rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-sm font-semibold text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                />

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl space-y-6 px-4 pt-8 sm:px-8">

        {/* =====================================================
            STATS
        ===================================================== */}

        {!loading && students.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* TOTAL */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Students
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    {students.length}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Users size={21} />
                </div>

              </div>

            </div>

            {/* PRESENT */}

            <div className="rounded-2xl border border-emerald-500/10 bg-slate-900 p-5 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Present
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-emerald-400">
                    {presentCount}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 size={21} />
                </div>

              </div>

            </div>

            {/* ABSENT */}

            <div className="rounded-2xl border border-red-500/10 bg-slate-900 p-5 shadow-xl">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Absent
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-red-400">
                    {absentCount}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                  <CircleX size={21} />
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            TABLE CARD
        ===================================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl">

          {/* TABLE HEADER */}

          <div className="flex flex-col gap-3 border-b border-slate-800 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <ClipboardCheck
                  size={19}
                  className="text-indigo-400"
                />

                <h2 className="text-lg font-bold text-white">
                  Student Attendance
                </h2>

              </div>

              <p className="mt-1 text-xs text-slate-500">
                Mark attendance for the selected date
              </p>

            </div>

            {!loading && students.length > 0 && (
              <span className="w-fit rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-400">
                {students.length} Students
              </span>
            )}

          </div>

          {/* LOADING */}

          {loading && (
            <div className="p-16 text-center">

              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500" />

              <p className="text-sm font-medium text-slate-400">
                Loading students...
              </p>

            </div>
          )}

          {/* EMPTY */}

          {!loading && students.length === 0 && (
            <div className="p-16 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-600">
                <Users size={25} />
              </div>

              <p className="text-sm font-semibold text-slate-300">
                No students found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                There are no students available for attendance.
              </p>

            </div>
          )}

          {/* STUDENTS */}

          {!loading && students.length > 0 && (

            <div className="overflow-x-auto">

              {/* TABLE HEADER */}

              <div className="grid min-w-[750px] grid-cols-[70px_1fr_200px_180px] items-center border-b border-slate-800 bg-slate-950 px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">

                <div>
                  #
                </div>

                <div>
                  Student
                </div>

                <div>
                  Enrollment Number
                </div>

                <div className="text-center">
                  Attendance Status
                </div>

              </div>

              {/* ROWS */}

              {students.map((student, index) => {

                const studentId = String(student.id);

                const isPresent =
                  attendance[studentId] === true;

                return (

                  <div
                    key={student.id}
                    className={`grid min-w-[750px] grid-cols-[70px_1fr_200px_180px] items-center border-b border-slate-800/80 px-6 py-5 transition-all ${
                      isPresent
                        ? "bg-emerald-500/[0.025]"
                        : "hover:bg-slate-800/40"
                    }`}
                  >

                    {/* NUMBER */}

                    <div className="text-sm font-bold text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* STUDENT */}

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isPresent
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {student?.profile?.user?.username
                          ?.charAt(0)
                          ?.toUpperCase() || "S"}
                      </div>

                      <div>

                        <p className="font-bold text-white">
                          {student?.profile?.user?.username ||
                            "Student"}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {student?.profile?.user?.email || "-"}
                        </p>

                      </div>

                    </div>

                    {/* ENROLLMENT */}

                    <div>

                      <span className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-300">
                        {student?.enrollment_no || "-"}
                      </span>

                    </div>

                    {/* ATTENDANCE */}

                    <div className="flex justify-center">

                      <label
                        className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 transition-all ${
                          isPresent
                            ? "border-emerald-500/20 bg-emerald-500/10"
                            : "border-slate-800 bg-slate-950 hover:border-slate-700"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={isPresent}
                          onChange={(e) => {
                            handleAttendanceChange(
                              student.id,
                              e.target.checked
                            );
                          }}
                          className="peer sr-only"
                        />

                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                            isPresent
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-600 bg-slate-900 text-transparent group-hover:border-slate-500"
                          }`}
                        >
                          <CheckCircle2
                            size={15}
                            strokeWidth={3}
                          />
                        </div>

                        <span
                          className={`min-w-[62px] text-left text-xs font-bold ${
                            isPresent
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}
                        >
                          {isPresent
                            ? "Present"
                            : "Absent"}
                        </span>

                      </label>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        {!loading && students.length > 0 && (

          <div className="sticky bottom-4 z-10 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 size={16} />
                </div>

                <div>

                  <p className="text-sm font-bold text-white">
                    Attendance Summary
                  </p>

                  <p className="text-xs text-slate-500">
                    {presentCount} of {students.length} students marked present
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all ${
                submitting
                  ? "cursor-not-allowed bg-slate-700 text-slate-500"
                  : "bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-500 active:scale-[0.98]"
              }`}
            >

              <Save size={17} />

              {submitting
                ? "Saving Attendance..."
                : "Save Attendance"}

            </button>

          </div>

        )}

      </div>
    </div>
  );
};

export default Page;
