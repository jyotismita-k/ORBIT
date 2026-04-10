import {
  MORNING_AFFIRMATIONS,
  AFTERNOON_AFFIRMATIONS,
  EVENING_AFFIRMATIONS,
} from "./data";
import type { MoodLevel, Task } from "./types";

export type TimeOfDay = "morning" | "afternoon" | "evening";

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
}

export function getGreeting(timeOfDay: TimeOfDay): string {
  const greetings = {
    morning: "Good morning, Rohan.",
    afternoon: "Good afternoon, Rohan.",
    evening: "Good evening, Rohan.",
  };
  return greetings[timeOfDay];
}

export function getSubMessage(timeOfDay: TimeOfDay): string {
  const messages = {
    morning: "A new day. Let's make it count.",
    afternoon: "You're in the middle of it now. Stay steady.",
    evening: "The day is winding down. You've earned this.",
  };
  return messages[timeOfDay];
}

export function getAffirmation(timeOfDay: TimeOfDay): string {
  const pool =
    timeOfDay === "morning"
      ? MORNING_AFFIRMATIONS
      : timeOfDay === "afternoon"
      ? AFTERNOON_AFFIRMATIONS
      : EVENING_AFFIRMATIONS;

  const dayOfYear = Math.floor(Date.now() / 86400000);
  return pool[dayOfYear % pool.length];
}

export function getSuggestion(mood: MoodLevel | null, tasks: Task[]): string {
  const pending = tasks.filter((t) => !t.completed).length;

  if (!mood) {
    return "Set your mood to get a personalised suggestion for today.";
  }

  if (mood === "low") {
    if (pending === 0) return "Nothing on the list today. Rest is valid.";
    return "Pick just one small task. That's your whole goal right now.";
  }

  if (mood === "neutral") {
    if (pending === 0) return "You're clear. Use this time well.";
    if (pending <= 2) return "You're close. Knock out what's left.";
    return "Work through your list steadily. No rush.";
  }

  if (mood === "good") {
    if (pending === 0) return "You're on top of things. Add something meaningful.";
    if (pending >= 4) return "Good energy today — use it. Tackle the bigger tasks first.";
    return "You've got the momentum. Push through your list.";
  }

  return "Take it one step at a time.";
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}
