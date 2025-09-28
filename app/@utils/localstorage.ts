"use client";
import { Quiz } from "../@types/block";

const STORAGE_KEY = "quiz_app.quizzes";

export const LocalStorage = {
  getQuizzes: (): Quiz[] => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? (JSON.parse(data) as Quiz[]) : [];
    } catch (error) {
      console.error("Failed to read quizzes:", error);
      return [];
    }
  },

  saveQuizzes: (quizzes: Quiz[]): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error("Failed to save quizzes:", error);
    }
  },

  clearQuizzes: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
