'use client';
import QuizsEmptyMessage from '@/src/components/quiz/QuizsEmptyMessage';
import QuizTable from '@/src/components/quiz/QuizTable';
import { useQuizzes } from '@/src/hooks/useQuizzes';

const Page = () => {
  const { data, isLoading, isError } = useQuizzes();

  const isQuizzesExist = !!data && data.length > 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {isLoading && <div>Loading quizzes...</div>}

      {isError && <div>Failed to load quizzes.</div>}

      {isQuizzesExist ? <QuizTable quizzes={data} /> : <QuizsEmptyMessage />}
    </div>
  );
};

export default Page;
