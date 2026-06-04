"use client";

import { useEffect, useState } from "react";
import { Task, TaskPriority, TaskType } from "@/types/types";

export default function AddPlanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<TaskType>("Task");
  const [duration, setDuration] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        deadline: task.deadline ? new Date(task.deadline) : null,
        createdAt: new Date(task.createdAt),
      }));

      setTasks(parsedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      type,
      duration: Number(duration),
      deadline: deadline ? new Date(deadline) : null,
      priority,
      completed: false,
      description:"",
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setType("Task");
    setDuration("");
    setDeadline("");
    setPriority("Medium");
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleComplete(id: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <section className="mx-auto max-w-2xl">
        <a href="/dashboard" className="text-sm text-gray-600">
          ← Back to Dashboard
        </a>

        <h1 className="mt-4 text-3xl font-bold">Add a Plan</h1>
        <p className="mt-2 text-gray-600">
          Start by adding something you need to do.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm"
        >
          <label className="block">
            <span className="font-medium">Plan name</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Study for math test"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Type</span>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as TaskType)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
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
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="Minutes, example: 60"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Deadline</span>
            <input
              type="date"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </label>

          <label className="mt-5 block">
            <span className="font-medium">Priority</span>
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
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

        <section className="mt-8">
          <h2 className="text-xl font-bold">Your Plans</h2>

          {tasks.length === 0 ? (
            <p className="mt-3 text-gray-600">No plans added yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className={`font-semibold ${
                          task.completed ? "text-gray-400 line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {task.type} • {task.duration} minutes • {task.priority}
                      </p>

                      {task.deadline && (
                        <p className="mt-1 text-sm text-gray-600">
                          Deadline: {task.deadline.toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      >
                        {task.completed ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}