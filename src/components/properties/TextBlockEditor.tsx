'use client';
import { ITextBlock } from '@/src/types';
import React, { FC } from 'react';

interface ITextBlockEditorProps {
  block: ITextBlock;
}

export const TextBlockEditor: FC<ITextBlockEditorProps> = ({ block }) => {
  return (
    <>
      <h3 className="font-bold mb-3">Edit {block.type}</h3>
      <p className="w-full px-3 py-2">{block.properties.text || ''}</p>
    </>
  );
};
