'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateQuiz } from '@/src/hooks/useQuizzes';
import { IQuiz } from '@/src/types';

const CreateQuizPage = () => {
  const router = useRouter();
  const redirectToQuizEditor = (quiz: IQuiz) => {
    router.replace(`/quiz/edit/${quiz.id}`);
  };

  const { isError, isPending, mutate } = useCreateQuiz(redirectToQuizEditor);

  useEffect(() => {
    mutate({ title: 'New Quiz' });
  }, [mutate]);

  if (isError) {
    return <p className="text-red-500">Something went Wrong </p>;
  }

  if (isPending) {
    return <p className=""> Creating new quiz...</p>;
  }

  return null;
};

export default CreateQuizPage;
