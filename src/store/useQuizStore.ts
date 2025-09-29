import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { LocalStorage } from '../utils/localstorage';
import toast from 'react-hot-toast';
import { Block, BlockEnum, Quiz, QuestionKindEnum } from '../types';

interface QuizStore {
  quizzes: Quiz[];
  selectedQuizId: string | null;
  selectedBlockId: string | null;

  loadQuizzes: () => void;
  createQuiz: (title: string) => Quiz;
  setSelectedQuiz: (id: string | null) => void;
  selectBlock: (id: string | null) => void;
  addBlock: (quizId: string, type: Block['type']) => void;
  updateBlock: (blockId: string, properties: Partial<Block['properties']>) => void;
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
    const newQuiz: Quiz = {
      id: nanoid(),
      title,
      published: false,
      blocks: [],
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

  addBlock: (quizId, type) =>
    set((state) => {
      const newBlock: Block =
        type === BlockEnum.QUESTION
          ? {
              id: nanoid(),
              type,
              properties: {
                question: {
                  id: nanoid(),
                  kind: QuestionKindEnum.SINGLE,
                  text: 'New Question',
                  options: [
                    { id: nanoid(), text: 'Option 1' },
                    { id: nanoid(), text: 'Option 2' },
                  ],
                  correctOptionIds: [],
                },
              },
            }
          : {
              id: nanoid(),
              type,
              properties: {
                text: type === 'HEADING' ? 'HEADING' : type === 'BUTTON' ? 'Click Me' : 'Footer',
              },
            };

      const updatedQuizzes = state.quizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, blocks: [...quiz.blocks, newBlock] } : quiz,
      );

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
                  question: properties.question
                    ? {
                        ...block.properties.question,
                        ...properties.question,
                      }
                    : block.properties.question,
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
    console.log(quizId, published);
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
