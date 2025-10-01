import { create } from 'zustand';
import { useUndoRedoStore } from './useUndoRedoStore';
import { BlockProperties, IQuiz } from '../types';
import { validateQuiz } from '../utils/validationHelper';
import toast from 'react-hot-toast';

interface QuizStore {
  selectedQuiz: { id: string; title: string; published: boolean } | null;
  saveQuizToBE: (updateQuizFn: (quiz: IQuiz) => void) => void;
  setSelectedQuiz: (quiz: Partial<BlockProperties>) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  selectedQuiz: null,

  setSelectedQuiz: (quiz: Partial<{ id: string; title: string; published: boolean }>) => {
    set((state) => ({
      selectedQuiz: state.selectedQuiz
        ? { ...state.selectedQuiz, ...quiz }
        : {
            id: quiz.id ?? '',
            title: quiz.title ?? '',
            published: quiz.published ?? false,
          },
    }));
  },

  saveQuizToBE: (updateQuizFn) => {
    const metadata = get().selectedQuiz;
    if (!metadata) return;

    const blocks = useUndoRedoStore.getState().present;

    const blocksToSave = blocks.filter((b) => !(b.isNew && b.isDeleted));
    const changedBlocks = blocksToSave.filter((b) => b.isNew || b.isUpdated || b.isDeleted);

    if (changedBlocks.length === 0) return;

    const payload = {
      ...metadata,
      updatedAt: new Date().toISOString(),
      blocks: changedBlocks,
    };
    const erros = validateQuiz(payload);

    if (erros.length) {
      toast.error(erros[0]);
      return;
    }

    updateQuizFn(payload);
  },
}));
