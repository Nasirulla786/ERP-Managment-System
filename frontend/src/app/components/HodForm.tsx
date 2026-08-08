"use client";

import React, { useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const HodForm = () => {

  const [name, setName] = useState("");
  const [hodId, setHodId] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter()



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    const formData = new FormData();

    formData.append("name", name);
    formData.append("hod_id", hodId);
    formData.append("department", department);


    if(image){
      formData.append("image", image);
    }



    try {

      const response = await api.post(
        "/hod-profile/",
        formData,
       {
        withCredentials:true
       }
      );

      toast.success("HOD Profile Created");
      router.push("/pages/hod-dashboard")


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

        <h1 className="mb-6 text-center text-2xl font-semibold">
          Create HOD Profile
        </h1>


        <input
          type="text"
          placeholder="HOD Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="text"
          placeholder="HOD ID"
          value={hodId}
          onChange={(e)=>setHodId(e.target.value)}
          className="mb-3 w-full rounded border p-2"
        />


        <input
          type="text"
          placeholder="Department"
          value={department}
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
          Create HOD
        </button>


      </form>

    </div>

  );
};

export default HodForm;
