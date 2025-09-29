'use client';
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from './DraggableItem';
import { DroppableAreaEnum, Quiz } from '../../types';

export default function Canvas({ quiz }: { quiz: Quiz }) {
  return (
    <div className="flex-1 p-6 bg-gray-50 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Canvas</h3>

      <Droppable droppableId={DroppableAreaEnum.CANVAS}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
        min-h-[400px] 
        border-2 p-6 rounded-xl
        transition-colors
        ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300 bg-white'}
      `}
          >
            {quiz.blocks.map((block, i) => (
              <DraggableItem block={block} index={i} quizId={quiz.id} key={block.id} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
