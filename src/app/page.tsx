export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Build your schedule automatically.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Add your tasks, deadlines, events, and free time. We’ll help turn them
          into a clear schedule you can actually follow.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="/dashboard"
            className="rounded-xl bg-black px-6 py-3 text-white"
          >
            Get Started
          </a>

          <a
            href="#how-it-works"
            className="rounded-xl border border-gray-300 px-6 py-3"
          >
            How It Works
          </a>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center">How it works</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">1. Add your plans</h3>
            <p className="mt-3 text-gray-600">
              Enter homework, events, appointments, chores, goals, or anything
              else you need to do.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">2. Set your availability</h3>
            <p className="mt-3 text-gray-600">
              Tell the app when you are busy and when you are free.
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h3 className="text-xl font-semibold">3. Get your schedule</h3>
            <p className="mt-3 text-gray-600">
              The app places tasks into open time slots based on priority,
              deadlines, and duration.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}