"use client";

import { useEffect, useState } from "react";
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
    <section className="animate-slide-up">
      <h2 className="text-xs uppercase pixel-title mb-3">
        How are you today?
      </h2>
      <div className="flex gap-2">
        {MOODS.map(({ value, label, symbol }) => (
          <button
            key={value}
            onClick={() => select(value)}
            className={`flex-1 glass glass-hover py-2.5 flex flex-col items-center gap-1 transition-all active:scale-95 ${
              mood === value
                ? "bg-[#fff0a8]"
                : "opacity-85 hover:opacity-100"
            }`}
          >
            <span
              className={`text-base font-light ${
                mood === value ? "text-[#2d2152]" : "text-[#6c6292]"
              }`}
            >
              {symbol}
            </span>
            <span
              className={`text-xs font-semibold ${
                mood === value ? "text-[#2d2152]" : "text-[#6c6292]"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
