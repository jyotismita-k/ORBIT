"use client";

import { useState, useCallback } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import MoodSelector from "./components/MoodSelector";
import SuggestionBox from "./components/SuggestionBox";
import MoodBooster from "./components/MoodBooster";
import Timer from "./components/Timer";
import type { MoodLevel, Task } from "./lib/types";

export default function Home() {
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleMoodChange = useCallback((m: MoodLevel | null) => {
    setMood(m);
  }, []);

  const handleTasksChange = useCallback((t: Task[]) => {
    setTasks(t);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Retro game color wash */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, rgba(255,138,180,0.4) 0%, transparent 38%), radial-gradient(circle at 85% 18%, rgba(54,184,255,0.35) 0%, transparent 38%), radial-gradient(circle at 80% 90%, rgba(127,99,255,0.35) 0%, transparent 40%), radial-gradient(circle at 20% 82%, rgba(199,125,63,0.25) 0%, transparent 42%)",
        }}
      />

      {/* Layout: two-column on wide screens, single on mobile */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <Header />
            <TaskList onTasksChange={handleTasksChange} />
            <Timer />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <MoodSelector onMoodChange={handleMoodChange} />
            <SuggestionBox mood={mood} tasks={tasks} />
            <MoodBooster />
          </div>
        </div>
      </div>
    </main>
  );
}
