import { Draggable } from '@hello-pangea/dnd';
import React, { FC } from 'react';
import BlockRenderer from '../BlockRenderer';
import { TQuizBlock } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuizStore } from '../../store/useQuizStore';
import cx from 'classnames';

interface DraggableItemProps {
  block: TQuizBlock;
  quizId: string;
  index: number;
}

const DraggableItem: FC<DraggableItemProps> = ({ block, quizId, index }) => {
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const selectBlock = useQuizStore((s) => s.selectBlock);
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const deleteBlock = useQuizStore((s) => s.deleteBlock);

  return (
    <Draggable draggableId={block.id} index={index}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className={cx(
            'p-4 mb-4 rounded-lg border shadow-sm bg-white cursor-pointer flex justify-between items-center',
            'transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01]',
            {
              'border-blue-500 bg-blue-50': block.id === selectedBlockId,
              'border-gray-200': block.id !== selectedBlockId,
            },
          )}
          onClick={() => selectBlock(block.id)}
        >
          <div className="flex-1">
            <BlockRenderer block={block} updateBlock={updateBlock} />
          </div>

          <DeleteIcon
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(quizId, block.id);
            }}
            className="ml-3 text-red-500 cursor-pointer hover:text-red-700 active:scale-95 transition"
          />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
