"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "../../@store/useCanvasStore";

export default function QuizEditorPage() {
  const router = useRouter();
  const createQuiz = useQuizStore((s) => s.createQuiz);

  const handleCreateQuiz = () => {
    const title = prompt("Enter quiz title:") || "Untitled Quiz";
    const quiz = createQuiz(title);
    router.push(`/quiz/edit/${quiz.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create a New Quiz</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={handleCreateQuiz}
      >
        + Create New Quiz
      </button>
    </div>
  );
}
