"use client";

import api from "@/app/lib/axios";
import Image from "next/image";
import { useState } from "react";
import bg from "../../../../public/bg.png"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter()

  const [error, setError] = useState([])

  const handleLogin = async () => {

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
      alert(error?.response?.data?.message);

    }
  };

  return (
    <div className="flex h-screen w-screen bg-white">

      {/* Left blue strip */}
      <div className="w-3 " />

      {/* Left form panel */}
      <div className="flex w-[500px] flex-col px-10 pt-16">

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500" />
          <h1 className="mt-3 text-2xl font-medium text-slate-700">
            ERP Raaz
          </h1>
        </div>

        <hr className="mt-8 border-slate-200" />

        <div className="mt-8 rounded-md bg-slate-50 p-6">

          <p className="text-center text-xs font-semibold tracking-wide text-slate-500">
            PLEASE LOGIN
          </p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-4 w-full rounded-md border border-indigo-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 w-full rounded-md border border-indigo-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

          <label className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-indigo-500"
            />
            Remember Me
          </label>

        </div>

        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-md bg-indigo-400 py-2 text-sm font-medium tracking-wide text-white hover:bg-indigo-500"
        >
          LOGIN
        </button>

        <hr className="mt-8 border-slate-200" />

        <div className="mt-4 flex justify-between text-xs">
          <Link  href={"/register"} className="text-indigo-500 hover:underline">
            Sing Up
          </Link >

        </div>

      </div>

      {/* Right image panel */}
      <div className="hidden sm:flex relative flex-1 bg-red-500" />

      <Image src={bg} alt="None" className=" h-full w-full object-cover hidden sm:flex" />

    </div>
  );
}
