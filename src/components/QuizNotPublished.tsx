import { useRouter } from 'next/router';
import React from 'react';

const QuizNotPublished: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  return (
    <div className="p-8 text-center text-gray-600">
      This quiz is <b>not published</b> yet.
      <div className="mt-4">
        <button
          onClick={() => router.push(`/quiz/edit/${id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizNotPublished;
