'use client';
import React from 'react';
import { TextField } from '@mui/material';

interface TextQuestionProps {
  value: string;
  onChange: (val: string) => void;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      label="Your Answer"
      placeholder="Enter your answer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
