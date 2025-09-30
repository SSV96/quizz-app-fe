'use client';
import QuizsEmptyMessage from '@/src/components/quiz/QuizsEmptyMessage';
import QuizTable from '@/src/components/quiz/QuizTable';
import { useQuizzes } from '@/src/hooks/useQuizzes';
import { LoaderIcon } from 'react-hot-toast';

const Page = () => {
  const { data, isSuccess, isPending } = useQuizzes();

  const isQuizzesExist = !!data && data.length > 0;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {isPending && <LoaderIcon />}

      {isSuccess && <>{isQuizzesExist ? <QuizTable quizzes={data} /> : <QuizsEmptyMessage />}</>}
    </div>
  );
};

export default Page;
