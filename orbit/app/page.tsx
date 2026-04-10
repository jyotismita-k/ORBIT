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
    <main className="min-h-screen">
      {/* Layout: two-column on wide screens, single on mobile */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
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
