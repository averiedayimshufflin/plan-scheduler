export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your plans and generate your schedule.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Today’s Schedule</h2>
            <p className="mt-3 text-gray-600">
              No schedule generated yet.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <p className="mt-3 text-gray-600">
              You have not added any tasks.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Quick Actions</h2>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="/add-plan"
                className="rounded-xl bg-black px-4 py-3 text-center text-white"
              >
                Add Plan
              </a>
                <a
  href="/availability"
  className="rounded-xl border border-gray-300 px-4 py-3 text-center"
>
  Set Availability
</a>
              <a
                href="/schedule"
                className="rounded-xl border border-gray-300 px-4 py-3 text-center"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}