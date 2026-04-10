"use client";

import { useState } from "react";
import Image from "next/image";
import { BOOSTER_ITEMS } from "../lib/data";
import type { BoosterItem } from "../lib/types";

const CATEGORIES: { value: BoosterItem["category"]; label: string }[] = [
  { value: "cats", label: "Cats" },
  { value: "coffee", label: "Coffee" },
  { value: "dragons", label: "Dragons" },
  { value: "cars", label: "Cars" },
];

function getRandomItem(
  category: BoosterItem["category"],
  exclude?: string
): BoosterItem {
  const pool = BOOSTER_ITEMS.filter(
    (i) => i.category === category && i.id !== exclude
  );
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function MoodBooster() {
  const [activeCategory, setActiveCategory] =
    useState<BoosterItem["category"]>("cats");
  const [current, setCurrent] = useState<BoosterItem>(
    () => getRandomItem("cats")
  );
  const [imgError, setImgError] = useState(false);

  function changeCategory(cat: BoosterItem["category"]) {
    setActiveCategory(cat);
    setImgError(false);
    setCurrent(getRandomItem(cat));
  }

  function refresh() {
    setImgError(false);
    setCurrent(getRandomItem(activeCategory, current.id));
  }

  function categoryClass(category: BoosterItem["category"]): string {
    if (category === "cats") return "cat";
    if (category === "dragons") return "dragon";
    if (category === "coffee") return "coffee";
    return "car";
  }

  return (
    <section className="animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase pixel-title">
          Mood Booster
        </h2>
        <button
          onClick={refresh}
          className="text-xs text-[#4d3f73] hover:text-[#2d2152] transition-colors flex items-center gap-1.5 font-semibold"
          aria-label="Load another"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 mb-3">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => changeCategory(value)}
            className={`pixel-pill text-xs transition-all ${
              activeCategory === value
                ? `${categoryClass(value)}`
                : "bg-[#fff9d1] text-[#6c6292]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Image card */}
      <div className="glass overflow-hidden">
        <div className={`relative w-full h-44 ${categoryClass(activeCategory)}`}>
          {!imgError ? (
            <Image
              key={current.id}
              src={current.imageUrl}
              alt={current.caption}
              fill
              className="object-cover opacity-90"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2d2152] text-sm font-semibold">
              Image unavailable
            </div>
          )}
        </div>
        <div className={`px-3 py-2.5 ${categoryClass(activeCategory)}`}>
          <p className="text-xs italic font-semibold">{current.caption}</p>
        </div>
      </div>
    </section>
  );
}
