'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuizStore } from '../store/useCanvasStore';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockRenderer from './BlockRenderer';

export default function Canvas() {
  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const selectBlock = useQuizStore((s) => s.selectBlock);
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const deleteBlock = useQuizStore((s) => s.deleteBlock);

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
              <Draggable key={block.id} draggableId={block.id} index={i}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className={`
                      p-4 mb-4 rounded-lg 
                      border shadow-sm 
                      bg-white
                      cursor-pointer flex justify-between items-center
                      transition-all duration-200 ease-in-out
                      hover:shadow-md hover:scale-[1.01]
                      ${
                        block.id === selectedBlockId
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 '
                      }
                    `}
                    onClick={() => selectBlock(block.id)}
                  >
                    <div className="flex-1">
                      <BlockRenderer block={block} updateBlock={updateBlock} />
                    </div>

                    <DeleteIcon
                      onClick={() => deleteBlock(quiz!.id, block.id)}
                      className="ml-3 text-red-500 cursor-pointer hover:text-red-700 active:scale-95 transition"
                    />
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
