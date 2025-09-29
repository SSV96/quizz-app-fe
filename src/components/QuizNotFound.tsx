import { useRouter } from 'next/router';
import React, { FC } from 'react';

const QuizNotFound: FC = () => {
  const router = useRouter();
  return (
    <div className="p-8 text-center text-red-500">
      Quiz not found!{' '}
      <button onClick={() => router.push('/')} className="underline text-blue-600">
        Go back home
      </button>
    </div>
  );
};

export default QuizNotFound;
