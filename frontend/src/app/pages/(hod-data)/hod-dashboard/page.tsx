"use client";

import useCurrentHOD from "@/app/hooks/useCurrentHOD";
import { RootState } from "@/redux/store";
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  ArrowRight,
  ClipboardList,
  CalendarDays,
  Bell,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Page = () => {
  useCurrentHOD();

  const { hodData }: any = useSelector(
    (state: RootState) => state.hod
  );

  if (!hodData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-white px-8 py-5 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "My Faculties",
      desc: "View and manage department faculties",
      icon: Users,
      color: "bg-blue-500",
      sendLink: "/pages/my-faculty",
    },
    {
      title: "My Students",
      desc: "View all students in your department",
      icon: GraduationCap,
      color: "bg-green-500",
      sendLink: "/pages/my-student",
    },
    {
      title: "Assign Subjects",
      desc: "Assign subjects to faculty members",
      icon: BookOpen,
      color: "bg-purple-500",
      sendLink: "/pages/assigned-subjects",
    },
    {
      title: "Department Subjects",
      desc: "Manage department subjects",
      icon: ClipboardList,
      color: "bg-orange-500",
      sendLink: "/pages/department-subject",
    },

    {
      title: "Class Schedule",
      desc: "View and manage class timetable",
      icon: CalendarDays,
      color: "bg-cyan-500",
      sendLink: "/pages/timetable",
    },
    {
      title: "Department Notices",
      desc: "Create and manage notices",
      icon: Bell,
      color: "bg-red-500",
      sendLink: "/pages/notices",
    },

  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 px-10 py-10 text-white shadow">

        <h1 className="text-4xl font-bold">
          HOD Dashboard
        </h1>

        <p className="mt-2 text-indigo-100 text-lg">
          Welcome back 👋 Manage your department efficiently.
        </p>

      </div>

      <div className="mx-auto max-w-7xl px-8 py-8">
                {/* ================= PROFILE ================= */}

                <div className="rounded-2xl bg-white p-8 shadow-md">

<div className="flex flex-col items-center gap-8 md:flex-row">

  <img
    src={hodData?.data?.image}
    alt={hodData?.data?.name}
    className="h-32 w-32 rounded-full border-4 border-indigo-100 object-cover"
  />

  <div className="flex-1">

    <h2 className="text-3xl font-bold text-gray-800">
      {hodData?.data?.name}
    </h2>

    <p className="mt-2 text-lg text-gray-500">
      Head of Department
    </p>

    <div className="mt-6 grid gap-5 md:grid-cols-3">

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          HOD ID
        </p>

        <p className="mt-1 text-lg font-semibold">
          {hodData?.data?.hod_id}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Department
        </p>

        <p className="mt-1 text-lg font-semibold">
          {hodData?.data?.department}
        </p>
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-500">
          Email
        </p>

        <p className="mt-1 text-lg font-semibold break-all">
          {hodData?.data?.email}
        </p>
      </div>

    </div>

  </div>

</div>

</div>

{/* ================= DASHBOARD STATS ================= */}

<div className="mt-10 grid gap-6 md:grid-cols-4">

<div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

  <h3 className="text-gray-500">
    Total Faculties
  </h3>

  <p className="mt-4 text-5xl font-bold text-indigo-600">
    {hodData?.facultyCount ?? 0}
  </p>

</div>

<div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

  <h3 className="text-gray-500">
    Total Students
  </h3>

  <p className="mt-4 text-5xl font-bold text-green-600">
    {hodData?.studentCount ?? 0}
  </p>

</div>

<div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

  <h3 className="text-gray-500">
    Subjects
  </h3>

  <p className="mt-4 text-5xl font-bold text-orange-500">
    {hodData?.subjectCount ?? 0}
  </p>

</div>

<div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

  <h3 className="text-gray-500">
    Semesters
  </h3>

  <p className="mt-4 text-5xl font-bold text-purple-600">
    {hodData?.semesterCount ?? 8}
  </p>

</div>

</div>

{/* ================= DEPARTMENT MANAGEMENT ================= */}

<div className="mt-12">

<div className="flex items-center justify-between">

  <h2 className="text-3xl font-bold text-gray-800">
    Department Management
  </h2>

  <p className="text-gray-500">
    Manage all department resources
  </p>

</div>

<div className="mt-6 grid gap-6 md:grid-cols-2">
{cards.map((item) => (
              <Link
                key={item.title}
                href={item.sendLink}
                className="group rounded-2xl bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <div
                      className={`${item.color} inline-flex rounded-xl p-4 text-white`}
                    >
                      <item.icon size={30} />
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-gray-500">
                      {item.desc}
                    </p>

                  </div>

                  <ArrowRight
                    size={28}
                    className="text-gray-400 transition group-hover:translate-x-2 group-hover:text-indigo-600"
                  />

                </div>
              </Link>
            ))}

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-12 rounded-2xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold text-gray-800">
            Quick Actions
          </h2>

          <p className="mt-2 text-gray-500">
            Frequently used department operations.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-4">

            <Link
              href="/pages/my-faculty"
              className="rounded-xl border p-5 text-center transition hover:border-indigo-500 hover:bg-indigo-50"
            >
              <Users className="mx-auto mb-3 text-indigo-600" size={34} />
              <h3 className="font-semibold">
                Faculties
              </h3>
            </Link>

            <Link
              href="/pages/my-student"
              className="rounded-xl border p-5 text-center transition hover:border-green-500 hover:bg-green-50"
            >
              <GraduationCap
                className="mx-auto mb-3 text-green-600"
                size={34}
              />
              <h3 className="font-semibold">
                Students
              </h3>
            </Link>

            <Link
              href="/pages/assigned-subjects"
              className="rounded-xl border p-5 text-center transition hover:border-purple-500 hover:bg-purple-50"
            >
              <BookOpen
                className="mx-auto mb-3 text-purple-600"
                size={34}
              />
              <h3 className="font-semibold">
                Subjects
              </h3>
            </Link>

            <Link
              href="/pages/reports"
              className="rounded-xl border p-5 text-center transition hover:border-orange-500 hover:bg-orange-50"
            >
              <BarChart3
                className="mx-auto mb-3 text-orange-600"
                size={34}
              />
              <h3 className="font-semibold">
                Reports
              </h3>
            </Link>

          </div>

        </div>
                {/* ================= RECENT ACTIVITY ================= */}

                <div className="mt-12 grid gap-6 lg:grid-cols-2">

{/* Recent Activities */}

<div className="rounded-2xl bg-white p-8 shadow">

  <h2 className="text-2xl font-bold text-gray-800">
    Recent Activity
  </h2>

  <div className="mt-6 space-y-5">

    <div className="flex items-start gap-4">
      <div className="mt-2 h-3 w-3 rounded-full bg-green-500"></div>
      <div>
        <h3 className="font-semibold text-gray-800">
          New Faculty Joined
        </h3>
        <p className="text-sm text-gray-500">
          A new faculty member has been added to your department.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="mt-2 h-3 w-3 rounded-full bg-blue-500"></div>
      <div>
        <h3 className="font-semibold text-gray-800">
          Subjects Assigned
        </h3>
        <p className="text-sm text-gray-500">
          Subject allocation has been updated successfully.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="mt-2 h-3 w-3 rounded-full bg-orange-500"></div>
      <div>
        <h3 className="font-semibold text-gray-800">
          Attendance Updated
        </h3>
        <p className="text-sm text-gray-500">
          Student attendance records were updated today.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="mt-2 h-3 w-3 rounded-full bg-purple-500"></div>
      <div>
        <h3 className="font-semibold text-gray-800">
          Department Notice
        </h3>
        <p className="text-sm text-gray-500">
          A new notice has been published for all students.
        </p>
      </div>
    </div>

  </div>

</div>

{/* Department Overview */}

<div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow">

  <h2 className="text-2xl font-bold">
    Department Overview
  </h2>

  <p className="mt-3 text-indigo-100">
    Welcome to the department management panel. From here you can
    manage faculties, students, subjects, timetables, notices,
    workload, and reports efficiently.
  </p>

  <div className="mt-8 space-y-4">

    <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
      <span>Total Faculties</span>
      <span className="font-bold">
        {hodData?.facultyCount ?? 0}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
      <span>Total Students</span>
      <span className="font-bold">
        {hodData?.studentCount ?? 0}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
      <span>Total Subjects</span>
      <span className="font-bold">
        {hodData?.subjectCount ?? 0}
      </span>
    </div>

    <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
      <span>Department</span>
      <span className="font-bold">
        {hodData?.data?.department}
      </span>
    </div>

  </div>

</div>

</div>

</div>

</div>
);
};

export default Page;
