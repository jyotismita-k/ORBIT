export type MoodLevel = "low" | "neutral" | "good";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface BoosterItem {
  id: string;
  category: "cats" | "dragons" | "coffee" | "cars";
  imageUrl: string;
  caption: string;
}
