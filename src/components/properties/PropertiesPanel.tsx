'use client';
import React from 'react';
import { BlockEnum, BlockProperties, IButtonBlock, IQuestionBlock, ITextBlock } from '@/src/types';
import { QuestionEditor } from './QuestionEditor';
import { TextBlockEditor } from './TextBlockEditor';
import ButtonProperties from './ButtonProperties';
import { useUndoRedoStore } from '@/src/store/useUndoRedoStore';

interface PropertiesPanelProps {
  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => void;
}

export const PropertiesPanel = ({ updateBlock }: PropertiesPanelProps) => {
  const blocks = useUndoRedoStore((s) => s.present);
  const selectedBlockId = useUndoRedoStore((s) => s.selectedBlockId);

  const block = blocks.find((b) => b.id === selectedBlockId);

  if (!block) {
    return (
      <div style={{ width: 320 }} className="p-4 bg-gray-100 flex flex-col h-full">
        <h2>Properties</h2>
        <p className="text-gray-400">Select a block to edit</p>
      </div>
    );
  }

  const isQuestionBlock = block.type === BlockEnum.QUESTION;
  const isButtonBlock = block.type === BlockEnum.BUTTON;
  const isTextBlockEditor = block.type === BlockEnum.HEADING || block.type === BlockEnum.FOOTER;

  return (
    <div style={{ width: 320 }} className="bg-gray-100 p-4 flex flex-col justify-between h-full">
      <h2>Properties</h2>
      <div className="flex-1">
        {isQuestionBlock && (
          <QuestionEditor block={block as IQuestionBlock} updateBlock={updateBlock} />
        )}
        {isButtonBlock && (
          <ButtonProperties block={block as IButtonBlock} updateBlock={updateBlock} />
        )}
        {isTextBlockEditor && (
          <TextBlockEditor block={block as ITextBlock} updateBlock={updateBlock} />
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
