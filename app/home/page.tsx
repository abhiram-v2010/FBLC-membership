"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Announcement = { id: string; title: string; body: string; createdAt: string };

const SUBPAGES = [
  ["Education Hub", "/education-hub"],
  ["Member Services Hub", "/member-services-hub"],
  ["Aspire Link Application Portal", "/aspire-link-application-portal"],
  ["Opportunity Connect", "/opportunity-connect"],
  ["Past Meetings Directory", "/past-meetings-directory"],
  ["Assessment Portal", "/assessment-portal"],
  ["Executive Management Portal", "/executive-management-portal"],
] as const;

export default function HomePage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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

  function saveAnnouncements(next: Announcement[]) {
    setAnnouncements(next);
    try {
      localStorage.setItem("fblc_announcements", JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  }

  function postAnnouncement(e?: React.FormEvent) {
    e?.preventDefault();
    if (role !== "admin") return;
    if (!title.trim() || !body.trim()) return;

    if (editingId) {
      const updated = announcements.map((a) =>
        a.id === editingId ? { ...a, title: title.trim(), body: body.trim() } : a
      );
      saveAnnouncements(updated);
      setEditingId(null);
    } else {
      const a: Announcement = { id: `${Date.now()}`, title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() };
      saveAnnouncements([a, ...announcements]);
    }
    setTitle("");
    setBody("");
  }

  function deleteAnnouncement(id: string) {
    if (role !== "admin") return;
    saveAnnouncements(announcements.filter((a) => a.id !== id));
  }

  function startEdit(a: Announcement) {
    setEditingId(a.id);
    setTitle(a.title);
    setBody(a.body);
    setShowPortal(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setBody("");
  }

  function handleLogout() {
    try {
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
                <div className="text-white font-bold text-2xl">FBLC</div>
                <div className="text-white font-bold text-3xl">Member Link</div>
              </div>
            )}
            {SUBPAGES.map(([label, href]) => {
              // Hide "Executive Management Portal" from non-admin users
              if (label === "Executive Management Portal" && role !== "admin") {
                return null;
              }
              return (
                <Link key={href} href={href} className="text-white text-xl font-semibold hover:text-white/80 transition px-4 py-3 rounded-lg">
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
        <img src="/banner-placeholder.svg" alt="Banner placeholder" className="w-full h-[420px] object-cover" />
      </div>

      {/* Announcements section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Announcements</h2>

          {/* Admin: Post announcement form */}
          {role === "admin" && (
            <div className="mb-8 bg-white/10 rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">{editingId ? "Edit announcement" : "Post announcement"}</h3>
              <form onSubmit={postAnnouncement} className="grid grid-cols-1 gap-4">
                <input
                  className="p-3 bg-white/5 border border-white/20 rounded text-white placeholder-white/50"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="p-3 bg-white/5 border border-white/20 rounded text-white placeholder-white/50"
                  rows={4}
                  placeholder="Message"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={cancelEdit} className="px-6 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                    {editingId ? "Update" : "Post"}
                  </button>
                </div>
              </form>
            </div>
          )}

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
                    {role === "admin" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(a)}
                          className="px-3 py-1 rounded bg-blue-600/70 text-white text-sm hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(a.id)}
                          className="px-3 py-1 rounded bg-red-600/70 text-white text-sm hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
