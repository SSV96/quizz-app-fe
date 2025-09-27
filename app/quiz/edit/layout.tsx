"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuizStore } from "../../@store/useCanvasStore";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);
  const quizzes = useQuizStore((s) => s.quizzes);
  const pathname = usePathname();

  // ✅ Load quizzes when quiz pages mount
  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* LEFT SIDEBAR */}
      {/* <aside className="w-64 bg-white border-r shadow-sm flex flex-col"> */}
        {/* <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-blue-600">Quiz Builder</h2>
        </div> */}

        {/* Quizzes List */}
        {/* <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/edit/${quiz.id}`}
                className={`block p-2 rounded ${pathname === `/quiz/edit/${quiz.id}`
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                  }`}
              >
                {quiz.title}
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No quizzes yet</p>
          )}
        </nav> */}

        {/* Create New Quiz
        <div className="p-4 border-t">
          <Link
            href="/quiz/edit"
            className="w-full block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded"
          >
            + Create Quiz
          </Link>
        </div> */}
      {/* </aside> */}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
