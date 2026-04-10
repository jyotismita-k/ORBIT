"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { MoodLevel } from "../lib/types";

const STORAGE_KEY = "orbit_mood";

interface MoodSelectorProps {
  onMoodChange: (mood: MoodLevel | null) => void;
}

const MOODS: { value: MoodLevel; label: string; symbol: string }[] = [
  { value: "low", label: "Low", symbol: "—" },
  { value: "neutral", label: "Neutral", symbol: "◦" },
  { value: "good", label: "Good", symbol: "+" },
];

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MoodLevel | null;
    if (stored) {
      setMood(stored);
      onMoodChange(stored);
    }
    setMounted(true);
  }, [onMoodChange]);

  function select(value: MoodLevel) {
    const next = mood === value ? null : value;
    setMood(next);
    if (next) {
      localStorage.setItem(STORAGE_KEY, next);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    onMoodChange(next);
  }

  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <h2 className="text-xs uppercase pixel-title mb-3">
        How are you today?
      </h2>
      <div className="flex gap-2">
        {MOODS.map(({ value, label, symbol }) => (
          <motion.button
            key={value}
            onClick={() => select(value)}
            className={`flex-1 glass glass-hover py-2.5 flex flex-col items-center gap-1 transition-all active:scale-95 ${
              mood === value
                ? "bg-[#fff0a8]"
                : "opacity-85 hover:opacity-100"
            }`}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(45, 33, 82, 0.14)" }}
            whileTap={{ scale: 0.96 }}
            animate={{
              scale: mood === value ? 1.04 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.span
              className={`text-base font-light ${
                mood === value ? "text-[#2d2152]" : "text-[#6c6292]"
              }`}
              animate={{ scale: mood === value ? 1.05 : 1 }}
              transition={{ duration: 0.18 }}
            >
              {symbol}
            </motion.span>
            <motion.span
              className={`text-xs font-semibold ${
                mood === value ? "text-[#2d2152]" : "text-[#6c6292]"
              }`}
              animate={{ scale: mood === value ? 1.03 : 1 }}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
