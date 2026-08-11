"use client";

import React, { useRef, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Camera, User, Loader2 } from "lucide-react";

const FacultyForm = () => {

  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [salary, setSalary] = useState("");
  const [ department , setDepartment ] = useState("")
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("faculty_id", facultyId);
    formData.append("salary", salary);
    formData.append("interested_subject", subject);
    formData.append(" department ",  department );

    if(image){
      formData.append("image", image);
    }


    setIsLoading(true);
    try {

      const response = await api.post(
        "/faculty-profile/",
        formData,
        {withCredentials:true}
      );



      toast.success("Faculty Profile Created");


      console.log(response.data);
      router.push("/pages/faculty-dashboard")


    } catch(error:any){

      console.log(error.response?.data);
      toast.error("Invalid Data");

    } finally {
      setIsLoading(false);
    }

  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5 font-sans">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60"
      >

        <div className="flex flex-col items-center mb-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-200">
            <span className="text-sm font-bold text-white">EM</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-800">
            Create Faculty Profile
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Set up your faculty account details
          </p>
        </div>

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

        <div className="flex flex-col items-center mb-7">
          <div
            onClick={() => !isLoading && imageRef.current?.click()}
            className={`group relative h-24 w-24 ${isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
          >
            <div
              className={`h-24 w-24 overflow-hidden rounded-full border-2 transition-colors ${
                imagePreview
                  ? "border-indigo-400"
                  : "border-dashed border-slate-300 group-hover:border-indigo-400"
              } bg-slate-50 flex items-center justify-center`}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={30} className="text-slate-300" />
              )}
            </div>

            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-white transition-transform group-hover:scale-110">
              <Camera size={14} />
            </div>
          </div>

          <p className="mt-2.5 text-xs text-slate-500">
            {image ? image.name : "Click to upload your photo"}
          </p>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Faculty Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Priya Nair"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Faculty ID</label>
              <input
                type="text"
                placeholder="e.g. FAC-2024-01"
                value={facultyId}
                onChange={(e)=>setFacultyId(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">Salary</label>
              <input
                type="number"
                placeholder="e.g. 60000"
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Subject</label>
            <input
              type="text"
              placeholder="e.g. Data Structures"
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">Department</label>
            <input
              type="text"
              placeholder="e.g. Computer Science"
              value={ department }
              onChange={(e)=>setDepartment(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-60"
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold tracking-wide text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-indigo-400 disabled:hover:shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create Faculty"
          )}
        </button>


      </form>

    </div>
  );
};

export default FacultyForm;
