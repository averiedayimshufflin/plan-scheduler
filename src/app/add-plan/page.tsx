export default function AddPlanPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <section className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Add a Plan</h1>
        <p className="mt-2 text-gray-600">
          Start by adding something you need to do.
        </p>

        <form className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <label className="block">
            <span className="font-medium">Plan name</span>
            <input
              type="text"
              placeholder="Example: Study for math test"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Type</span>
            <select className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3">
              <option>Task</option>
              <option>Event</option>
              <option>Deadline</option>
              <option>Chore</option>
              <option>Study</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Duration</span>
            <input
              type="number"
              placeholder="Minutes, example: 60"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Deadline</span>
            <input
              type="date"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Priority</span>
            <select className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white"
          >
            Save Plan
          </button>
        </form>
      </section>
    </main>
  );
}