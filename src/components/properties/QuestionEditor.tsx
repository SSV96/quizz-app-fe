'use client';
import React, { useEffect, useState } from 'react';
import { Block, BlockEnum, QuestionKindEnum } from '../../types';
import { useQuizStore } from '../../store/useQuizStore';
import { TextAnswerEditor } from './TextAnswerEditor';
import { QuestionOptionsEditor } from './QuestionOptionsEditor';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const QuestionEditor = ({ block }: { block: Block }) => {
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const [localQuestion, setLocalQuestion] = useState(block?.properties.question);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION) {
      setLocalQuestion(block.properties.question);
    }
  }, [block]);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION && localQuestion) {
      const timeout = setTimeout(() => {
        updateBlock(block.id, { question: localQuestion });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [localQuestion, block?.id, block?.type, updateBlock]);

  if (!localQuestion) return null;

  const handleKindChange = (e: SelectChangeEvent) => {
    setLocalQuestion({
      ...localQuestion,
      kind: e.target.value as QuestionKindEnum,
      correctOptionIds: [],
    });
  };

  return (
    <>
      <h3 className="font-bold mb-3">Edit Question</h3>
      <p className="font-semibold text-gray-700 mb-3">
        {localQuestion.text || 'Untitled Question'}
      </p>

      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="question-kind-label">Question Type</InputLabel>
        <Select
          labelId="question-kind-label"
          value={localQuestion.kind || QuestionKindEnum.SINGLE}
          onChange={handleKindChange}
          label="Question Type"
        >
          <MenuItem value={QuestionKindEnum.SINGLE}>Single Choice</MenuItem>
          <MenuItem value={QuestionKindEnum.MULTI}>Multiple Choice</MenuItem>
          <MenuItem value={QuestionKindEnum.TEXT}>Text Answer</MenuItem>
        </Select>
      </FormControl>

      {localQuestion.kind !== QuestionKindEnum.TEXT ? (
        <QuestionOptionsEditor localQuestion={localQuestion} setLocalQuestion={setLocalQuestion} />
      ) : (
        <TextAnswerEditor localQuestion={localQuestion} setLocalQuestion={setLocalQuestion} />
      )}
    </>
  );
};
