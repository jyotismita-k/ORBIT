"use client";

import { useState, useCallback } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import MoodSelector from "./components/MoodSelector";
import SuggestionBox from "./components/SuggestionBox";
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
            "radial-gradient(circle at 30% 20%, rgba(239, 251, 232, 0.38) 0%, transparent 38%), radial-gradient(circle at 78% 18%, rgba(178, 236, 198, 0.24) 0%, transparent 42%), radial-gradient(circle at 14% 82%, rgba(158, 225, 190, 0.22) 0%, transparent 40%), linear-gradient(180deg, #7fd5bf 0%, #73cdb7 40%, #68c4af 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(rgba(233,255,244,0.5) 1px, transparent 1px), radial-gradient(rgba(102,189,153,0.35) 1px, transparent 1px)",
          backgroundSize: "14px 14px, 14px 14px",
          backgroundPosition: "0 0, 7px 7px",
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
          </div>
        </div>
      </div>
    </main>
  );
}
