
"use client";

import api from "@/app/lib/axios";
import React, { useEffect, useState } from "react";
import { Student } from "../my-students/page";
import { Subject } from "../../(hod-data)/department-subject/page";
import Link from "next/link";

const Page = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [modelOpen, setModelOpen] = useState(false)
  const [mySubjects, setMySubjects] = useState<Subject[]>([])
  const [selectSem, setSelectSem] = useState<number>()

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/my-students/", {
        withCredentials: true,
      });

      setStudents(response.data);
    } catch (err) {
      console.log("Student fetch error:", err);
    } finally {
      setLoading(false);
    }
  };








  useEffect(()=>{
    const fetchDepSubjects = async()=>{
        try {
            const res = await api.get("/get-dep-subjects/" ,{withCredentials:true})
            // console.log(res)
            setMySubjects(res.data)

        } catch (error) {
            console.log(error)

        }
    }

    fetchDepSubjects()

  },[])



//   console.log(mySubjects);

  const selectSemester= mySubjects.filter((subject:Subject)=>subject?.semester==selectSem)
//   console.log("this",selectSemester)

  return (
    <div className="min-h-screen bg-slate-50 p-8">

<div className="w-full flex items-center justify-between">
    <h1 className="mb-8 text-3xl font-bold text-slate-800">
        Attendance
      </h1>

      <Link href={"/pages/attendance-history"}>
        AttenDance History
      </Link>
    </div>

      {/* BCA */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          BCA
        </h2>

        <div className="flex flex-wrap gap-4">
          {[
            1, 2, 3, 4, 5, 6
          ].map((semester) => (
            <div
              key={semester}
              className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
              onClick={()=>{
                setModelOpen((pre)=>!pre)
                setSelectSem(semester)
              }}
            >
              <p className="font-medium text-slate-700">
                Semester {semester}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MCA */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          MCA
        </h2>

        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4].map((semester) => (
            <div
              key={semester}
              className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
              onClick={()=>setModelOpen((pre)=>!pre)}
            >
              <p className="font-medium text-slate-700">
                Semester {semester}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BTech */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          BTech
        </h2>

        <div className="flex flex-wrap gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <div
              key={semester}
              className="cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
              onClick={()=>setModelOpen((pre)=>!pre)}
            >
              <p className="font-medium text-slate-700">
                Semester {semester}
              </p>
            </div>
          ))}
        </div>
      </div>



      {
        modelOpen && <div className="w-[500px] h-[500px] mx-auto my-auto bg-black ">



{
    selectSemester?.map((sub)=>{
        return(
            <Link href={"/pages/student-list/"+sub?.name} key={sub?.id} >
                <h1 className="text-white">{sub?.name}</h1>
            </Link >
        )
    })
}






        </div>
      }

    </div>
  );
};

export default Page;



const  modelComponent = ()=>{
    return(
        <div>
            hello
        </div>
    )
}
