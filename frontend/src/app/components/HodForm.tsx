"use client";

import api from "@/app/lib/axios";
import Image from "next/image";
import { useState } from "react";
// import bg from "../../../../public/bg.png"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import bg from "../../../public/bg.png"

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const [error, setError] = useState([])

  const handleLogin = async () => {
    setIsLoading(true);
    try {

      const response = await api.post("/login/", {
        username,
        password,
      }  ,{withCredentials:true});

      console.log(response.data);

      if(response.status==200){
         toast.success("Login Successfully");
        router.push("/")

      }



    } catch (error: any) {

      console.log(error.response?.data);
      alert("Invalid Data");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white font-sans">

      {/* Left form panel */}
      <div className="flex w-full flex-col justify-center px-10 sm:w-[480px] sm:px-14">

        <div className="mx-auto w-full max-w-[340px]">

          {/* Logo */}
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-200">
              <span className="text-lg font-bold text-white">EM</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-800">
              Campus Flow
            </h1>
            <p className="mt-1 text-xs font-medium tracking-widest text-slate-400">
              WELCOME BACK
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">

            <p className="text-center text-xs font-semibold tracking-wide text-slate-500">
              PLEASE LOGIN
            </p>

            <div className="mt-5 flex flex-col gap-3.5">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
                />
              </div>

            </div>

            <label className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="h-3.5 w-3.5 accent-indigo-600"
              />
              Remember Me
            </label>

          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "LOGIN"
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-1 text-xs text-slate-500">
            <span>Don&apos;t have an account?</span>
            <Link href={"/register"} className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
              Sign Up
            </Link>
          </div>

        </div>

      </div>

      {/* Right image panel */}
      <div className="relative hidden flex-1 sm:flex">
        <Image src={bg} alt="None" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent" />
      </div>

    </div>
  );
}
