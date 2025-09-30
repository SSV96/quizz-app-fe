'use client';
import { IQuestionBlock } from '@/src/types';
import React, { ChangeEventHandler, FC } from 'react';
import { TextField } from '@mui/material';

interface ITextAnswerEditorProps {
  selectedQuestion: IQuestionBlock;
  onTextAnswerChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextAnswerEditor: FC<ITextAnswerEditorProps> = ({
  selectedQuestion,
  onTextAnswerChange,
}) => {
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
