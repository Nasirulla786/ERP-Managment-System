"use client";

import api from "@/app/lib/axios";
import { setUserData } from "@/redux/slices/userdata";
import axios from "axios";
import { GraduationCap, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Access courses, assignments, attendance and results.",
    icon: GraduationCap,
  },
  {
    id: "faculty",
    title: "Faculty",
    description: "Manage students, attendance, marks and classes.",
    icon: Users,
  },
  {
    id: "hod",
    title: "HOD",
    description: "Manage departments, faculty and academic activities.",
    icon: ShieldCheck,
  },
];

export default function RolePage() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter()
  const dispatch = useDispatch()

  const handleContinue = async () => {
    if (!selectedRole) return;

  try {

    const res = await api.post("/profile/" ,{role:selectedRole} ,{withCredentials:true})
    console.log(res)
    if (res.status==201){
        dispatch(setUserData(res.data.data))
        router.push("/")
    }

  } catch (error:any) {
    toast.error(error.response.data.message)

  }


  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-16 font-sans">
      <div className="w-full max-w-5xl">

        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-200">
            <span className="text-sm font-bold text-white">EM</span>
          </div>
          <p className="mt-4 text-xs font-medium tracking-widest text-indigo-500">
            STEP 2 OF 2
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800">
            Select your role
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Choose how you&apos;ll be using ERP Maestro. This sets up your workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`group relative cursor-pointer rounded-2xl bg-white p-7 border text-left transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500 shadow-lg shadow-indigo-100 ring-1 ring-indigo-500"
                    : "border-slate-200 hover:border-indigo-200 hover:shadow-md"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center mb-5 transition-colors ${
                    isSelected ? "bg-indigo-600" : "bg-slate-100 group-hover:bg-indigo-50"
                  }`}
                >
                  <Icon
                    className={isSelected ? "text-white" : "text-slate-500 group-hover:text-indigo-600"}
                    size={18}
                  />
                </div>

                <h2 className="text-base font-semibold text-slate-800">
                  {role.title}
                </h2>

                <p className="text-slate-500 mt-1.5 text-sm leading-relaxed">
                  {role.description}
                </p>

                {isSelected && (
                  <div className="absolute top-5 right-5 h-2 w-2 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg text-sm font-semibold tracking-wide shadow-md shadow-indigo-200 disabled:shadow-none transition-all cursor-pointer"
          >
            Continue
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
