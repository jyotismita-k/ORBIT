"use client";

import { getSuggestion } from "../lib/utils";
import { motion } from "framer-motion";
import type { MoodLevel, Task } from "../lib/types";

interface SuggestionBoxProps {
  mood: MoodLevel | null;
  tasks: Task[];
}

export default function SuggestionBox({ mood, tasks }: SuggestionBoxProps) {
  const suggestion = getSuggestion(mood, tasks);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <h2 className="text-xs uppercase pixel-title mb-3">
        Suggestion
      </h2>
      <div className="glass px-4 py-3">
        <p className="text-sm text-[#4d3f73] leading-relaxed font-semibold">{suggestion}</p>
      </div>
    </motion.section>
  );
}
