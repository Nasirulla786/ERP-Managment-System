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

      const response = await api.post("/register/", {
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
    <div className="flex h-screen w-screen items-center justify-center ">

      <div className="w-[380px] rounded-xl bg-white p-8 shadow-xl">

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500" />
          <h1 className="mt-3 text-xl font-medium text-slate-700">
            ERP Maestro
          </h1>
          <p className="mt-1 text-xs tracking-wide text-slate-400">
            CREATE YOUR ACCOUNT
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-indigo-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-indigo-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-indigo-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />

        </div>

        <button
          onClick={handleRegister}
          className="mt-6 w-full rounded-md bg-indigo-500 py-2 text-sm font-medium tracking-wide text-white hover:bg-indigo-600"
        >
          REGISTER
        </button>

        <p className="mt-5 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login here
          </a>
        </p>

      </div>

    </div>
  );
}
