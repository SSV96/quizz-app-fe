'use client';
import React, { FC } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { BlockEnum, DroppableAreaEnum, Quiz } from '../../types';
import cn from 'classnames';

const palette = [
  { type: BlockEnum.HEADING, label: 'Heading' },
  { type: BlockEnum.QUESTION, label: 'Question' },
  { type: BlockEnum.BUTTON, label: 'Button' },
  { type: BlockEnum.FOOTER, label: 'Footer' },
];

interface ISidebarBlocksProps {
  selectedQuiz: Quiz;
}

export const SidebarBlocks: FC<ISidebarBlocksProps> = ({ selectedQuiz }) => {
  const { blocks } = selectedQuiz;

  const checkIsBlockDisabled = (blockType: BlockEnum) => {
    if (blockType === BlockEnum.QUESTION) return false;

    return blocks.some(({ type }) => type === blockType);
  };

  return (
    <div style={{ width: 240 }} className="bg-gray-100 rounded-md p-4 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Building blocks</h3>

      <Droppable droppableId={DroppableAreaEnum.SIDEBAR} isDropDisabled>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
            {palette.map((p, i) => {
              const isBlockDisabled = checkIsBlockDisabled(p.type);

              return (
                <Draggable
                  key={p.type}
                  draggableId={p.type}
                  index={i}
                  isDragDisabled={isBlockDisabled}
                >
                  {(prov) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className={cn(
                        'p-3 mb-3 rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all duration-200 ease-in-out text-gray-800 select-none',
                        {
                          'bg-white hover:bg-gray-100': !isBlockDisabled,
                          'cursor-not-allowed bg-gray-300 hover:bg-gray-300': isBlockDisabled,
                        },
                      )}
                    >
                      {p.label}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SidebarBlocks;
