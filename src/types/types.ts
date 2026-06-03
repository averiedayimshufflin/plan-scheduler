import { randomUUID } from "crypto";
type TaskOption = {
    id: string
    label: string
}
type PriorityOption = {
    id: string
    label: string
}
type Task = {
    id: string
    userID: string
    title: string
    type: "text" | "multiple-choice"
    options?: TaskOption[]
    duration: number
    deadline: Date
    priority: string[]
    notes : string
    completed : boolean
    createdAt : Date
}
type Users = {
    id: string
    name: string
    email: string
    createdAt: Date
}

type Availability = {
    id: string
    userId: string
    dayOfWeek: string[]
    startTime: string
    endTime: string
    isAvailable: string
    repeatsWeekly: boolean
}
type Preferences = {
id : string
userId: string
wakeTime: string
sleepTime: string
breakLength: number
preferredWorkTime: string
maxTaskBlockLength: number
weekendScheduling: boolean
}
type scheduleItems = {
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



