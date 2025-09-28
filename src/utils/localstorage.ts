import { Quiz } from '../types/block';
import { demoQuiz } from './demo-quiz';

const STORAGE_KEY = 'quiz_app.quizzes';

export const LocalStorage = {
  getQuizzes: (): Quiz[] => {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data || data === '[]') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoQuiz));
        return demoQuiz;
      }

      const quizzes = JSON.parse(data) as Quiz[];

      if (!quizzes || quizzes.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demoQuiz));
        return demoQuiz;
      }

      return quizzes;
    } catch (error) {
      console.error('Failed to read quizzes:', error);
      return demoQuiz;
    }
  },

  saveQuizzes: (quizzes: Quiz[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
    } catch (error) {
      console.error(' Failed to save quizzes:', error);
    }
  },
};
