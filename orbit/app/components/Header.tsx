"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getTimeOfDay,
  getGreeting,
  getSubMessage,
  getAffirmation,
  formatTime,
  formatDate,
} from "../lib/utils";

export default function Header() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const hour = now.getHours();
  const timeOfDay = getTimeOfDay(hour);
  const greeting = getGreeting(timeOfDay);
  const subMessage = getSubMessage(timeOfDay);
  const affirmation = getAffirmation(timeOfDay);

  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {/* Time block */}
      <div className="mb-5">
        <p className="text-5xl font-semibold tracking-tight text-[#2d2152] tabular-nums leading-none">
          {formatTime(now)}
        </p>
        <p className="mt-1.5 text-sm text-[#4d3f73] font-medium">
          {formatDate(now)}
        </p>
      </div>

      {/* Greeting */}
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[#2d2152]">{greeting}</h1>
        <p className="mt-0.5 text-sm text-[#4d3f73]">{subMessage}</p>
      </div>

      {/* Affirmation */}
      <div className="glass px-4 py-3">
        <p className="text-sm text-[#4d3f73] italic leading-relaxed">
          &ldquo;{affirmation}&rdquo;
        </p>
      </div>
    </motion.header>
  );
}
