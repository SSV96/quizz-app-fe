import Link from 'next/link'
import React from 'react'
import { Quiz } from '../@types/block'

interface QuizItemProps extends Quiz{
  deleteQuiz:(id:string) => void;
}

const QuizItem: React.FC<QuizItemProps> = ({ id,
title,
createdAt,
updatedAt,
published ,deleteQuiz}) => {
  return (
    <div
      key={id}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
    >
      <Link
        href={`/quiz/${id}`}
        className="flex-1 text-blue-600 font-medium hover:underline"
      >
        {title}
      </Link>
      <button
        onClick={() => deleteQuiz(id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
      <p>{published ? "" : "not"} Published</p>

    </div>
  )
}

export default QuizItem