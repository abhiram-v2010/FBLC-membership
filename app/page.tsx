"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type View = "sign-in" | "sign-up" | "reset";

export default function Page() {
    const router = useRouter();
    const [view, setView] = useState<View>("sign-in");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // sign-in
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // sign-up
    const [name, setName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupConfirm, setSignupConfirm] = useState("");

    // reset
    const [resetEmail, setResetEmail] = useState("");

    async function handleSignIn(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const body = await res.json().catch(() => null);
            if (res.ok) {
                const role = body?.role ?? "user";
                try {
                  localStorage.setItem("fblc_role", role);
                  localStorage.setItem("fblc_email", email);
                } catch (e) {
                  // ignore storage errors
                }
                setMessage(body?.message ?? "Signed in");
                // On successful demo login, navigate to the new home page
                router.push("/home");
                return;
            } else setMessage(body?.message ?? "Sign in failed");
        } catch (err) {
            setMessage("Network error — please try again");
        } finally {
            setLoading(false);
        }
    }

    async function handleSignUp(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        if (signupPassword !== signupConfirm) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email: signupEmail, password: signupPassword }),
            });
            const body = await res.json().catch(() => null);
            if (res.ok) {
                setMessage(body?.message ?? "Sign up successful — check your email to verify.");
                setView("sign-in");
            } else {
                setMessage(body?.message ?? "Sign up failed");
            }
        } catch (err) {
            //honestly i dont know the point of this one, just in case
            setMessage("Network error — please try again");
        } finally {
            setLoading(false);
        }
    }

    async function handleReset(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch("/api/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });
            const body = await res.json().catch(() => null);
            if (res.ok) setMessage(body?.message ?? "Password reset sent — check your email.");
            else setMessage(body?.message ?? "Reset failed");
        } catch (err) {
            setMessage("Network error — please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url('/lead-the-way.png'), url('/lead-the-way.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                aria-hidden
            />

            <div className="relative z-10 w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-black/60 via-slate-900/60 to-black/60 backdrop-blur">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <section className="p-8 md:p-12 text-white flex flex-col justify-center gap-6">
                        <h1 className="text-3xl sm:text-4xl font-bold">Membership Portal — Member Link</h1>
                        <p className="text-slate-200/90 leading-relaxed">
                            Member Link is the official online gateway for Brampton FBLC, JEC, and Target Alpha members. Designed to keep every member connected, it provides streamlined access to assignments, resources, progress tracking, certificates, and exclusive updates.
                        </p>
                        <p className="text-slate-300 text-sm">Whether you’re a general member or an executive, Member Link keeps you engaged and organized.</p>

                        <nav className="flex gap-3 mt-2">
                            <button
                                onClick={() => setView("sign-in")}
                                className={`px-3 py-1 ${view === "sign-in" ? "bg-blue-500" : "bg-white/10"}`}
                            >
                                Sign in
                            </button>
                            <button
                                onClick={() => setView("sign-up")}
                                className={`px-3 py-1 ${view === "sign-up" ? "bg-blue-500" : "bg-white/10"}`}
                            >
                                Sign up
                            </button>
                        </nav>
                    </section>

                    <section className="p-8 md:p-12 bg-white/5 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            {view === "sign-in" && (
                                <>
                                    <h2 className="text-xl text-white mb-4">Sign in to Member Link</h2>
                                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                                        <label className="text-slate-200 text-sm">FBLC Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="fname.lname@gmail.com"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <label className="text-slate-200 text-sm">Password</label>
                                        <input
                                            required
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Your password"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="mt-2 rounded-xl p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-60"
                                                disabled={loading}
                                            >
                                                {loading ? "Signing in…" : "Sign in"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setView("reset")}
                                                className="text-sm text-slate-300 underline"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {view === "sign-up" && (
                                <>
                                    <h2 className="text-xl text-white mb-4">Create an account</h2>
                                    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                                        <label className="text-slate-200 text-sm">Full name</label>
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <label className="text-slate-200 text-sm">Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={signupEmail}
                                            onChange={(e) => setSignupEmail(e.target.value)}
                                            placeholder="you@school.edu"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <label className="text-slate-200 text-sm">Password</label>
                                        <input
                                            required
                                            type="password"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            placeholder="Create a password"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <label className="text-slate-200 text-sm">Confirm password</label>
                                        <input
                                            required
                                            type="password"
                                            value={signupConfirm}
                                            onChange={(e) => setSignupConfirm(e.target.value)}
                                            placeholder="Confirm password"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <button
                                            type="submit"
                                            className="mt-2 rounded-xl p-3 bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-60"
                                            disabled={loading}
                                        >
                                            {loading ? "Creating…" : "Create account"}
                                        </button>
                                    </form>
                                </>
                            )}

                            {view === "reset" && (
                                <>
                                    <h2 className="text-xl text-white mb-4">Reset your password</h2>
                                    <form onSubmit={handleReset} className="flex flex-col gap-4">
                                        <label className="text-slate-200 text-sm">Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            placeholder="you@school.edu"
                                            className="w-full rounded-xl p-3 bg-white/10 text-white placeholder:text-slate-300 border border-white/10"
                                        />

                                        <div className="flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="mt-2 rounded-xl p-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold disabled:opacity-60"
                                                disabled={loading}
                                            >
                                                {loading ? "Sending…" : "Send reset link"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setView("sign-in")}
                                                className="text-sm text-slate-300 underline"
                                            >
                                                Back to sign in
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {message && <div className="text-sm text-center text-slate-200 pt-4">{message}</div>}
                        </div>
                    </section>
                </div>
            </div>
            <div className="absolute bottom-6 text-center w-full z-20"></div>
        </main>
    );
}