"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuizStore } from "../@store/useCanvasStore";

export default function Canvas() {
  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const selectBlock = useQuizStore((s) => s.selectBlock);
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const deleteBlock = useQuizStore((s) => s.deleteBlock);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const blocks = quiz?.blocks || [];

  const handleTextChange = (blockId: string, text: string) => {
    updateBlock(blockId, { text });
  };

  const handleQuestionChange = (blockId: string, text: string) => {
    updateBlock(blockId, {
      question: {
        text,
        kind: "text"
      },
    });
  };

  return (
    <div className="flex-1 p-4 bg-gray-100">
      <h3 className="font-bold mb-3">Canvas</h3>
      <Droppable droppableId="CANVAS">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[400px] border-2 border-dashed border-gray-300 p-4 bg-white rounded"
          >
            {blocks.length === 0 && (
              <p className="text-gray-400 text-center">Drag blocks here</p>
            )}

            {blocks.map((block, i) => (
              <Draggable key={block.id} draggableId={block.id} index={i}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className={`p-3 mb-3 rounded border shadow-sm bg-white cursor-pointer flex justify-between items-center ${block.id === selectedBlockId
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                      }`}
                  >
                    <div onClick={() => selectBlock(block.id)} className="flex-1">
                      {block.type === "heading" && (
                        <input
                          type="text"
                          value={block.properties.text || ""}
                          onChange={(e) =>
                            handleTextChange(block.id, e.target.value)
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      )}

                      {block.type === "question" && (
                        <input
                          type="text"
                          value={block.properties.question?.text || ""}
                          onChange={(e) =>
                            handleQuestionChange(block.id, e.target.value)
                          }
                          className="border px-2 py-1 rounded w-full"
                        />
                      )}

                      {(block.type === "button" || block.type === "footer") && (
                        <span>{block.properties.text}</span>
                      )}
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteBlock(quiz!.id, block.id)}
                      className="ml-2 text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
