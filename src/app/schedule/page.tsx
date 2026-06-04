"use client";

import { useState } from "react";
import { generateSchedule } from "@/lib/scheduleGenerator";
import { Availability } from "@/types/types";
import { scheduleItems } from "@/types/types";
import { Task } from "@/types/types";

export default function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<scheduleItems[]>([]);

  function handleGenerateSchedule() {
    const savedTasks = localStorage.getItem("tasks");
    const savedAvailability = localStorage.getItem("availabilityBlocks");

    if (!savedTasks || !savedAvailability) {
      alert("Add tasks and availability before generating a schedule.");
      return;
    }

    const tasks: Task[] = JSON.parse(savedTasks).map((task: Task) => ({
      ...task,
      deadline: task.deadline ? new Date(task.deadline) : null,
      createdAt: new Date(task.createdAt),
    }));

    const availabilityBlocks: Availability[] =
      JSON.parse(savedAvailability);

    const generatedSchedule = generateSchedule(tasks, availabilityBlocks);

    setScheduleItems(generatedSchedule);
    localStorage.setItem("scheduleItems", JSON.stringify(generatedSchedule));
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <section className="mx-auto max-w-4xl">
        <a href="/dashboard" className="text-sm text-gray-600">
          ← Back to Dashboard
        </a>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Generated Schedule</h1>
            <p className="mt-2 text-gray-600">
              Create a schedule from your tasks and availability.
            </p>
          </div>

          <button
            onClick={handleGenerateSchedule}
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            Generate
          </button>
        </div>

        <section className="mt-8">
          {scheduleItems.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-gray-600">
                No schedule generated yet. Click Generate to create one.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {scheduleItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                   Duration: {item.startTime} - {item.endTime}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}