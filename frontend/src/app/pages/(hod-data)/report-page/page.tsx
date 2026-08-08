
"use client";

import useCurrentHOD from "@/app/hooks/useCurrentHOD";
import api from "@/app/lib/axios";

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
} from "lucide-react";

import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";


// =====================================================
// TYPES
// =====================================================

type ReportTab = "overview" | "students" | "faculties" | "subjects";


// =====================================================
// PAGE
// =====================================================

const Page = () => {

  useCurrentHOD();

  const { hodData }: any = useSelector(
    (state: RootState) => state.hod
  );


  // ===================================================
  // STATES
  // ===================================================

  const [students, setStudents] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] =
    useState<ReportTab>("overview");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] =
    useState<any>(null);

  const [selectedType, setSelectedType] =
    useState<"student" | "faculty" | "subject" | null>(null);


  const ITEMS_PER_PAGE = 10;


  // ===================================================
  // FETCH REPORT DATA
  // ===================================================

  const fetchReports = async () => {

    try {

      setLoading(true);

      const [
        studentRes,
        facultyRes,
        subjectRes,
      ] = await Promise.all([

        api.get(
          "/get-my-students/",
          { withCredentials: true }
        ),

        api.get(
          "/get-my-faculties/",
          { withCredentials: true }
        ),

        api.get(
          "/get-subjects/",
          { withCredentials: true }
        ),

      ]);


      setStudents(studentRes.data || []);
      setFaculties(facultyRes.data || []);
      setSubjects(subjectRes.data || []);

    } catch (error: any) {

      console.log(
        "Report fetch error:",
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchReports();

  }, []);


  // ===================================================
  // SEARCH
  // ===================================================

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


  // ===================================================
  // PAGINATION
  // ===================================================

  const currentData = useMemo(() => {

    let data: any[] = [];

    if (activeTab === "students") {
      data = filteredStudents;
    }

    if (activeTab === "faculties") {
      data = filteredFaculties;
    }

    if (activeTab === "subjects") {
      data = filteredSubjects;
    }


    const start =
      (currentPage - 1) * ITEMS_PER_PAGE;

    return data.slice(
      start,
      start + ITEMS_PER_PAGE
    );

  }, [
    activeTab,
    currentPage,
    filteredStudents,
    filteredFaculties,
    filteredSubjects,
  ]);


  const totalPages = useMemo(() => {

    let length = 0;

    if (activeTab === "students") {
      length = filteredStudents.length;
    }

    if (activeTab === "faculties") {
      length = filteredFaculties.length;
    }

    if (activeTab === "subjects") {
      length = filteredSubjects.length;
    }

    return Math.ceil(
      length / ITEMS_PER_PAGE
    );

  }, [
    activeTab,
    filteredStudents,
    filteredFaculties,
    filteredSubjects,
  ]);


  useEffect(() => {

    setCurrentPage(1);

  }, [activeTab, search]);


  // ===================================================
  // SEMESTER ANALYTICS
  // ===================================================

  const semesterStats = useMemo(() => {

    const stats: Record<string, number> = {};

    students.forEach((student) => {

      const semester =
        student?.semester || "Unknown";

      stats[semester] =
        (stats[semester] || 0) + 1;

    });

    return Object.entries(stats)
      .sort((a, b) =>
        Number(a[0]) - Number(b[0])
      );

  }, [students]);


  const maxSemesterCount =
    Math.max(
      ...semesterStats.map(
        ([, count]) => count
      ),
      1
    );


  // ===================================================
  // ASSIGNED FACULTY
  // ===================================================

  const assignedFaculty =
    faculties.filter(
      (faculty) =>
        faculty?.assigned_subject
    ).length;


  const unassignedFaculty =
    faculties.length -
    assignedFaculty;


  // ===================================================
  // SUBJECT TYPE
  // ===================================================

  const subjectTypeStats = useMemo(() => {

    const stats: Record<string, number> = {};

    subjects.forEach((subject) => {

      const type =
        subject?.type ||
        subject?.category ||
        "Other";

      stats[type] =
        (stats[type] || 0) + 1;

    });

    return Object.entries(stats);

  }, [subjects]);


  // ===================================================
  // LOADING
  // ===================================================

  if (!hodData || loading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 text-slate-500">
            Loading department report...
          </p>

        </div>

      </div>

    );

  }


  // ===================================================
  // UI
  // ===================================================

  return (

    <div className="min-h-screen bg-slate-50">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 px-8 py-8 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-white/15 p-3">

                  <BarChart3 size={30} />

                </div>

                <div>

                  <h1 className="text-3xl font-bold">
                    Department Analytics
                  </h1>

                  <p className="mt-1 text-indigo-100">
                    Complete overview of your department
                  </p>

                </div>

              </div>

            </div>


            <button
              onClick={fetchReports}
              className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow hover:bg-indigo-50"
            >

              <RefreshCw size={17} />

              Refresh Data

            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN
      ================================================= */}

      <div className="mx-auto max-w-7xl px-6 py-8">


        {/* =================================================
            DEPARTMENT
        ================================================= */}

        <div className="mb-7 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">

          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">

            <Building2 size={25} />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-400">
              Department
            </p>

            <h2 className="text-xl font-bold text-slate-800">
              {hodData?.data?.department}
            </h2>

          </div>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Students"
            value={students.length}
            icon={<GraduationCap size={25} />}
            className="bg-green-100 text-green-600"
          />

          <StatCard
            title="Faculties"
            value={faculties.length}
            icon={<Users size={25} />}
            className="bg-blue-100 text-blue-600"
          />

          <StatCard
            title="Subjects"
            value={subjects.length}
            icon={<BookOpen size={25} />}
            className="bg-purple-100 text-purple-600"
          />

          <StatCard
            title="Assigned Faculty"
            value={assignedFaculty}
            icon={<UserCheck size={25} />}
            className="bg-orange-100 text-orange-600"
          />

        </div>


        {/* =================================================
            NAVIGATION TABS
        ================================================= */}

        <div className="mt-8 overflow-x-auto">

          <div className="flex min-w-max gap-2 rounded-xl bg-white p-2 shadow-sm">

            <Tab
              active={activeTab === "overview"}
              onClick={() =>
                setActiveTab("overview")
              }
              icon={<BarChart3 size={17} />}
              text="Overview"
            />

            <Tab
              active={activeTab === "students"}
              onClick={() =>
                setActiveTab("students")
              }
              icon={<GraduationCap size={17} />}
              text={`Students (${students.length})`}
            />

            <Tab
              active={activeTab === "faculties"}
              onClick={() =>
                setActiveTab("faculties")
              }
              icon={<Users size={17} />}
              text={`Faculties (${faculties.length})`}
            />

            <Tab
              active={activeTab === "subjects"}
              onClick={() =>
                setActiveTab("subjects")
              }
              icon={<BookOpen size={17} />}
              text={`Subjects (${subjects.length})`}
            />

          </div>

        </div>


        {/* =================================================
            OVERVIEW
        ================================================= */}

        {activeTab === "overview" && (

          <div className="mt-8 space-y-7">


            {/* =============================================
                STUDENT SEMESTER CHART
            ============================================= */}

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Student Distribution
                  </h2>

                  <p className="text-sm text-slate-500">
                    Students by semester
                  </p>

                </div>

                <div className="rounded-xl bg-green-100 p-3 text-green-600">

                  <GraduationCap size={22} />

                </div>

              </div>


              <div className="mt-8 space-y-5">

                {semesterStats.length === 0 ? (

                  <p className="text-center text-slate-400">
                    No student data available
                  </p>

                ) : (

                  semesterStats.map(
                    ([semester, count]) => (

                      <div key={semester}>

                        <div className="mb-2 flex justify-between text-sm">

                          <span className="font-medium text-slate-700">
                            Semester {semester}
                          </span>

                          <span className="font-bold text-slate-800">
                            {count}
                          </span>

                        </div>

                        <div className="h-4 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                            style={{
                              width:
                                `${(count / maxSemesterCount) * 100}%`,
                            }}
                          />

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </div>


            {/* =============================================
                FACULTY ASSIGNMENT
            ============================================= */}

            <div className="grid gap-7 lg:grid-cols-2">


              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-slate-800">
                  Faculty Workload
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Subject assignment overview
                </p>


                <div className="mt-8 flex items-center justify-center">

                  <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-slate-100">

                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          `conic-gradient(
                            #4f46e5 ${
                              faculties.length
                                ? (assignedFaculty / faculties.length) * 360
                                : 0
                            }deg,
                            #e2e8f0 0deg
                          )`,
                      }}
                    />

                    <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">

                      <p className="text-3xl font-bold text-slate-800">
                        {faculties.length
                          ? Math.round(
                              (assignedFaculty /
                                faculties.length) *
                                100
                            )
                          : 0}%
                      </p>

                      <p className="text-xs text-slate-500">
                        Assigned
                      </p>

                    </div>

                  </div>

                </div>


                <div className="mt-7 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-indigo-50 p-4">

                    <p className="text-sm text-slate-500">
                      Assigned
                    </p>

                    <p className="mt-1 text-2xl font-bold text-indigo-600">
                      {assignedFaculty}
                    </p>

                  </div>


                  <div className="rounded-xl bg-slate-100 p-4">

                    <p className="text-sm text-slate-500">
                      Unassigned
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-700">
                      {unassignedFaculty}
                    </p>

                  </div>

                </div>

              </div>


              {/* =============================================
                  SUBJECT ANALYTICS
              ============================================= */}

              <div className="rounded-2xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-slate-800">
                  Subject Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Subject distribution
                </p>


                <div className="mt-7 space-y-4">

                  {subjectTypeStats.length === 0 ? (

                    <p className="text-center text-slate-400">
                      No subject data available
                    </p>

                  ) : (

                    subjectTypeStats.map(
                      ([type, count]) => (

                        <div
                          key={type}
                          className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                        >

                          <div className="flex items-center gap-3">

                            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">

                              <BookOpen size={19} />

                            </div>

                            <span className="font-medium text-slate-700">
                              {type}
                            </span>

                          </div>

                          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">
                            {count}
                          </span>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </div>


            {/* =============================================
                QUICK INSIGHTS
            ============================================= */}

            <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-7 text-white">

              <div className="flex items-center gap-3">

                <Award size={25} />

                <h2 className="text-xl font-bold">
                  Quick Insights
                </h2>

              </div>


              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <Insight
                  label="Students"
                  value={students.length}
                />

                <Insight
                  label="Faculty"
                  value={faculties.length}
                />

                <Insight
                  label="Subjects"
                  value={subjects.length}
                />

                <Insight
                  label="Unassigned Faculty"
                  value={unassignedFaculty}
                />

              </div>

            </div>

          </div>

        )}


        {/* =================================================
            DATA TABLES
        ================================================= */}

        {activeTab !== "overview" && (

          <div className="mt-8">


            {/* SEARCH */}

            <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">

              <div className="relative flex-1">

                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder={`Search ${activeTab}...`}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
                />

              </div>

              <div className="flex items-center rounded-xl bg-slate-100 px-4 text-sm text-slate-500">

                Showing{" "}

                <span className="mx-1 font-bold text-slate-800">
                  {currentData.length}
                </span>

                records

              </div>

            </div>


            {/* DATA */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">


              {/* STUDENTS */}

              {activeTab === "students" && (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-slate-100">

                      <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Student
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Enrollment
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Course
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Semester
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {currentData.map(
                        (student, index) => (

                          <tr
                            key={student.id || index}
                            onClick={() => {
                              setSelectedItem(student);
                              setSelectedType("student");
                            }}
                            className="cursor-pointer border-t hover:bg-indigo-50"
                          >

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-3">

                                <div className="rounded-full bg-green-100 p-2 text-green-600">

                                  <GraduationCap size={18} />

                                </div>

                                <div>

                                  <p className="font-semibold text-slate-800">
                                    {student?.profile?.user?.username ||
                                      "Student"}
                                  </p>

                                  <p className="text-xs text-slate-500">
                                    {student?.profile?.user?.email}
                                  </p>

                                </div>

                              </div>

                            </td>

                            <td className="px-6 py-4 text-sm">
                              {student?.enrollment_no || "-"}
                            </td>

                            <td className="px-6 py-4 text-sm">
                              {student?.course || "-"}
                            </td>

                            <td className="px-6 py-4">

                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Sem {student?.semester || "-"}
                              </span>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}


              {/* FACULTIES */}

              {activeTab === "faculties" && (

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-slate-100">

                      <tr>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Faculty
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Faculty ID
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Subject
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Status
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {currentData.map(
                        (faculty, index) => (

                          <tr
                            key={faculty.id || index}
                            onClick={() => {
                              setSelectedItem(faculty);
                              setSelectedType("faculty");
                            }}
                            className="cursor-pointer border-t hover:bg-indigo-50"
                          >

                            <td className="px-6 py-4">

                              <div className="flex items-center gap-3">

                                <img
                                  src={faculty?.image}
                                  className="h-10 w-10 rounded-full object-cover"
                                  alt=""
                                />

                                <div>

                                  <p className="font-semibold">
                                    {faculty?.name}
                                  </p>

                                  <p className="text-xs text-slate-500">
                                    Faculty
                                  </p>

                                </div>

                              </div>

                            </td>


                            <td className="px-6 py-4 text-sm">
                              {faculty?.faculty_id || "-"}
                            </td>


                            <td className="px-6 py-4">

                              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">

                                {faculty?.assigned_subject ||
                                  "Not Assigned"}

                              </span>

                            </td>


                            <td className="px-6 py-4">

                              {faculty?.assigned_subject ? (

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                  Assigned
                                </span>

                              ) : (

                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                  Pending
                                </span>

                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}


              {/* SUBJECTS */}

              {activeTab === "subjects" && (

                <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">

                  {currentData.map(
                    (subject, index) => (

                      <div
                        key={subject.id || index}
                        onClick={() => {
                          setSelectedItem(subject);
                          setSelectedType("subject");
                        }}
                        className="cursor-pointer rounded-xl border border-slate-100 p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                      >

                        <div className="flex items-center justify-between">

                          <div className="rounded-xl bg-purple-100 p-3 text-purple-600">

                            <BookOpen size={22} />

                          </div>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                            {subject?.type || "Subject"}
                          </span>

                        </div>


                        <h3 className="mt-4 text-lg font-bold text-slate-800">
                          {subject?.name}
                        </h3>


                        <div className="mt-3 space-y-2 text-sm text-slate-500">

                          <p>
                            Course:{" "}
                            <b className="text-slate-700">
                              {subject?.course || "-"}
                            </b>
                          </p>

                          <p>
                            Semester:{" "}
                            <b className="text-slate-700">
                              {subject?.semester || "-"}
                            </b>
                          </p>

                          <p>
                            Marks:{" "}
                            <b className="text-slate-700">
                              {subject?.total_marks || "-"}
                            </b>
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}


              {/* EMPTY */}

              {currentData.length === 0 && (

                <div className="py-16 text-center">

                  <Layers3
                    size={40}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 font-semibold text-slate-500">
                    No records found
                  </p>

                  <p className="text-sm text-slate-400">
                    Try changing your search
                  </p>

                </div>

              )}


              {/* PAGINATION */}

              {totalPages > 1 && (

                <div className="flex items-center justify-between border-t px-5 py-4">

                  <p className="text-sm text-slate-500">

                    Page{" "}

                    <b className="text-slate-800">
                      {currentPage}
                    </b>{" "}

                    of{" "}

                    <b className="text-slate-800">
                      {totalPages}
                    </b>

                  </p>


                  <div className="flex gap-2">

                    <button
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              page - 1,
                              1
                            )
                        )
                      }
                      className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                      <ChevronLeft size={18} />

                    </button>


                    <button
                      disabled={
                        currentPage === totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              page + 1,
                              totalPages
                            )
                        )
                      }
                      className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                      <ChevronRight size={18} />

                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        )}

      </div>


      {/* =================================================
          DETAIL MODAL
      ================================================= */}

      {selectedItem && (

        <div
          onClick={() => {
            setSelectedItem(null);
            setSelectedType(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-800">
                {selectedType === "student"
                  ? "Student Details"
                  : selectedType === "faculty"
                  ? "Faculty Details"
                  : "Subject Details"}
              </h2>

              <button
                onClick={() => {
                  setSelectedItem(null);
                  setSelectedType(null);
                }}
                className="rounded-lg p-2 hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            {/* STUDENT MODAL */}

            {selectedType === "student" && (

              <div className="mt-6 space-y-4">

                <Detail
                  icon={<User size={18} />}
                  label="Username"
                  value={
                    selectedItem?.profile?.user?.username
                  }
                />

                <Detail
                  icon={<User size={18} />}
                  label="Email"
                  value={
                    selectedItem?.profile?.user?.email
                  }
                />

                <Detail
                  icon={<Award size={18} />}
                  label="Enrollment No"
                  value={
                    selectedItem?.enrollment_no
                  }
                />

                <Detail
                  icon={<BookOpen size={18} />}
                  label="Course"
                  value={
                    selectedItem?.course
                  }
                />

                <Detail
                  icon={<Layers3 size={18} />}
                  label="Semester"
                  value={
                    selectedItem?.semester
                  }
                />

                <Detail
                  icon={<Building2 size={18} />}
                  label="Department"
                  value={
                    selectedItem?.department
                  }
                />

              </div>

            )}


            {/* FACULTY MODAL */}

            {selectedType === "faculty" && (

              <div className="mt-6 space-y-4">

                <Detail
                  icon={<User size={18} />}
                  label="Name"
                  value={
                    selectedItem?.name
                  }
                />

                <Detail
                  icon={<Award size={18} />}
                  label="Faculty ID"
                  value={
                    selectedItem?.faculty_id
                  }
                />

                <Detail
                  icon={<Building2 size={18} />}
                  label="Department"
                  value={
                    selectedItem?.department
                  }
                />

                <Detail
                  icon={<BookOpen size={18} />}
                  label="Assigned Subject"
                  value={
                    selectedItem?.assigned_subject ||
                    "Not Assigned"
                  }
                />

              </div>

            )}


            {/* SUBJECT MODAL */}

            {selectedType === "subject" && (

              <div className="mt-6 space-y-4">

                <Detail
                  icon={<BookOpen size={18} />}
                  label="Subject"
                  value={
                    selectedItem?.name
                  }
                />

                <Detail
                  icon={<Building2 size={18} />}
                  label="Course"
                  value={
                    selectedItem?.course
                  }
                />

                <Detail
                  icon={<Layers3 size={18} />}
                  label="Semester"
                  value={
                    selectedItem?.semester
                  }
                />

                <Detail
                  icon={<Award size={18} />}
                  label="Total Marks"
                  value={
                    selectedItem?.total_marks
                  }
                />

                <Detail
                  icon={<BookOpen size={18} />}
                  label="Type"
                  value={
                    selectedItem?.type ||
                    "Subject"
                  }
                />

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

};


// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
  title,
  value,
  icon,
  className,
}: any) => {

  return (

    <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {value}
        </p>

      </div>

      <div
        className={`rounded-xl p-3 ${className}`}
      >
        {icon}
      </div>

    </div>

  );

};


// =====================================================
// TAB
// =====================================================

const Tab = ({
  active,
  onClick,
  icon,
  text,
}: any) => {

  return (

    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-indigo-600 text-white shadow"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >

      {icon}

      {text}

    </button>

  );

};


// =====================================================
// INSIGHT
// =====================================================

const Insight = ({
  label,
  value,
}: any) => {

  return (

    <div className="rounded-xl bg-white/10 p-4">

      <p className="text-sm text-slate-300">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

    </div>

  );

};


// =====================================================
// DETAIL
// =====================================================

const Detail = ({
  icon,
  label,
  value,
}: any) => {

  return (

    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

      <div className="flex items-center gap-3">

        <div className="text-indigo-500">
          {icon}
        </div>

        <span className="text-sm text-slate-500">
          {label}
        </span>

      </div>

      <span className="max-w-[55%] truncate text-right font-semibold text-slate-800">
        {value || "-"}
      </span>

    </div>

  );

};


export default Page;
