"use client";

import React, { useRef, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Camera, User, Loader2, Users, CheckCircle2 } from "lucide-react";

const FacultyForm = () => {
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("faculty_id", facultyId);
    formData.append("salary", salary);
    formData.append("interested_subject", subject);
    formData.append(" department ", department);

    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);
    try {
      const response = await api.post(
        "/faculty-profile/",
        formData,
        { withCredentials: true }
      );

      toast.success("Faculty Profile Created");
      console.log(response.data);
      router.push("/pages/faculty-dashboard");
    } catch (error: any) {
      console.log(error.response?.data);
      toast.error("Invalid Data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-2xl shadow-slate-950/80 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 shadow-xl shadow-violet-500/20 ring-4 ring-violet-500/10 mb-3">
            <Users size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Create Faculty Profile
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            Set up your teaching credentials and departmental details
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageRef}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImage(file);
            setImagePreview(file ? URL.createObjectURL(file) : null);
          }}
        />

        {/* Profile Photo Upload Ring */}
        <div className="flex flex-col items-center mb-8">
          <div
            onClick={() => !isLoading && imageRef.current?.click()}
            className={`group relative h-28 w-28 ${
              isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
          >
            <div
              className={`h-28 w-28 overflow-hidden rounded-full border-2 transition-all ${
                imagePreview
                  ? "border-violet-500 ring-4 ring-violet-500/20 shadow-lg shadow-violet-500/20"
                  : "border-dashed border-slate-700 bg-slate-950 group-hover:border-violet-500"
              } flex items-center justify-center`}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={36} className="text-slate-600 group-hover:text-violet-400 transition-colors" />
              )}
            </div>

            <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-2 ring-slate-900 transition-transform group-hover:scale-110">
              <Camera size={16} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            {image ? image.name : "Click circle to upload profile photo"}
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Faculty Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Priya Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Faculty ID
              </label>
              <input
                type="text"
                placeholder="e.g. FAC-2024-01"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Salary (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 60000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Primary Subject / Field
            </label>
            <input
              type="text"
              placeholder="e.g. Data Structures & Algorithms"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Department Name
            </label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-600/30 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving Profile...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>CREATE FACULTY PROFILE</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FacultyForm;
