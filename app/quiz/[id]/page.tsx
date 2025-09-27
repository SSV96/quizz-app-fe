"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuizStore } from "../../@store/useCanvasStore";
import { LocalStorage } from "../../@utils/localstorage";

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id as string;

  const quizzes = useQuizStore((s) => s.quizzes);
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);

  // ✅ Load quizzes from LocalStorage on mount
  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  const quiz = quizzes.find((q) => q.id === quizId);

  // 🛑 If quiz doesn't exist
  if (!quiz) {
    return (
      <div className="p-8 text-center text-red-500">
        Quiz not found!{" "}
        <button
          onClick={() => router.push("/")}
          className="underline text-blue-600"
        >
          Go back home
        </button>
      </div>
    );
  }

  // 🛑 If quiz is not published yet
  if (!quiz.published) {
    return (
      <div className="p-8 text-center text-gray-600">
        This quiz is <b>not published</b> yet.
        <div className="mt-4">
          <button
            onClick={() => router.push(`/quiz/edit/${quiz.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit Quiz
          </button>
        </div>
      </div>
    );
  }

  // ✅ Render published quiz beautifully
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      <div className="space-y-6">
        {quiz.blocks.map((block) => {
          switch (block.type) {
            case "heading":
              return (
                <h2 key={block.id} className="text-xl font-semibold">
                  {block.properties.text}
                </h2>
              );

            case "question":
              return (
                <div
                  key={block.id}
                  className="p-4 border rounded shadow-sm bg-gray-50"
                >
                  <p className="font-medium mb-2">
                    {block.properties.text}
                  </p>
                  <div className="space-y-2">
                    {block.properties.options?.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2"
                      >
                        <input type="radio" name={block.id} />
                        <span>{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );

            case "button":
              return (
                <button
                  key={block.id}
                  className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                  {block.properties.text || "Submit"}
                </button>
              );

            case "footer":
              return (
                <p
                  key={block.id}
                  className="text-gray-500 text-sm mt-4 text-center"
                >
                  {block.properties.text}
                </p>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
