"use client";
import { useQuizStore } from "./@store/useCanvasStore";
import { useEffect } from "react";
import QuizItem from "./@components/QuizItem";

export default function HomePage() {
  const quizzes = useQuizStore((s) => s.quizzes);
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);
  const deleteQuiz = useQuizStore((s) => s.deleteQuiz);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
      </div>

      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes yet.</p>
      ) : (
        <div className="space-y-3">
          {quizzes.map((quiz) => (
            <QuizItem key={quiz.id} {...quiz} deleteQuiz={deleteQuiz} />
          ))}
        </div>
      )}
    </div>
  );
}
