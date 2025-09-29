'use client';
import { QuestionBlock } from '@/src/types';
import React, { ChangeEventHandler, FC } from 'react';
import { TextField } from '@mui/material';

interface IProps {
  selectedQuestion: QuestionBlock;
  onTextAnswerChange: ChangeEventHandler<HTMLInputElement>;
}
export const TextAnswerEditor: FC<IProps> = ({ selectedQuestion, onTextAnswerChange }) => {
  return (
    <TextField
      fullWidth
      size="small"
      label="Answer"
      variant="outlined"
      value={selectedQuestion.properties.textAnswer ?? ''}
      onChange={onTextAnswerChange}
    />
  );
};
