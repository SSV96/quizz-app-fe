'use client';
import { Draggable } from '@hello-pangea/dnd';
import { FC } from 'react';
import BlockRenderer from '../BlockRenderer';
import { BlockProperties, TQuizBlock } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUndoRedoStore } from '../../store/useUndoRedoStore';
import cn from 'classnames';

interface DraggableItemProps {
  block: TQuizBlock;
  index: number;
  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => void;
}

const DraggableItem: FC<DraggableItemProps> = ({ block, index, updateBlock }) => {
  const selectedBlockId = useUndoRedoStore((s) => s.selectedBlockId);
  const setSelectedBlock = useUndoRedoStore((s) => s.setSelectedBlock);

  const blocks = useUndoRedoStore((s) => s.present);
  const setBlocks = useUndoRedoStore((s) => s.set);

  const handleDeleteBlock = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    const updated = blocks
      .map((b) => (b.id === block.id ? (b.isNew ? null : { ...b, isDeleted: true }) : b))
      .filter(Boolean) as TQuizBlock[];

    setBlocks(updated);
  };

  if (block.isDeleted) return null;

  return (
    <Draggable draggableId={block.id} index={index}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className={cn(
            'p-4 mb-4 rounded-lg border shadow-sm bg-white cursor-pointer flex justify-between items-center',
            'transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01]',
            {
              'border-blue-500 bg-blue-50': block.id === selectedBlockId,
              'border-gray-200': block.id !== selectedBlockId,
            },
          )}
          onClick={() => setSelectedBlock(block.id)}
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium mr-3">
            {index + 1}
          </span>

          <div className="flex-1">
            <BlockRenderer block={block} updateBlock={updateBlock} />
          </div>

          <DeleteIcon
            onClick={handleDeleteBlock}
            className="ml-3 text-red-500 cursor-pointer hover:text-red-700 active:scale-95 transition"
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
