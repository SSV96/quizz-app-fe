'use client';
import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { QuestionBlock, QuestionKindEnum } from '../../types';
import { useQuizStore } from '../../store/useQuizStore';
import { TextAnswerEditor } from './TextAnswerEditor';
import { QuestionOptionsEditor } from './QuestionOptionsEditor';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface QuestionEditorProps {
  block: QuestionBlock;
}
type TQuestionProperties = QuestionBlock['properties'];

export const QuestionEditor: FC<QuestionEditorProps> = ({ block }) => {
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const { id, properties } = block;

  if (!block) {
    return;
  }

  const selectedQuestionKind = properties.kind ?? QuestionKindEnum.SINGLE;

  const handleQuestionKindChange = (e: SelectChangeEvent) => {
    updateBlock(id, { ...properties, kind: e.target.value as QuestionKindEnum });
  };

  const handleTextAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...properties, textAnswer: e.target.value });
  };

  const handleOptionAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...properties, textAnswer: e.target.value });
  };

  const optionCount = properties?.options?.length ?? 0;
  const handleAddNewOption = () => {
    updateBlock(id, {
      ...properties,
      options: [
        ...(properties.options ?? []),
        {
          id: crypto.randomUUID(),
          text: `Option ${optionCount + 1}`,
        },
      ],
    });
  };

  const handleOptionChange = (
    options?: TQuestionProperties['options'],
    correctOptionIds?: TQuestionProperties['correctOptionIds'],
  ) => {
    updateBlock(id, {
      ...properties,
      options: [...(options ?? properties.options ?? [])],
      correctOptionIds: [...(correctOptionIds ?? properties.correctOptionIds ?? [])],
    });
  };

  const isTextQuestion = selectedQuestionKind === QuestionKindEnum.TEXT;

  return (
    <>
      <h3 className="font-bold mb-3">Edit Question</h3>
      <p className="font-semibold text-gray-700 mb-3">{properties.title || 'Untitled Question'}</p>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="question-kind-label">Question Type</InputLabel>
        <Select
          labelId="question-kind-label"
          value={selectedQuestionKind}
          onChange={handleQuestionKindChange}
          label="Question Type"
        >
          <MenuItem value={QuestionKindEnum.SINGLE}>Single Choice</MenuItem>
          <MenuItem value={QuestionKindEnum.MULTI}>Multiple Choice</MenuItem>
          <MenuItem value={QuestionKindEnum.TEXT}>Text Answer</MenuItem>
        </Select>
      </FormControl>

      {isTextQuestion ? (
        <TextAnswerEditor selectedQuestion={block} onTextAnswerChange={handleTextAnswerChange} />
      ) : (
        <QuestionOptionsEditor
          selectedQuestion={block}
          onAddOption={handleAddNewOption}
          onOptionChange={handleOptionChange}
        />
      )}
    </>
  );
};
