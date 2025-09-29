'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/src/store/useQuizStore';
import { demoQuiz } from '@/src/utils/demo-quiz';
import { Block } from '@/src/types';
import { nanoid } from 'nanoid';

const CreateQuizPage = () => {
  const createQuiz = useQuizStore((s) => s.createQuiz);
  const router = useRouter();

  useEffect(() => {
    const quiz = createQuiz('Untitled Quiz');

    // Add default blocks
    const defaultBlocks: Block[] = demoQuiz[0].blocks.map((b) => ({
      ...b,
      id: nanoid(),
      properties: { ...b.properties },
    }));
    quiz.blocks = defaultBlocks;

    // Update state & localStorage
    useQuizStore.setState({
      quizzes: [...useQuizStore.getState().quizzes],
    });
    localStorage.setItem('quizzes', JSON.stringify(useQuizStore.getState().quizzes));

    router.replace(`/quiz/edit/${quiz.id}`);
  }, []);

  return <div className="p-6 text-gray-700">Creating new quiz...</div>;
};

export default CreateQuizPage;
