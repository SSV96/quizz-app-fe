import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { LocalStorage } from '../utils/localstorage';
import toast from 'react-hot-toast';
import { BlockEnum, Quiz, QuestionKindEnum, TQuizBlock } from '../types';
import { demoQuiz } from '../utils/demo-quiz';

interface QuizStore {
  quizzes: Quiz[];
  selectedQuizId: string | null;
  selectedBlockId: string | null;

  loadQuizzes: () => void;
  createQuiz: (title: string) => Quiz;
  setSelectedQuiz: (id: string | null) => void;
  selectBlock: (id: string | null) => void;
  addBlock: (quizId: string, type: TQuizBlock['type'], index: number) => void;
  updateBlock: (blockId: string, properties: Partial<TQuizBlock['properties']>) => void;
  deleteBlock: (quizId: string, blockId: string) => void;
  saveQuiz: () => void;
  publishQuiz: (quizId: string) => void;
  deleteQuiz: (quizId: string) => void;
  togglePublishQuiz: (quizId: string, published: boolean) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
  selectedQuizId: null,
  selectedBlockId: null,

  loadQuizzes: () => {
    const storedQuizzes = LocalStorage.getQuizzes();
    set({ quizzes: storedQuizzes });
  },

  createQuiz: (title) => {
    const blocks = demoQuiz[0].blocks;
    const newQuiz: Quiz = {
      id: nanoid(),
      title,
      published: false,
      blocks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedQuizzes = [...get().quizzes, newQuiz];
    LocalStorage.saveQuizzes(updatedQuizzes);
    set({ quizzes: updatedQuizzes, selectedQuizId: newQuiz.id });
    return newQuiz;
  },

  setSelectedQuiz: (id) => set({ selectedQuizId: id, selectedBlockId: null }),
  selectBlock: (id) => set({ selectedBlockId: id }),

  addBlock: (quizId, type, index) =>
    set((state) => {
      let newBlockItem: TQuizBlock;
      switch (type) {
        case BlockEnum.QUESTION: {
          newBlockItem = {
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
          };
          break;
        }
        case BlockEnum.BUTTON: {
          newBlockItem = {
            id: nanoid(),
            type,
            properties: {
              previousLabel: 'Previous',
              nextLabel: 'Next',
              submitLabel: 'Submit',
            },
          };
          break;
        }
        case BlockEnum.HEADING: {
          newBlockItem = {
            id: nanoid(),
            type,
            properties: {
              text: 'Header',
            },
          };
          break;
        }
        case BlockEnum.FOOTER: {
          newBlockItem = {
            id: nanoid(),
            type,
            properties: {
              text: 'Footer',
            },
          };
          break;
        }
        default: {
          newBlockItem = {
            id: nanoid(),
            type,
            properties: {},
          };
          break;
        }
      }

      const updatedQuizzes = state.quizzes.map((quiz) => {
        if (quiz.id !== quizId) return quiz;

        const blocks = [...quiz.blocks];
        if (typeof index === 'number') {
          blocks.splice(index, 0, newBlockItem);
        } else {
          blocks.push(newBlockItem);
        }

        return { ...quiz, blocks };
      });

      LocalStorage.saveQuizzes(updatedQuizzes);
      return { quizzes: updatedQuizzes };
    }),

  updateBlock: (blockId, properties) =>
    set((state) => {
      const updatedQuizzes = state.quizzes.map((quiz) => ({
        ...quiz,
        updatedAt: new Date().toISOString(),
        blocks: quiz.blocks.map((block) =>
          block.id === blockId
            ? {
                ...block,
                properties: {
                  ...block.properties,
                  ...properties,
                },
              }
            : block,
        ),
      }));
      LocalStorage.saveQuizzes(updatedQuizzes);
      return { quizzes: updatedQuizzes };
    }),

  deleteBlock: (quizId, blockId) =>
    set((state) => {
      const updatedQuizzes = state.quizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              blocks: quiz.blocks.filter((block) => block.id !== blockId),
            }
          : quiz,
      );
      LocalStorage.saveQuizzes(updatedQuizzes);
      return { quizzes: updatedQuizzes, selectedBlockId: null };
    }),

  saveQuiz: () => {
    const quizzes = get().quizzes;
    LocalStorage.saveQuizzes(quizzes);
    toast.success(' Quiz saved successfully');
  },

  publishQuiz: (quizId) =>
    set((state) => {
      const updatedQuizzes = state.quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, published: true } : quiz,
      );
      LocalStorage.saveQuizzes(updatedQuizzes);
      toast.success('Quiz published successfully');
      return { quizzes: updatedQuizzes };
    }),

  togglePublishQuiz: (quizId, published) => {
    const updatedQuizzes = get().quizzes.map((q) =>
      q.id === quizId ? { ...q, published: !q.published } : q,
    );
    set({ quizzes: updatedQuizzes });
    toast.success(`Quiz ${published ? 'Published' : 'Drafted'} successfully`);
    LocalStorage.saveQuizzes(updatedQuizzes);
  },

  deleteQuiz: (quizId) =>
    set((state) => {
      const updatedQuizzes = state.quizzes.filter((quiz) => quiz.id !== quizId);
      LocalStorage.saveQuizzes(updatedQuizzes);
      toast.success('Quiz deleted successfully');
      return {
        quizzes: updatedQuizzes,
        selectedQuizId: state.selectedQuizId === quizId ? null : state.selectedQuizId,
        selectedBlockId: null,
      };
    }),
}));
