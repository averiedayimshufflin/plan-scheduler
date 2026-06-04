"use client";

import { useState, useEffect } from "react";
import { Availability, DayOfWeek } from "@/types/types";

const days: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AvailabilityPage() {
  const [availabilityBlocks, setAvailabilityBlocks] = useState<
    Availability[]
  >([]);

  const [day, setDay] = useState<DayOfWeek>("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isAvailable,setAvailibility] = useState("UnAvailable")
  const [repeatsWeekly, setRepeatsWeekly] = useState(true);

  useEffect(() => {
  const savedAvailability = localStorage.getItem("availabilityBlocks");

  if (savedAvailability) {
    setAvailabilityBlocks(JSON.parse(savedAvailability));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "availabilityBlocks",
    JSON.stringify(availabilityBlocks)
  );
}, [availabilityBlocks]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newBlock:  Availability = {
    id: crypto.randomUUID(),
    day,
    startTime,
    endTime,
    isAvailable: "Unavailable",
    repeatsWeekly,
    };

    setAvailabilityBlocks([...availabilityBlocks, newBlock]);

    setDay("Monday");
    setStartTime("09:00");
    setEndTime("17:00");
    setAvailibility("Unavailable");
    setRepeatsWeekly(true);
  }

  function deleteBlock(id: string) {
    setAvailabilityBlocks(
      availabilityBlocks.filter((block) => block.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <section className="mx-auto max-w-3xl">
        <a href="/dashboard" className="text-sm text-gray-600">
          ← Back to Dashboard
        </a>

        <h1 className="mt-4 text-3xl font-bold">Availability</h1>

        <p className="mt-2 text-gray-600">
          Tell the app when you are busy or free so it knows where tasks can fit.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <label className="block">
            <span className="font-medium">Day</span>
            <select
              value={day}
              onChange={(event) => setDay(event.target.value as DayOfWeek)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              {days.map((dayOption) => (
                <option key={dayOption}>{dayOption}</option>
              ))}
            </select>
          </label>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="font-medium">Start time</span>
              <input
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
                required
              />
            </label>

            <label className="block">
              <span className="font-medium">End time</span>
              <input
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
                required
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="font-medium">Type</span>
            <select
              value={isAvailable}
              onChange={(event) =>
                setAvailibility(event.target.value as "Available" | "Unavailable")
              }
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option>Unavailable</option>
              <option>Available</option>
            </select>
          </label>

          <label className="mt-5 flex items-center gap-3">
            <input
              type="checkbox"
              checked={repeatsWeekly}
              onChange={(event) => setRepeatsWeekly(event.target.checked)}
            />
            <span className="font-medium">Repeats weekly</span>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-white"
          >
            Save Availability
          </button>
        </form>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Saved Availability</h2>

          {availabilityBlocks.length === 0 ? (
            <p className="mt-3 text-gray-600">
              No availability blocks added yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {availabilityBlocks.map((block) => (
                <div
                  key={block.id}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold">
                      {block.day}: {block.startTime} - {block.endTime}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {block.isAvailable}{" "}
                      {block.repeatsWeekly ? "• Repeats weekly" : ""}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteBlock(block.id)}
                    className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}