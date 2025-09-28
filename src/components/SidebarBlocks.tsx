'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { BlockEnum } from '../types/block';

const palette = [
  { type: BlockEnum.HEADING, label: 'Heading' },
  { type: BlockEnum.QUESTION, label: 'Question' },
  { type: BlockEnum.BUTTON, label: 'Button' },
  { type: BlockEnum.FOOTER, label: 'Footer' },
];

export default function SidebarBlocks() {
  return (
    <div style={{ width: 240 }} className="border-r p-4 bg-gray-50 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Building blocks</h3>

      <Droppable droppableId="SIDEBAR" isDropDisabled>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {palette.map((p, i) => (
              <Draggable key={p.type} draggableId={p.type} index={i}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className="
                      p-3 mb-3 rounded-lg 
                      bg-white 
                      border border-gray-200
                      cursor-grab active:cursor-grabbing
                      shadow-sm hover:shadow-md 
                      transition-all duration-200 ease-in-out
                      hover:bg-gray-100
                      text-gray-800
                      select-none
                    "
                  >
                    {p.label}
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
