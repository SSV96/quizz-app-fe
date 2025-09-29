'use client';
import { QuestionPayload } from '@/src/types';
import React from 'react';
import { TextField } from '@mui/material';

export const TextAnswerEditor = ({
  localQuestion,
  setLocalQuestion,
}: {
  localQuestion: QuestionPayload;
  setLocalQuestion: React.Dispatch<React.SetStateAction<QuestionPayload | undefined>>;
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      label="Answer"
      variant="outlined"
      value={localQuestion.textAnswer ?? ''}
      onChange={(e) =>
        setLocalQuestion({
          ...localQuestion,
          textAnswer: e.target.value,
        })
      }
    />
  );
};
