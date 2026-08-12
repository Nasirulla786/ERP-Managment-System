"use client";

import api from "@/app/lib/axios";
import { setUserData } from "@/redux/slices/userdata";
import { GraduationCap, Users, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const roles = [
  {
    id: "student",
    title: "Student",
    subtitle: "ACADEMIC PORTAL",
    description: "Access courses, view timetable, track attendance history and monitor academic performance.",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-teal-600",
    badge: "Student Workspace",
  },
  {
    id: "faculty",
    title: "Faculty Member",
    subtitle: "TEACHING PORTAL",
    description: "Manage assigned classes, mark student attendance, view schedules and post course materials.",
    icon: Users,
    gradient: "from-violet-500 to-indigo-600",
    badge: "Faculty Workspace",
  },
  {
    id: "hod",
    title: "Head of Department",
    subtitle: "ADMINISTRATION PORTAL",
    description: "Manage department faculties, assign subjects, create timetables, publish notices and view analytics.",
    icon: ShieldCheck,
    gradient: "from-indigo-500 to-blue-600",
    badge: "Department Admin",
  },
];

export default function RolePage() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleContinue = async () => {
    if (!selectedRole) return;

    try {
      const res = await api.post(
        "/profile/",
        { role: selectedRole },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status == 201) {
        dispatch(setUserData(res.data.data));
        router.push("/");
      }

      else{
          alert("something went wrong")

      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to set role");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-5 py-12 font-sans text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-500/10 mb-4">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-widest mb-3">
            <Sparkles size={13} />
            Step 2 of 2: Setup Workspace
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Select Your Role in CampusFlow
          </h1>
          <p className="text-slate-400 mt-2.5 text-sm max-w-lg leading-relaxed">
            Choose your account privilege level to customize your dashboard layout, management tools, and academic features.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`group relative cursor-pointer rounded-3xl p-7 text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10 -translate-y-1"
                    : "bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 hover:-translate-y-0.5"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected
                          ? `bg-gradient-to-br ${role.gradient} text-white shadow-lg shadow-indigo-500/30 scale-105`
                          : "bg-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800/80"
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    {isSelected ? (
                      <span className="flex items-center gap-1 rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                        <CheckCircle2 size={13} className="text-indigo-400" />
                        Selected
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        {role.subtitle}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-extrabold text-white">
                    {role.title}
                  </h2>

                  <p className="text-slate-400 mt-2.5 text-xs leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>{role.badge}</span>
                  <span className={`transition-transform duration-200 ${isSelected ? "text-indigo-400 translate-x-1" : "group-hover:translate-x-1"}`}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex flex-col items-center justify-center mt-12">
          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-9 py-3.5 rounded-2xl text-sm font-bold tracking-wide shadow-xl shadow-indigo-600/20 disabled:shadow-none transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>ENTER WORKSPACE</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
