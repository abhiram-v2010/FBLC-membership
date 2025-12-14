"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Announcement = { id: string; title: string; body: string; createdAt: string };

const SUBPAGES = [
  ["Education Hub", "/education-hub"],
  ["Member Services Hub", "/member-services-hub"],
  ["Past Meetings Directory", "/past-meetings-directory"],
  ["Quiz Hub", "/quiz-hub"]
] as const;

export default function HomePage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("fblc_announcements");
      if (raw) setAnnouncements(JSON.parse(raw));
      
      const r = localStorage.getItem("fblc_role");
      setRole(r);
    } catch (e) {
      // ignore
    }
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      
      localStorage.removeItem("fblc_role");
      localStorage.removeItem("fblc_email");
    } catch (e) {
      // ignore
    }
    router.push("/");
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #001E60 0%, #000000 100%)" }}>
      {/* Professional centered navbar */}
      <header className="w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-center" style={{ minHeight: '110px' }}>
          <nav className="flex gap-12 items-center">
            {role !== "admin" && (
              <div className="flex items-center gap-5 pr-12 border-r border-white/20">
                <img src="/FBLC.svg" className="object-cover"/>
              </div>
            )}
            {SUBPAGES.map(([label, href]) => {
              return (
                <Link key={href} href={href} className="bg-blue-500 text-black font-semibold hover:text-white/80 transition px-4 py-3 rounded-lg">
                  {label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="text-white text-xl font-semibold hover:text-white/80 transition border-l border-white/20 pl-8 px-4 py-3 rounded-lg"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full">
        <img src="/banner-placeholder.svg" className="w-full h-[420px] object-cover" />
      </div>

      {/* Announcements section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Announcements</h2>

          {/* Announcements list */}
          {announcements.length === 0 ? (
            <div className="text-center py-12 text-white/60">No announcements at this time.</div>
          ) : (
            <div className="space-y-4">
              {announcements.map((a) => (
                <div key={a.id} className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                      <p className="text-sm text-white/60 mt-1">{new Date(a.createdAt).toLocaleString()}</p>
                    </div>
                    {/* Admin buttons for edit/delete are removed here */}
                  </div>
                  <p className="text-white/80">{a.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t border-white/10 py-6 text-center text-sm text-white/60">FBLC Member Link — Demo</footer>
    </div>
  );
}