"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { generateId } from "../lib/utils";
import type { Task } from "../lib/types";

const STORAGE_KEY = "orbit_tasks";
const MAX_VISIBLE = 5;

interface TaskListProps {
  onTasksChange: (tasks: Task[]) => void;
}

export default function TaskList({ onTasksChange }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    onTasksChange(tasks);
  }, [tasks, mounted, onTasksChange]);

  function addTask() {
    const text = input.trim();
    if (!text) return;
    if (tasks.filter((t) => !t.completed).length >= MAX_VISIBLE) return;
    const task: Task = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
    setInput("");
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);
  const canAdd = pending.length < MAX_VISIBLE;

  if (!mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase pixel-title">
          Today&apos;s Focus
        </h2>
        {pending.length > 0 && (
          <span className="text-xs text-[#4d3f73] tabular-nums font-semibold">
            {pending.filter((t) => !t.completed).length} remaining
          </span>
        )}
      </div>

      {/* Add task input */}
      <div className="flex gap-2 mb-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder={
            canAdd ? "Add a task..." : "Focus on what's already here"
          }
          disabled={!canAdd}
          className="flex-1 glass px-3 py-2.5 text-sm text-[#2d2152] placeholder:text-[#6c6292] disabled:opacity-40 transition-all"
        />
        <motion.button
          onClick={addTask}
          disabled={!canAdd || !input.trim()}
          className="pixel-button px-3 py-2.5 text-sm transition-all active:scale-95"
          aria-label="Add task"
          whileHover={
            !canAdd || !input.trim()
              ? {}
              : { scale: 1.04, boxShadow: "0 8px 20px rgba(45, 33, 82, 0.16)" }
          }
          whileTap={!canAdd || !input.trim() ? {} : { scale: 0.96 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.button>
      </div>

      {/* Task list */}
      <div className="space-y-1.5">
        {pending.length === 0 && completed.length === 0 && (
          <p className="text-sm text-[#4d3f73] text-center py-6 font-semibold">
            Nothing here yet. Add your first task.
          </p>
        )}

        {pending.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}

        {completed.length > 0 && (
          <>
            <div className="pt-2 pb-1">
              <p className="text-xs text-[#6c6292] uppercase tracking-widest font-semibold">
                Done
              </p>
            </div>
            {completed.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </>
        )}
      </div>
    </motion.section>
  );
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={`group flex items-center gap-3 glass glass-hover px-3 py-2.5 transition-all ${
        task.completed ? "opacity-40" : ""
      }`}
    >
      {/* Checkbox */}
      <motion.button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-md border-[3px] border-[#2d2152] transition-all ${
          task.completed
            ? "bg-[#8ce772]"
            : "bg-[#fff9d1]"
        }`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        {task.completed && (
          <svg
            className="w-full h-full p-0.5 text-[#15330e]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </motion.button>

      {/* Text */}
      <span
        className={`flex-1 text-sm leading-snug ${
          task.completed
            ? "line-through text-[#6c6292]"
            : "text-[#2d2152] font-semibold"
        }`}
      >
        {task.text}
      </span>

      {/* Delete */}
      <motion.button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-[#6c6292] hover:text-[#2d2152] transition-all"
        aria-label="Delete task"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>
    </div>
  );
}
