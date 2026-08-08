"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import {
  Plus,
  X,
  BookOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useCurrentFaculty from "@/app/hooks/useCurrentFaculty";
import { Faculty } from "../my-faculty/page";
import Image from "next/image";

export interface Subject {
  id: number;
  name: string;
  subject_code: string;
  course: string;
  department: string;
  semester: number;
  total_marks: number;
  credits: number;
  subject_type: "core" | "elective";
}

const Page = () => {


  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [subjectType, setSubjectType] = useState("core");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [facultyDataOpen, setFacultyDataOpen] = useState(false)



  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await api.get("/get-my-faculties/", {
        withCredentials: true,
      });

      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchSubjects = async () => {

    try {

      const response = await api.get(
        "/get-subjects/",
        {
          withCredentials: true,
        }
      );

      setSubjects(response.data);

    } catch (error: any) {

      console.log(error.response?.data);

      toast.error("Unable to fetch subjects");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchSubjects();

  }, []);


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !name ||
      !subjectCode ||
      !course ||
      !department ||
      !semester ||
      !totalMarks

    ) {

      toast.error("Please fill all fields");

      return;
    }


    try {

      const response = await api.post(
        "/create-subject/",
        {
          name,
          subject_code: subjectCode,
          course,
          department,
          semester: Number(semester),
          total_marks: Number(totalMarks),
          subject_type: subjectType,
        },
        {
          withCredentials: true,
        }
      );


      toast.success(
        "Subject created successfully"
      );


      // New subject ko list ke top par add karna
      setSubjects((prev) => [
        response.data.data,
        ...prev,
      ]);


      // Form reset

      setName("");
      setSubjectCode("");
      setCourse("");
      setDepartment("");
      setSemester("");
      setTotalMarks("");

      setSubjectType("core");

      setShowModal(false);


    } catch (error: any) {

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  console.log(faculties)

  return (

    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}

      <div className="bg-indigo-600 px-8 py-7 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Subject Management
              </h1>

              <p className="mt-1 text-indigo-100">
                Create and manage department subjects
              </p>

            </div>


            {/* ADD BUTTON */}

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-indigo-600 shadow transition hover:bg-indigo-50"
            >

              <Plus size={20} />

              Add Subject

            </button>

            <div className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-indigo-600 shadow transition hover:bg-indigo-50 text-black" onClick={()=>setFacultyDataOpen((pre)=>!pre)}>
                hell

      </div>

      {
        facultyDataOpen &&  <div>
            <h1>
                {faculties.map((tea ,idx)=>{
                    return(
                        <div key={idx}>
                            <h1>
                                {tea.name}
                            </h1>

                            <h2>
                                {tea?.assigned_subject
                                }
                            </h2>

                            <Image src={tea?.image} alt="None" height={
                                20
                            } width={20} />

                        </div>
                    )
                })}
            </h1>

        </div>
      }


          </div>



        </div>

      </div>




      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-8 py-8">


        {/* SUBJECT COUNT */}

        <div className="mb-6 rounded-xl bg-white p-6 shadow">

          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">

              <BookOpen size={28} />

            </div>


            <div>

              <p className="text-sm text-gray-500">
                Total Subjects
              </p>

              <p className="text-3xl font-bold text-gray-800">
                {subjects.length}
              </p>

            </div>

          </div>

        </div>


        {/* ================= SUBJECT LIST ================= */}

        <div className="rounded-xl bg-white shadow">

          <div className="border-b px-6 py-5">

            <h2 className="text-xl font-bold text-gray-800">
              All Subjects
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Subjects available in your department
            </p>

          </div>


          {loading ? (

            <div className="p-10 text-center text-gray-500">
              Loading subjects...
            </div>

          ) : subjects.length === 0 ? (

            <div className="p-10 text-center">

              <BookOpen
                size={45}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-gray-500">
                No subjects created yet.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-indigo-600 hover:underline"
              >
                Create your first subject
              </button>

            </div>

          ) : (

            <div className="divide-y">

              {subjects.map((subject) => (

                <div
                  key={subject.id}
                  className="flex items-center justify-between px-6 py-5 transition hover:bg-gray-50"
                >

                  {/* LEFT */}

                  <div className="flex items-center gap-4">

                    <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">

                      <BookOpen size={24} />

                    </div>


                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {subject.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {subject.subject_code}
                      </p>

                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="hidden items-center gap-8 md:flex">

                    <div>

                      <p className="text-xs text-gray-400">
                        Course
                      </p>

                      <p className="font-medium">
                        {subject.course}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Semester
                      </p>

                      <p className="font-medium">
                        {subject.semester}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Marks
                      </p>

                      <p className="font-medium">
                        {subject.total_marks}
                      </p>

                    </div>


                    <div>

                      <p className="text-xs text-gray-400">
                        Credits
                      </p>

                      <p className="font-medium">
                        {subject.credits}
                      </p>

                    </div>


                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        subject.subject_type === "core"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {subject.subject_type === "core"
                        ? "Core"
                        : "Elective"}
                    </span>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex items-center gap-2">

                    <button
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* ================= MODAL ================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">


            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  Create Subject
                </h2>

                <p className="text-sm text-gray-500">
                  Add a new subject to your department
                </p>

              </div>


              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >

                <X size={22} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >


              {/* NAME */}

              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Subject Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Data Structures"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                />

              </div>


              {/* CODE + COURSE */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Subject Code
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. BCA301"
                    value={subjectCode}
                    onChange={(e) =>
                      setSubjectCode(e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                  />

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Course
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. BCA"
                    value={course}
                    onChange={(e) =>
                      setCourse(e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                  />

                </div>

              </div>


              {/* DEPARTMENT */}

              <div>

                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Department
                </label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={department}
                  onChange={(e) =>
                    setDepartment(e.target.value)
                  }
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                />

              </div>


              {/* SEMESTER + MARKS */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Semester
                  </label>

                  <select
                    value={semester}
                    onChange={(e) =>
                      setSemester(e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                  >

                    <option value="">
                      Select Semester
                    </option>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map(
                      (sem) => (
                        <option
                          key={sem}
                          value={sem}
                        >
                          Semester {sem}
                        </option>
                      )
                    )}

                  </select>

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Total Marks
                  </label>

                  <input
                    type="number"
                    placeholder="100"
                    value={totalMarks}
                    onChange={(e) =>
                      setTotalMarks(e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                  />

                </div>

              </div>


              {/* CREDITS + TYPE */}

              <div className="grid gap-4 md:grid-cols-2">



                <div>

                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Subject Type
                  </label>

                  <select
                    value={subjectType}
                    onChange={(e) =>
                      setSubjectType(e.target.value)
                    }
                    className="w-full rounded-lg border px-3 py-2.5 outline-none focus:border-indigo-500"
                  >

                    <option value="core">
                      Core
                    </option>

                    <option value="elective">
                      Elective
                    </option>

                  </select>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t pt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-lg border px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700"
                >
                  Create Subject
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );
};

export default Page;
