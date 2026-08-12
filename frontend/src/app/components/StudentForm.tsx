"use client";

import { useRef, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Camera, User, Loader2, GraduationCap, CheckCircle2 } from "lucide-react";

const StudentForm = () => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("enrollment_no", enrollmentNo);
    formData.append("phone", phone);
    formData.append("date_of_birth", dob);
    formData.append("course", course);
    formData.append("department", department);
    formData.append("semester", semester);

    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);
    try {
      const res = await api.post("/student-profile/", formData, {
        withCredentials: true,
      });
      console.log(res);

      toast.success(res.data.message || "Profile created successfully!");
      router.push("/pages/student-dashboard");
    } catch (err: any) {
      console.log(err.response?.data);
      toast.error("Invalid Data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-5 font-sans text-slate-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-2xl shadow-slate-950/80 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-500/10 mb-3">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Complete Student Profile
          </h1>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            Enter your academic and personal details to finish portal setup
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageRef}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setImage(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }}
        />

        {/* Profile Photo Uploader */}
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
                  ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-lg shadow-emerald-500/20"
                  : "border-dashed border-slate-700 bg-slate-950 group-hover:border-emerald-500"
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
                <User size={36} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
              )}
            </div>

            <div className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-slate-900 transition-transform group-hover:scale-110">
              <Camera size={16} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            {image ? image.name : "Click circle to upload profile photo"}
          </p>
        </div>

        {/* Form Fields Grid */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Enrollment Number
            </label>
            <input
              type="text"
              placeholder="e.g. 21CS1042"
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer disabled:opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Course
              </label>
              <input
                type="text"
                placeholder="e.g. BCA / B.Tech"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Department
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Semester
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-emerald-600/30 transition-all hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving Profile...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>CREATE PROFILE & CONTINUE</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
