import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const QuizNotPublished: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  return (
    <div className="p-8 text-center text-gray-600">
      This quiz is <b>not published</b> yet.
      <div className="mt-4">
        <Button onClick={() => router.push(`/quiz/edit/${id}`)} variant="contained">
          Edit Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizNotPublished;
