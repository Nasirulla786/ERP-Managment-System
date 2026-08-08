"use client";

import api from "@/app/lib/axios";
import { setUserData } from "@/redux/slices/userdata";
import { GraduationCap, Users, ShieldCheck } from "lucide-react";
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

    const res = await api.post("/profile/" ,{role:selectedRole} ,{withCredentials:true})
    console.log(res)
    if (res.status==201){
        dispatch(setUserData(res.data.data))
        router.push("/")
    }

    else{
        toast.error("something went wrong")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Select Your Role
          </h1>

          <p className="text-gray-500 mt-3">
            Choose your role to continue your ERP onboarding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-2xl bg-white p-8 border-2 transition-all duration-200 hover:-translate-y-2 hover:shadow-xl text-left ${
                  selectedRole === role.id
                    ? "border-blue-600 shadow-xl"
                    : "border-gray-200"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Icon className="text-blue-600" size={32} />
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {role.title}
                </h2>

                <p className="text-gray-500 mt-3">
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-3 rounded-xl font-semibold transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
