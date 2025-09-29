import { create } from 'zustand';

interface AnswerState {
  answers: Record<string, string | string[]>;
  setAnswer: (blockId: string, value: string | string[]) => void;
  resetAnswers: () => void;
}

export const useQuizAnswerStore = create<AnswerState>((set) => ({
  answers: {},

  setAnswer: (blockId, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [blockId]: value,
      },
    })),

  resetAnswers: () => set({ answers: {} }),
}));
