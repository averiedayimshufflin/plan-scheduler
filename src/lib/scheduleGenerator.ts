import { Availability } from "@/types/types";
import { scheduleItems } from "@/types/types";
import { Task } from "@/types/types";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

function getPriorityValue(priority: Task["priority"]) {
  if (priority === "Urgent") return 4;
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}

export function generateSchedule(
  tasks: Task[],
  availabilityBlocks: Availability[]
): scheduleItems[] {
  const incompleteTasks = tasks.filter((task) => !task.completed);

  const sortedTasks = [...incompleteTasks].sort((a, b) => {
    const priorityDifference =
      getPriorityValue(b.priority) - getPriorityValue(a.priority);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    if (a.deadline && b.deadline) {
      return a.deadline.getTime() - b.deadline.getTime();
    }

    if (a.deadline) return -1;
    if (b.deadline) return 1;

    return 0;
  });

  const availableBlocks = availabilityBlocks
    .filter((block) => block.isAvailable === "Available")
    .sort((a, b) => {
      if (a.day !== b.day) {
        return a.day.localeCompare(b.day);
      }

      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

  const schedule: scheduleItems[] = [];

  let taskIndex = 0;

  for (const block of availableBlocks) {
    let currentStart = timeToMinutes(block.startTime);
    const blockEnd = timeToMinutes(block.endTime);

    while (taskIndex < sortedTasks.length) {
      const task = sortedTasks[taskIndex];
      const taskEnd = currentStart + task.duration;

      if (taskEnd > blockEnd) {
        break;
      }

      schedule.push({
        id: crypto.randomUUID(),
        taskId: task.id,
        title: task.title,
        date: new Date(),
        startTime: minutesToTime(currentStart),
        endTime: minutesToTime(taskEnd),
        completed: false,
   });

      currentStart = taskEnd + 15;
      taskIndex++;
    }
  }

  return schedule;
}