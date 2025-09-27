"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuizStore } from "../@store/useCanvasStore";

export default function Canvas() {

  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);
  const selectBlock = useQuizStore((s) => s.selectBlock);
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const blocks = quiz?.blocks || [];

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
                    onClick={() => selectBlock(block.id)}
                    className={`p-3 mb-2 rounded border cursor-pointer ${block.id === selectedBlockId
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                      }`}
                  >
                    {block.properties.text || block.type}
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
