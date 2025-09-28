import Link from 'next/link';
import React from 'react';
import { Quiz } from '../@types/block';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface QuizItemProps extends Quiz {
  deleteQuiz: (id: string) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({
  id,
  title,
  createdAt,
  updatedAt,
  published,
  deleteQuiz,
}) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 w-[800px]"
    >
      <Link href={`/quiz/${id}`} className="flex-1 text-blue-600 font-medium hover:underline">
        {title}
      </Link>

      <p className="px-2">{createdAt}</p>
      <p className="px-2">{updatedAt}</p>
      <p className={`${published ? ' text-green-600' : ''} px-2`}>
        {published ? '' : 'not'} Published
      </p>
      <Button
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={() => deleteQuiz(id)}
        className="!rounded-lg"
      >
        Delete
      </Button>
    </div>
  );
};

export default QuizItem;
