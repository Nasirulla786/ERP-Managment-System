
"use client";

import useCurrentFaculty from "@/app/hooks/useCurrentFaculty";
import { RootState } from "@/redux/store";
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Megaphone,
  Users,
  Clock3,
  ArrowRight,
  CheckCircle2,
  UserRound,
  Building2,
  BookMarked,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Page = () => {
  useCurrentFaculty();

  const { facultyData }: any = useSelector(
    (state: RootState) => state.faculty
  );

  console.log(facultyData);

  if (!facultyData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading faculty dashboard...
          </p>
        </div>
      </div>
    );
  }

  const faculty = facultyData?.data || facultyData;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="text-sm text-indigo-200">
                Faculty Portal
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Welcome back, {faculty?.name || "Faculty"} 👋
              </h1>

              <p className="mt-2 text-indigo-100">
                Manage your subjects, students and academic activities.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
                <p className="text-xs text-indigo-100">
                  Faculty ID
                </p>

                <p className="font-semibold">
                  {faculty?.faculty_id || "-"}
                </p>
              </div>

              <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
                <p className="text-xs text-indigo-100">
                  Department
                </p>

                <p className="font-semibold">
                  {faculty?.department || "-"}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* ================= MAIN ================= */}

      <div className="mx-auto max-w-7xl px-6 py-8">


        {/* ================= PROFILE + SUBJECT ================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* PROFILE */}

          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              <img
                src={faculty?.image}
                alt="Faculty"
                className="h-28 w-28 rounded-2xl border object-cover"
              />

              <div className="flex-1">

                <div className="flex items-center gap-2">
                  <UserRound
                    size={18}
                    className="text-indigo-600"
                  />

                  <span className="text-sm font-medium text-indigo-600">
                    Faculty Member
                  </span>
                </div>

                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {faculty?.name || "Faculty Name"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {faculty?.faculty_id || "Faculty ID not available"}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                    <Building2 size={16} />
                    {faculty?.department || "Department"}
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
                    <BookOpen size={16} />
                    {faculty?.subject || "Subject"}
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ASSIGNED SUBJECT */}

          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-white shadow-sm">

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-white/15 p-3">
                <BookMarked size={25} />
              </div>

              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                Assigned
              </span>

            </div>

            <p className="mt-6 text-sm text-purple-100">
              Assigned Subject
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {faculty?.assigned_subject || "Not Assigned"}
            </h2>

            <p className="mt-2 text-sm text-purple-100">
              Your currently assigned teaching subject.
            </p>

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="My Students"
            value="0"
            subtitle="Students enrolled"
            icon={<GraduationCap size={24} />}
            className="bg-blue-100 text-blue-600"
          />

          <StatCard
            title="My Subjects"
            value="1"
            subtitle="Assigned subjects"
            icon={<BookOpen size={24} />}
            className="bg-purple-100 text-purple-600"
          />

          <StatCard
            title="Today's Classes"
            value="0"
            subtitle="Classes scheduled"
            icon={<CalendarDays size={24} />}
            className="bg-green-100 text-green-600"
          />

          <StatCard
            title="Attendance"
            value="0%"
            subtitle="This semester"
            icon={<ClipboardCheck size={24} />}
            className="bg-orange-100 text-orange-600"
          />

        </div>


        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-800">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used faculty features
            </p>
          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <ActionCard
              title="My Students"
              description="View students assigned to you"
              icon={<Users size={25} />}
              className="bg-blue-100 text-blue-600"
              sendLink = "/pages/my-students"
            />

            <ActionCard
              title="Attendance"
              description="Mark and manage attendance"
              icon={<ClipboardCheck size={25} />}
              className="bg-green-100 text-green-600"
              sendLink = "/pages/attendence-page"
            />

            <ActionCard
              title="Assignments"
              description="Create and manage assignments"
              icon={<FileText size={25} />}
              className="bg-purple-100 text-purple-600"
                sendLink = "/pages/assignment-page"
            />

            <ActionCard
              title="Timetable"
              description="View your teaching schedule"
              icon={<CalendarDays size={25} />}
              className="bg-orange-100 text-orange-600"
                sendLink = "/pages/timetable-page"
            />

          </div>

        </div>


        {/* ================= TODAY + NOTICES ================= */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">


          {/* TODAY'S SCHEDULE */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Today's Schedule
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your classes for today
                </p>
              </div>

              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <Clock3 size={22} />
              </div>

            </div>


            <div className="mt-6">

              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">

                <CalendarDays
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-medium text-slate-600">
                  No classes scheduled
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your timetable will appear here.
                </p>

              </div>

            </div>

          </div>


          {/* NOTICES */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Department Notices
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest announcements
                </p>
              </div>

              <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                <Megaphone size={22} />
              </div>

            </div>


            <div className="mt-6 space-y-3">

              <Notice
                title="No new notices"
                description="New department announcements will appear here."
              />

            </div>

          </div>

        </div>


        {/* ================= ACADEMIC OVERVIEW ================= */}

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Academic Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Quick overview of your teaching responsibilities.
              </p>
            </div>

            <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
              Current Semester
            </div>

          </div>


          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <OverviewItem
              title="Assigned Subject"
              value={faculty?.assigned_subject || "Not Assigned"}
            />

            <OverviewItem
              title="Department"
              value={faculty?.department || "-"}
            />

            <OverviewItem
              title="Faculty ID"
              value={faculty?.faculty_id || "-"}
            />

          </div>

        </div>


        {/* ================= FOOTER STATUS ================= */}

        <div className="mt-8 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-5 py-4">

          <CheckCircle2
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-sm font-semibold text-green-700">
              Faculty account active
            </p>

            <p className="text-xs text-green-600">
              You have access to your department's academic resources.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


/* ================================================= */
/* COMPONENTS */
/* ================================================= */


const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  className,

}: any) => {

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>

        </div>

        <div className={`rounded-xl p-3 ${className}`}>
          {icon}
        </div>

      </div>

    </div>
  );
};


const ActionCard = ({
  title,
  description,
  icon,
  className,
    sendLink
}: any) => {

  return (
    <Link href={sendLink} className="group cursor-pointer rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className={`rounded-xl p-3 ${className}`}>
          {icon}
        </div>

        <ArrowRight
          size={20}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
        />

      </div>

      <h3 className="mt-5 font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

    </Link>
  );
};


const Notice = ({
  title,
  description,
}: any) => {

  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 p-4">

      <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
        <Megaphone size={18} />
      </div>

      <div>

        <p className="font-medium text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
};


const OverviewItem = ({
  title,
  value,
}: any) => {

  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
};


export default Page;
