"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import MoodSelector from "./components/MoodSelector";
import SuggestionBox from "./components/SuggestionBox";
import Timer from "./components/Timer";
import type { MoodLevel, Task } from "./lib/types";

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

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
    <main className="min-h-screen bg-[#fff3a6]">
      <section className="relative w-full h-[34vh] min-h-[220px] max-h-[380px] overflow-hidden">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1], y: [0, -2, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/backgrounds/pixel-town.png"
            alt="Pixel town hero artwork"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </section>

      <section className="w-full bg-[#fff3a6]">
        <motion.div
          className="max-w-3xl mx-auto px-4 py-7 md:py-10 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Header />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MoodSelector onMoodChange={handleMoodChange} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SuggestionBox mood={mood} tasks={tasks} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Timer />
          </motion.div>
          <motion.div variants={itemVariants}>
            <TaskList onTasksChange={handleTasksChange} />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
