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

  reorderBlocks: (blocks: TQuizBlock[]) => void;

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

      reorderBlocks: (blocks: TQuizBlock[]) => {
        set((state) => ({
          selectedQuiz: state.selectedQuiz
            ? {
                ...state.selectedQuiz,
                blocks: blocks.map((b, i) => ({
                  ...b,
                  order: i,
                  isUpdated: !b.isNew ? true : b.isUpdated,
                })),
              }
            : null,
        }));
      },

      addBlock: (type, index) => {
        const selectedQuiz = get().selectedQuiz;
        if (!selectedQuiz) return;
        const order = index ?? selectedQuiz.blocks.length;
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
                order,
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
                  order,
                  isDeleted: false,
                  isNew: true,
                  isUpdated: false,
                }
              : {
                  id: nanoid(),
                  type,
                  order,
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

        let orderCounter = 1;
        const reorderedBlocks = updatedBlocks.map((b) => {
          if (!b.isDeleted) {
            return { ...b, order: orderCounter++ };
          }
          return b;
        });

        const selectedBlockId = get().selectedBlockId === blockId ? null : get().selectedBlockId;

        set({
          selectedQuiz: { ...selectedQuiz, blocks: reorderedBlocks },
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
