'use client';
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const palette = [
  { type: 'heading', label: 'Heading' },
  { type: 'question', label: 'Question' },
  { type: 'button', label: 'Button' },
  { type: 'footer', label: 'Footer' },
];

export default function SidebarBlocks() {
  return (
    <div
      style={{ width: 240 }}
      className="border-r p-4 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <h3 className="font-bold mb-4 text-gray-700 dark:text-gray-200">Building blocks</h3>

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
                      bg-white dark:bg-gray-800 
                      border border-gray-200 dark:border-gray-700
                      cursor-grab active:cursor-grabbing
                      shadow-sm hover:shadow-md 
                      transition-all duration-200 ease-in-out
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      text-gray-800 dark:text-gray-100
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
