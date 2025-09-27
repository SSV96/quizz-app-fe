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
     
      <p >{createdAt}</p>
      <p>{updatedAt}</p>
      <p className={`${published ?" text-green-600":""}`}>{published ? "" : "not"} Published</p>
      <button
        onClick={() => deleteQuiz(id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default QuizItem