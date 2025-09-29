import React from 'react';
import { Block, BlockEnum } from '../types';
import { TextField, Button } from '@mui/material';

interface BlockRendererProps {
  block: Block;
  updateBlock: (id: string, properties: Partial<Block['properties']>) => void;
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
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={block.properties.text || ''}
        onChange={handleChange}
        label={block.type === BlockEnum.HEADING ? 'Heading' : 'Footer'}
      />
    );
  }

  if (block.type === BlockEnum.QUESTION) {
    return (
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={block.properties.question?.text || ''}
        onChange={handleChange}
        label="Question"
      />
    );
  }

  if (block.type === BlockEnum.BUTTON) {
    return (
      <Button variant="contained" color="primary" disabled>
        {block.properties.text}
      </Button>
    );
  }

  return null;
};

export default BlockRenderer;
