import Link from "next/link";

export default function AspireLinkApplicationPortal() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #001E60 0%, #000000 100%)" }}>
      <header className="w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <Link href="/home" className="text-white text-sm font-medium hover:text-white/80 transition">
            ← Back to Home
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl font-bold text-white">PAST MEETINGS</h1>
        <p className="mt-6 text-center max-w-xl text-white/80">Placeholder page for PAST MEETINGS.</p>
      </main>
    </div>
  );
}