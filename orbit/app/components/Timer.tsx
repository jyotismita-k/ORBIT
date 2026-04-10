"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = DEFAULT_MINUTES * 60;

type TimerState = "idle" | "running" | "paused";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [state, setState] = useState<TimerState>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "running") {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setState("idle");
            clearInterval(intervalRef.current!);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  function start() {
    if (secondsLeft === 0) setSecondsLeft(DEFAULT_SECONDS);
    setState("running");
  }
  function pause() {
    setState("paused");
  }
  function reset() {
    setState("idle");
    setSecondsLeft(DEFAULT_SECONDS);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = 1 - secondsLeft / DEFAULT_SECONDS;

  // Circle progress ring
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <h2 className="text-xs uppercase pixel-title mb-3">
        Focus Timer
      </h2>

      <div className="glass px-4 py-4 flex items-center gap-5">
        {/* Ring */}
        <div className="relative flex-shrink-0 w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            {/* Track */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#c9b8ff"
              strokeWidth="4"
            />
            {/* Progress */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke={
                state === "running"
                  ? "#7f63ff"
                  : "#8f7cbc"
              }
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
            />
          </svg>
          {/* Time text inside ring */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#2d2152] tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Info + controls */}
        <div className="flex-1">
          <p className="text-sm text-[#4d3f73] mb-3 font-semibold">
            {state === "idle" && secondsLeft === DEFAULT_SECONDS && "Ready to focus."}
            {state === "idle" && secondsLeft === 0 && "Session complete."}
            {state === "running" && "Stay in it."}
            {state === "paused" && "Paused."}
          </p>

          <div className="flex gap-2">
            {state !== "running" ? (
              <motion.button
                onClick={start}
                className="pixel-button px-3 py-1.5 text-xs transition-all active:scale-95"
                whileHover={{ scale: 1.03, boxShadow: "0 6px 16px rgba(45, 33, 82, 0.16)" }}
                whileTap={{ scale: 0.96 }}
              >
                {state === "paused" ? "Resume" : "Start"}
              </motion.button>
            ) : (
              <motion.button
                onClick={pause}
                className="pixel-button px-3 py-1.5 text-xs transition-all active:scale-95"
                whileHover={{ scale: 1.03, boxShadow: "0 6px 16px rgba(45, 33, 82, 0.16)" }}
                whileTap={{ scale: 0.96 }}
              >
                Pause
              </motion.button>
            )}
            <motion.button
              onClick={reset}
              disabled={state === "idle" && secondsLeft === DEFAULT_SECONDS}
              className="text-xs text-[#4d3f73] hover:text-[#2d2152] transition-colors disabled:opacity-20 px-1 font-semibold"
              whileHover={
                state === "idle" && secondsLeft === DEFAULT_SECONDS
                  ? {}
                  : { scale: 1.03 }
              }
              whileTap={
                state === "idle" && secondsLeft === DEFAULT_SECONDS
                  ? {}
                  : { scale: 0.97 }
              }
            >
              Reset
            </motion.button>
          </div>
          <AnimatePresence>
            {state === "idle" && secondsLeft === 0 && (
              <motion.p
                key="session-complete"
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-2 text-xs font-semibold text-[#2d2152]"
              >
                Nice work! Session complete.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
