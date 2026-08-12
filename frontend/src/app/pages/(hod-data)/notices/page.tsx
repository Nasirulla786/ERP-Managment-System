"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/lib/axios";
import Navbar from "@/app/components/Navbar";
import { Bell, Megaphone, Send, Clock, Calendar, Sparkles, Loader2 } from "lucide-react";

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
      const res = await api.get("/department-notices/", {
        withCredentials: true,
      });
      setNotices(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          description,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res);
      setNotices([res.data.data, ...notices]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 pb-16">
      <Navbar role="HOD" />

      {/* Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-8 px-4 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <Bell size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Department Noticeboard
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Publish and broadcast official department announcements to students & faculty
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 mt-8 space-y-8">
        {/* Create Notice Form Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Megaphone size={18} className="text-rose-400" />
                Publish Announcement
              </h2>
              <p className="text-xs text-slate-400">
                Create a new notice for instant distribution
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Notice Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. End Semester Exam Timetable Released"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Detailed Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write announcement content details here..."
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !title.trim() || !description.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-600/20 hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Publishing Announcement...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>PUBLISH NOTICE</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Notice Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock size={18} className="text-rose-400" />
              Published Announcements Feed
            </h2>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {notices.length} Notices
            </span>
          </div>

          {fetching && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center text-slate-400">
              <Loader2 size={24} className="animate-spin mx-auto text-rose-500 mb-2" />
              <p className="text-xs">Fetching published notices...</p>
            </div>
          )}

          {!fetching && notices.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-12 text-center text-slate-500">
              <Megaphone size={40} className="mx-auto text-slate-700 mb-3" />
              <p className="text-sm font-semibold text-slate-400">
                No Notices Published Yet
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Announcements created above will appear in this feed.
              </p>
            </div>
          )}

          {!fetching &&
            notices.map((notice) => (
              <div
                key={notice.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {notice.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1.5">
                      <Calendar size={13} className="text-rose-400" />
                      {new Date(notice.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[11px] font-bold text-rose-400 shrink-0">
                    Department Broadcast
                  </span>
                </div>

                <p className="whitespace-pre-line text-xs leading-relaxed text-slate-300 pt-2 border-t border-slate-800/60">
                  {notice.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
