import React from 'react';
import { TQuizBlock, BlockEnum } from '../types';
import { TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
interface BlockRendererProps {
  block: TQuizBlock;
  updateBlock: (id: string, properties: Partial<TQuizBlock['properties']>) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, updateBlock }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (block.type === BlockEnum.HEADING || block.type === BlockEnum.FOOTER) {
      updateBlock(block.id, {
        text: e.target.value,
      });
    } else if (block.type === BlockEnum.QUESTION) {
      toast.success('iam updatung');
      updateBlock(block.id, {
        ...block.properties,
        title: e.target.value,
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
        value={block.properties.title || ''}
        onChange={handleChange}
        label="Question"
      />
    );
  }

  if (block.type === BlockEnum.BUTTON) {
    return (
      <div className="flex justify-between gap-x-2">
        <Button variant="contained" color="primary" disabled>
          {block.properties.previousLabel}
        </Button>

        <div className="flex justify-between gap-x-2">
          <Button variant="contained" color="primary" disabled>
            {block.properties.nextLabel}
          </Button>

          <Button variant="contained" color="primary" disabled>
            {block.properties.submitLabel}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default BlockRenderer;
