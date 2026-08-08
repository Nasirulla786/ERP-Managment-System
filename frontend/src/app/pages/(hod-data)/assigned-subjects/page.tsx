"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import toast from "react-hot-toast";
import { Subject } from "../department-subject/page";




// const subjects = [
//   "Mathematics",
//   "Physics",
//   "Chemistry",
//   "Computer Science",
//   "English",
//   "Data Structures",
//   "DBMS",
//   "Operating System",
//   "Python",
//   "Java",
// ];



const Page = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);

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
  const assignSubject = async () => {
    if (!selectedFaculty) {
      return toast.error("Select Faculty");
    }

    if (!subject) {
      return toast.error("Select Subject");
    }

    try {
      await api.put(
        `/assigned-subject/${selectedFaculty.id}/`,
        {
          subject,
        },
        {
          withCredentials: true,
        }
      );



      toast.success("Subject Assigned");

      fetchFaculties ();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  console.log(subjects)

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="mb-8 text-3xl font-bold">
        Assign Subject
      </h1>

      <div className="grid grid-cols-2 gap-8">

        {/* Faculty List */}

        <div className="rounded-xl bg-white p-5 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Faculties
          </h2>

          <div className="space-y-4">

            {faculties.map((faculty: any) => {
                return(
                    <div
                    key={faculty.id}
                    onClick={() => setSelectedFaculty(faculty)}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      selectedFaculty?.id === faculty.id
                        ? "border-blue-600 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-semibold">
                      {faculty.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {faculty.faculty_id}
                    </p>

                    <p className="text-sm text-blue-600">
                      Current Subject :
                      {" "}
                      {faculty.subject || "Not Assigned"}
                    </p>

                  </div>
                )



            }

            )}

          </div>

        </div>

        {/* Assign */}

        <div className="rounded-xl bg-white p-5 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Assign Subject
          </h2>

          {selectedFaculty ? (
            <>

              <p className="mb-4">
                Faculty :
                <span className="ml-2 font-semibold">
                  {selectedFaculty.name}
                </span>
              </p>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mb-5 w-full rounded-lg border p-3"
              >
                <option value="">
                  Select Subject
                </option>

                {subjects.map((sub) => (
                  <option key={sub?.id}>
                    {sub?.name}
                  </option>
                ))}

              </select>

              <button
                onClick={assignSubject}
                className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
              >
                Assign Subject
              </button>

            </>
          ) : (
            <p className="text-gray-500">
              Select a faculty first.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Page;
