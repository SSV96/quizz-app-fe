'use client';
import { BlockProperties, ITextBlock } from '@/src/types';
import React, { FC, ChangeEvent } from 'react';

interface ITextBlockEditorProps {
  block: ITextBlock;
  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => void;
}

export const TextBlockEditor: FC<ITextBlockEditorProps> = ({ block, updateBlock }) => {
  const { id, properties } = block;

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock(id, { ...properties, text: e.target.value });
  };

  return (
    <div>
      <h3 className="font-bold mb-3">Edit {block.type}</h3>
      <textarea
        className="w-full px-3 py-2 border rounded-md resize-none"
        value={properties.text || ''}
        onChange={handleTextChange}
        rows={4}
      />
    </div>
  );
};
