"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/lib/axios";

interface Notice {
  id: number;
  title: string;
  description: string;
  department: string;
  created_at: string;
}

const Page = () => {

  const [notices, setNotices] = useState<Notice[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {

    try {

      const res = await api.get(
        "/department-notices/",
        {
          withCredentials: true
        }
      );

      setNotices(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setFetching(false);

    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    try {

      setLoading(true);

      const res = await api.post(
        "/create-department-notice/",
        {
          title,
          description
        },
        {
          withCredentials: true
        }
      );

      console.log(res)

      setNotices([
        res.data.data,
        ...notices
      ]);

      setTitle("");
      setDescription("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Department Notices
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage notices for your department
          </p>

        </div>


        {/* CREATE NOTICE */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Create Notice
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notice Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter notice title"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Write your notice..."
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-500"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Publishing..."
                : "Publish Notice"
              }

            </button>

          </form>

        </div>


        {/* NOTICE LIST */}

        <div>

          <div className="mb-4">

            <h2 className="text-xl font-semibold text-slate-800">
              Published Notices
            </h2>

          </div>


          {fetching && (

            <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
              Loading notices...
            </div>

          )}


          {!fetching && notices.length === 0 && (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No notices published yet.
            </div>

          )}


          <div className="space-y-4">

            {!fetching &&
              notices.map((notice) => (

                <div
                  key={notice.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {notice.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          notice.created_at
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </p>

                    </div>

                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      Department
                    </span>

                  </div>

                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {notice.description}
                  </p>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Page;
