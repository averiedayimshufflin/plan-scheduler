import { randomUUID } from "crypto";
export type TaskType = "Task" | "Event" | "Deadline" | "Chore" | "Study";

export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
export type Task = {
    id: string;
    title: string;
    type: TaskType;
    duration: number;
    deadline: Date | null;
    priority: TaskPriority;
    description : string;
    completed : boolean;
    createdAt : Date;
}
export type Users = {
    id: string
    name: string
    email: string
    createdAt: Date
}

export type Availability = {
    id: string
    userId: string
    dayOfWeek: string[]
    startTime: string
    endTime: string
    isAvailable: string
    repeatsWeekly: boolean
}
export type Preferences = {
id : string
userId: string
wakeTime: string
sleepTime: string
breakLength: number
preferredWorkTime: string
maxTaskBlockLength: number
weekendScheduling: boolean
}
export type scheduleItems = {
    id: string
userId: string
taskId: string
title: string
date: Date
startTime: string
endTime: string
locked: boolean
completed: boolean
}



