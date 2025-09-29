import React from 'react';
import { Block, BlockEnum } from '../types/block';

interface BlockRendererProps {
  block: Block;
  updateBlock: (id: string, properties: any) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, updateBlock }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (block.type === BlockEnum.HEADING || block.type === BlockEnum.FOOTER) {
      updateBlock(block.id, { text: e.target.value });
    } else if (block.type === BlockEnum.QUESTION) {
      updateBlock(block.id, {
        question: {
          ...block.properties.question,
          text: e.target.value,
        },
      });
    }
  };

  if (block.type === BlockEnum.HEADING || block.type === BlockEnum.FOOTER) {
    return (
      <input
        type="text"
        value={block.properties.text || ''}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full text-gray-800"
      />
    );
  }

  if (block.type === BlockEnum.QUESTION) {
    return (
      <input
        type="text"
        value={block.properties.question?.text || ''}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full text-gray-800"
      />
    );
  }

  if (block.type === BlockEnum.BUTTON) {
    return <span className="text-gray-800 font-medium">{block.properties.text}</span>;
  }

  return null;
};

export default BlockRenderer;
