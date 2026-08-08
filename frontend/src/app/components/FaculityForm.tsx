"use client";

import React, { useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FacultyForm = () => {

  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [salary, setSalary] = useState("");
  const [ department , setDepartment ] = useState("")
  const [subject, setSubject] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
      toast.error("Something went wrong");

    }

  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-[400px] rounded-xl bg-white p-6 shadow-lg"
      >

        <h1 className="mb-5 text-center text-2xl font-semibold">
          Create Faculty Profile
        </h1>


        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="text"
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e)=>setFacultyId(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder=" department "
          value={ department }
          onChange={(e)=>setDepartment(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="file"
          accept="image/*"
          onChange={(e)=>
            setImage(e.target.files?.[0] || null)
          }
          className="mb-4 w-full"
        />


        <button
          type="submit"
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          Create Faculty
        </button>


      </form>

    </div>
  );
};

export default FacultyForm;
