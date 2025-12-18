import Link from "next/link";

export default function QuizHub() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #001E60 0%, #000000 100%)" }}>
      <header className="w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <Link href="/home" className="text-white text-sm font-medium hover:text-white/80 transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 min-h-[calc(100vh-80px)] flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white">QUIZ HUB</h1>
        <p className="mt-4 text-center max-w-xl text-white/80">Access quizzes and assessments below. Please follow the instructions after the form.</p>

        <div className="w-full mt-8 bg-white border border-white/5 rounded-lg shadow-lg overflow-hidden p-6">
          <div className="max-w-full w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdN-KJKsXhhZYYZ9GOqdThEab64p4Sdi1m9ijbP7t8flZfPHg/viewform?embedded=true"
              className="w-full h-[760px] md:h-[900px] rounded-md"
              title="FBLC Quiz Form"
              style={{ border: 'none', background: 'transparent' }}
              loading="lazy"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-white/70 max-w-prose text-center">
          How to use: Complete the quiz in the embedded Google Form and click "Submit" when finished. Your responses will be recorded. If the form does not load or there are any other issues, please contact an administrator at "admin@fblc.idontactuallyknowtheemail".
        </p>
      </main>

      <footer className="w-full border-t border-white/10 py-6 text-center text-sm text-white/60">FBLC Member Link — Demo</footer>
    </div>
  );
}