import { useRouter } from 'next/router';
import React from 'react';

const QuizNotFound = () => {
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
