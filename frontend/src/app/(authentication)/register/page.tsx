"use client";
import api from "@/app/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleRegister = async () => {

    try {

     await api.post("/register/", {
        username,
        email,
        password,
      } , {withCredentials:true});

      toast.success("Register Successfully");
      router.push("/pages/role-page")

    } catch (error: any) {

      console.log(error.response?.data);
      alert(error?.response?.data?.message);

    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 font-sans">

      <div className="w-[400px] rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60">

        {/* Logo */}
        <div className="flex flex-col items-center gap-">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-200">
            <span className="text-lg font-bold text-white">CF</span>
          </div>
        <div className="flex gap-1 flex-col">
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-800 text-center" >
            Campus Flow
          </h1>
          <p className="mt-1 text-xs font-medium tracking-widest text-slate-400 text-center">
            CREATE YOUR ACCOUNT
          </p>
        </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

        </div>

        <button
          onClick={handleRegister}
          className="mt-7 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          REGISTER
        </button>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
            Login here
          </a>
        </p>

      </div>

    </div>
  );
}
