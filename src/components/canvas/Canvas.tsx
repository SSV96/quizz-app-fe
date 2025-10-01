'use client';
import React, { useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from './DraggableItem';
import { DroppableAreaEnum, BlockProperties } from '../../types';
import { useUndoRedoStore } from '@/src/store/useUndoRedoStore';

interface CanvasProps {
  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => void;
}

export default function Canvas({ updateBlock }: CanvasProps) {
  const present = useUndoRedoStore((s) => s.present);

  const blocks = useMemo(
    () => present.filter((b) => !(b.isNew && b.isDeleted) && !b.isDeleted),
    [present],
  );

  return (
    <div className="flex-1 p-6 bg-gray-50 transition-colors">
      <h3 className="font-bold mb-4 text-gray-700">Canvas</h3>

      <Droppable droppableId={DroppableAreaEnum.CANVAS}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] border-2 p-6 rounded-xl transition-colors ${
              snapshot.isDraggingOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-dashed border-gray-300 bg-white'
            }`}
          >
            {blocks.map((block, i) => (
              <DraggableItem key={block.id} block={block} index={i} updateBlock={updateBlock} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
