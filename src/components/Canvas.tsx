'use client';
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { useQuizStore } from '../store/useCanvasStore';
import DraggableItem from './DraggableItem';
export default function Canvas() {
  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const blocks = quiz?.blocks || [];

  return (
    <div className="flex-1 p-6 bg-gray-50 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Canvas</h3>

      <Droppable droppableId="CANVAS">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="
              min-h-[400px] 
              border-2 border-dashed border-gray-300 
              p-6 rounded-xl 
              bg-white 
              transition-colors
            "
          >
            {blocks.length === 0 && (
              <p className="text-gray-400 text-center italic">Drag blocks here</p>
            )}

            {blocks.map((block, i) => (
              <DraggableItem block={block} index={i} quizId={quiz!.id} key={block.id} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
