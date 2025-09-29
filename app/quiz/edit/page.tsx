'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/src/store/useQuizStore';

const CreateQuizPage = () => {
  const createQuiz = useQuizStore((s) => s.createQuiz);
  const router = useRouter();

  useEffect(() => {
    const quiz = createQuiz('New Quiz');
    router.replace(`/quiz/edit/${quiz.id}`);
  }, [router, createQuiz]);

  return <div className="p-6 text-gray-700">Creating new quiz...</div>;
};

export default CreateQuizPage;
