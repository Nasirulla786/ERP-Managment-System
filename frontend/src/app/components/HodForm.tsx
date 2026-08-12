"use client";

import React, { useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  User,
  BadgeCheck,
  Building2,
  ImagePlus,
  ArrowRight,
  ShieldCheck,
  Upload,
} from "lucide-react";

const HodForm = () => {
  const [name, setName] = useState("");
  const [hodId, setHodId] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("hod_id", hodId);
    formData.append("department", department);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post(
        "/hod-profile/",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("HOD Profile Created");
      router.push("/pages/hod-dashboard");
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">

      {/* Background Effects */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-96 w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr]">

          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-10 lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>

              <h2 className="mt-7 text-3xl font-black leading-tight text-white">
                Set Up Your
                <span className="block text-indigo-400">
                  HOD Profile
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                Complete your department profile to access the
                CampusFlow administration dashboard.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                  <Building2 className="h-5 w-5 text-indigo-400" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Department Management
                  </p>
                  <p className="text-xs text-slate-500">
                    Manage your academic department
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <BadgeCheck className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Verified Administration
                  </p>
                  <p className="text-xs text-slate-500">
                    Your profile is linked to your account
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                HOD Administration
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white">
                Create HOD Profile
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter your professional details to complete your profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  HOD Name
                </label>

                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* HOD ID */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  HOD ID
                </label>

                <div className="relative">
                  <BadgeCheck className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    placeholder="Enter your HOD ID"
                    value={hodId}
                    onChange={(e) => setHodId(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Department
                </label>

                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    placeholder="e.g. Computer Science"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  Profile Image
                </label>

                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-8 text-center transition hover:border-indigo-500 hover:bg-indigo-500/5">

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition group-hover:scale-105">
                    {image ? (
                      <ImagePlus className="h-6 w-6 text-indigo-400" />
                    ) : (
                      <Upload className="h-6 w-6 text-indigo-400" />
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-300">
                    {image ? image.name : "Upload your profile image"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PNG, JPG or JPEG
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30 active:scale-[0.99]"
              >
                <span>Create HOD Profile</span>

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-xs text-slate-500">
                Your information will be securely associated with your
                CampusFlow account.
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodForm;
