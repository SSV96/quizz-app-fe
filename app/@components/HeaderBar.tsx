"use client";
import React from "react";
import { useQuizStore } from "../@store/useCanvasStore";

export default function HeaderBar() {
  const quiz = useQuizStore((s) => s.quiz);
  const setQuiz = useQuizStore((s) => s.setQuiz);

  const saveToBackend = async (publish = false) => {
    // for new: POST /api/quiz ; for existing: PUT /api/quiz/[id]
    const url = `/api/quiz${quiz.id ? `/${quiz.id}` : ""}`;
    const method = quiz.id ? "PUT" : "POST";
    const body = { ...quiz, published: publish ? true : quiz.published };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const saved = await res.json();
    setQuiz(saved);
    alert(publish ? "Published" : "Saved");
  };

  return (
    <div className="w-full p-4 border-b bg-white flex items-center gap-4">
      <input
        className="flex-1 border rounded px-3 py-2"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => saveToBackend(false)}>
        Save
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => saveToBackend(true)}>
        Publish
      </button>
    </div>
  );
}
