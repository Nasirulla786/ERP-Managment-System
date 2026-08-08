"use client";

import { useRef, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const StudentForm = () => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()


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

    try {
      const res = await api.post("/student-profile/", formData, {
        withCredentials: true,
      });
      console.log(res)

      toast.success(res.data.message);
      router.push("/pages/student-dashboard")


    } catch (err: any) {
      console.log(err.response?.data);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Student Profile
        </h1>

        <input
          type="text"
          placeholder="Enrollment Number"
          value={enrollmentNo}
          onChange={(e) => setEnrollmentNo(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageRef}
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
          className="w-full border rounded-lg p-3"
        />


        <div onClick={()=>{
          imageRef.current?.click()

        }}>
          Upload
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
