"use client";
import React, { useState, useEffect } from "react";
import { useQuizStore } from "../@store/useCanvasStore";

export default function PropertiesPanel() {
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const deleteBlock = useQuizStore((s) => s.deleteBlock);
  const selectBlock = useQuizStore((s) => s.selectBlock);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const block = quiz?.blocks.find((b) => b.id === selectedBlockId);

  const [localQuestion, setLocalQuestion] = useState(block?.properties.question);

  // When block changes, sync local state
  useEffect(() => {
    if (block?.type === "question") {
      setLocalQuestion(block.properties.question);
    }
  }, [block]);

  // 🟢 Debounced effect: Updates Zustand AFTER user stops typing
  useEffect(() => {
    if (block?.type === "question" && localQuestion) {
      const timeout = setTimeout(() => {
        updateBlock(block.id, { question: localQuestion });
      }, 300); // 300ms debounce
      return () => clearTimeout(timeout);
    }
  }, [localQuestion, block?.id, block?.type, updateBlock]);

  if (!block) {
    return (
      <div style={{ width: 320 }} className="p-4 border-l bg-white">
        <p className="text-gray-400">Select a block to edit</p>
      </div>
    );
  }

  const handleDeleteBlock = () => {
    deleteBlock(quiz?.id ||"",block.id);
    selectBlock(null);
  };

  const handleDeleteOption = (optionId: string) => {
    setLocalQuestion((prev) => ({
      ...prev!,
      options: prev?.options?.filter((o) => o.id !== optionId),
      correctOptionIds: prev?.correctOptionIds?.filter((id) => id !== optionId),
    }));
  };

  if (block.type !== "question") {
    return (
      <div style={{ width: 320 }} className="p-4 border-l bg-white">
        <h3 className="font-bold mb-3">Edit {block.type}</h3>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={block.properties.text || ""}
          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
        />
        <button
          className="mt-4 bg-red-600 text-white py-2 rounded w-full"
          onClick={handleDeleteBlock}
        >
          Delete Block
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: 320 }} className="p-4 border-l bg-white">
      <h3 className="font-bold mb-3">Edit Question</h3>

      {/* Question Text */}
      <p className="font-semibold text-gray-700 mb-3">
        {localQuestion?.text || "Untitled Question"}
      </p>

      {/* Question Type */}
      <label className="block mb-1 font-medium">Question Type</label>
      <select
        value={localQuestion?.kind || "single"}
        onChange={(e) =>
          setLocalQuestion({
            ...localQuestion!,
            kind: e.target.value as "single" | "multi" | "text",
            correctOptionIds: [],
          })
        }
        className="w-full border px-3 py-2 rounded mb-3"
      >
        <option value="single">Single Choice</option>
        <option value="multi">Multiple Choice</option>
        <option value="text">Text Answer</option>
      </select>

      {/* Show options only for single/multi */}
      {localQuestion?.kind !== "text" && (
        <>
          <h4 className="font-semibold mb-2">Options</h4>
          {localQuestion?.options?.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={opt.text}
                onChange={(e) =>
                  setLocalQuestion({
                    ...localQuestion!,
                    options: localQuestion.options?.map((o) =>
                      o.id === opt.id ? { ...o, text: e.target.value } : o
                    ),
                  })
                }
                className="flex-1 border px-3 py-1 rounded"
              />
              {localQuestion.kind === "single" ? (
                <input
                  type="radio"
                  name="correct"
                  checked={localQuestion.correctOptionIds?.[0] === opt.id}
                  onChange={() =>
                    setLocalQuestion({
                      ...localQuestion!,
                      correctOptionIds: [opt.id],
                    })
                  }
                />
              ) : (
                <input
                  type="checkbox"
                  checked={localQuestion.correctOptionIds?.includes(opt.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setLocalQuestion({
                      ...localQuestion!,
                      correctOptionIds: checked
                        ? [...(localQuestion.correctOptionIds || []), opt.id]
                        : localQuestion.correctOptionIds?.filter(
                          (id) => id !== opt.id
                        ),
                    });
                  }}
                />
              )}
              {/* Delete Option */}
              <button
                onClick={() => handleDeleteOption(opt.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add Option */}
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => {
              const optionCount = localQuestion?.options?.length ?? 0;
              setLocalQuestion({
                ...localQuestion!,
                options: [
                  ...(localQuestion?.options || []),
                  { id: crypto.randomUUID(), text: `Option ${optionCount + 1}` },
                ],
              });
            }}
          >
            + Add Option
          </button>
        </>
      )}
    </div>
  );
}
