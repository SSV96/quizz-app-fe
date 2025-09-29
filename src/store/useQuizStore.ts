import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { IQuiz, TQuizBlock, BlockEnum, QuestionKindEnum } from '../types';

interface QuizStore {
  selectedQuiz: IQuiz | null;
  selectedBlockId: string | null;

  loadCurrentQuiz: (quiz: IQuiz) => void;
  setSelectedQuiz: (quiz: Partial<IQuiz>) => void;

  setSelectedBlock: (id: string) => void;
  addBlock: (type: TQuizBlock['type'], index?: number) => void;
  updateBlock: (blockId: string, properties: Partial<TQuizBlock['properties']>) => void;
  deleteBlock: (blockId: string) => void;

  saveQuizToBE: (updateQuizFn: (quiz: IQuiz) => void) => void;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      selectedQuiz: null,
      selectedBlockId: null,

      loadCurrentQuiz: (quiz) => set({ selectedQuiz: quiz, selectedBlockId: null }),

      setSelectedQuiz: (quiz) =>
        set((state) => ({
          selectedQuiz: state.selectedQuiz
            ? { ...state.selectedQuiz, ...quiz }
            : state.selectedQuiz,
        })),

      setSelectedBlock: (id) => set({ selectedBlockId: id }),

      addBlock: (type, index) => {
        const selectedQuiz = get().selectedQuiz;
        if (!selectedQuiz) return;

        const newBlock: TQuizBlock =
          type === BlockEnum.QUESTION
            ? {
                id: nanoid(),
                type,
                properties: {
                  kind: QuestionKindEnum.SINGLE,
                  text: 'New Question',
                  options: [
                    { id: nanoid(), text: 'Option 1' },
                    { id: nanoid(), text: 'Option 2' },
                  ],
                  correctOptionIds: [],
                },
                isDeleted: false,
                isNew: true,
                isUpdated: false,
              }
            : type === BlockEnum.BUTTON
              ? {
                  id: nanoid(),
                  type,
                  properties: {
                    previousLabel: 'Previous',
                    nextLabel: 'Next',
                    submitLabel: 'Submit',
                  },
                  isDeleted: false,
                  isNew: true,
                  isUpdated: false,
                }
              : {
                  id: nanoid(),
                  type,
                  properties: {},
                  isDeleted: false,
                  isNew: true,
                  isUpdated: false,
                };

        const newBlocks =
          typeof index === 'number'
            ? [
                ...selectedQuiz.blocks.slice(0, index),
                newBlock,
                ...selectedQuiz.blocks.slice(index),
              ]
            : [...selectedQuiz.blocks, newBlock];
        set({ selectedQuiz: { ...selectedQuiz, blocks: newBlocks } });
      },

      updateBlock: (blockId, properties) =>
        set((state) => ({
          selectedQuiz: state.selectedQuiz
            ? {
                ...state.selectedQuiz,
                blocks: state.selectedQuiz.blocks.map((b) =>
                  b.id === blockId
                    ? {
                        ...b,
                        properties: { ...b.properties, ...properties },
                        isUpdated: !b.isNew,
                      }
                    : b,
                ),
              }
            : null,
        })),

      deleteBlock: (blockId) => {
        const selectedQuiz = get().selectedQuiz;
        if (!selectedQuiz) return;

        const updatedBlocks = selectedQuiz.blocks.map((b) =>
          b.id === blockId ? { ...b, isDeleted: true, isNew: false } : b,
        );

        const selectedBlockId = get().selectedBlockId === blockId ? null : get().selectedBlockId;

        set({
          selectedQuiz: { ...selectedQuiz, blocks: updatedBlocks },
          selectedBlockId,
        });
      },

      saveQuizToBE: (updateQuizFn) => {
        const selectedQuiz = get().selectedQuiz;
        if (!selectedQuiz) return;

        const blocksToSave = selectedQuiz.blocks.filter(
          (b) => b.isNew || b.isUpdated || b.isDeleted,
        );

        if (blocksToSave.length === 0) return;
        const payload = { ...selectedQuiz, blocks: blocksToSave };
        const updatedBlocks = selectedQuiz.blocks.map((b) => ({
          ...b,
          isNew: false,
          isUpdated: false,
          isDeleted: false,
        }));
        updateQuizFn(payload);
        set({ selectedQuiz: { ...selectedQuiz, blocks: updatedBlocks } });
      },
    }),
    { name: 'selected-quiz-storage' },
  ),
);
