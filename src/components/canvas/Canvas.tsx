'use client';
import React, { useEffect, useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { useQuizStore } from '../../store/useQuizStore';
import DraggableItem from './DraggableItem';
import { DroppableAreaEnum, BlockEnum, Block, QuestionKindEnum, Quiz } from '../../types';
import { demoQuiz } from '@/src/utils/demo-quiz';

export default function Canvas({ quiz }: { quiz: Quiz }) {
  const [blocks, setDisplayBlocks] = useState<Block[]>(quiz.blocks);

  useEffect(() => {
    if (!quiz.blocks || quiz.blocks.length === 0) {
      setDisplayBlocks(demoQuiz[0].blocks);
    } else {
      setDisplayBlocks(quiz.blocks);
    }
  }, [quiz.blocks]);

  return (
    <div className="flex-1 p-6 bg-gray-50 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Canvas</h3>

      <Droppable droppableId={DroppableAreaEnum.CANVAS}>
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
            {blocks.map((block, i) => (
              <DraggableItem
                block={block}
                index={i}
                quizId={quiz?.id ?? 'default'}
                key={block.id}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
