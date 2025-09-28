'use client';
const STORAGE_KEY = "quiz_app.quizzes";

export const LocalStorage = {
  getQuizzes: <T = any>(): T[] => {
    if (typeof window === "undefined") {
      return [];  
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("❌ Failed to read quizzes:", error);
      return [];
    }
  },

  saveQuizzes: (quizzes: any[]) => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error("❌ Failed to save quizzes:", error);
    }
  },

  clearQuizzes: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
