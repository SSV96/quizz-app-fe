'use client';
import React, { ChangeEvent, FC } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, TextField, IconButton, Radio, Checkbox, Stack } from '@mui/material';
import { QuestionBlock, QuestionKindEnum, QuestionOption } from '../../types';

type TQuestionProperties = QuestionBlock['properties'];
interface QuestionOptionsEditorProps {
  selectedQuestion: QuestionBlock;
  onAddOption: VoidFunction;
  onOptionChange: (
    options?: TQuestionProperties['options'],
    correctOptionIds?: TQuestionProperties['correctOptionIds'],
  ) => void;
}

export const QuestionOptionsEditor: FC<QuestionOptionsEditorProps> = ({
  selectedQuestion,
  onAddOption,
  onOptionChange,
}) => {
  const handleDeleteOption = (optionId: string) => () => {
    const newOptions = selectedQuestion.properties.options?.filter((o) => o.id !== optionId);
    const newCorrectOptionIds = selectedQuestion.properties.correctOptionIds?.filter(
      (id) => id !== optionId,
    );
    onOptionChange(newOptions, newCorrectOptionIds);
  };

  const handleOptionLabelChange = (optionId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const options = selectedQuestion.properties.options?.map((o) =>
      o.id === optionId ? { ...o, text: e.target.value } : o,
    );
    onOptionChange(options);
  };

  const updateSingleAnswer = (correctIds: string[]) => () => {
    onOptionChange(undefined, correctIds);
  };
  const updateMultipleAnswers = (optionId: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const correctIds = checked
      ? [...(selectedQuestion.properties.correctOptionIds || []), optionId]
      : selectedQuestion.properties.correctOptionIds?.filter((id) => id !== optionId);
    onOptionChange(undefined, correctIds);
  };

  return (
    <>
      <h4 style={{ fontWeight: 600, marginBottom: 8 }}>Options</h4>

      {selectedQuestion.properties.options?.map((opt: QuestionOption) => (
        <Stack key={opt.id} direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={opt.text}
            onChange={handleOptionLabelChange(opt.id)}
          />

          {selectedQuestion.properties.kind === QuestionKindEnum.SINGLE ? (
            <Radio
              checked={selectedQuestion.properties.correctOptionIds?.[0] === opt.id}
              onChange={updateSingleAnswer([opt.id])}
            />
          ) : (
            <Checkbox
              checked={selectedQuestion.properties.correctOptionIds?.includes(opt.id)}
              onChange={updateMultipleAnswers(opt.id)}
            />
          )}

          <IconButton color="error" onClick={handleDeleteOption(opt.id)} size="small">
            <Delete />
          </IconButton>
        </Stack>
      ))}

      <Button variant="contained" color="success" size="small" sx={{ mt: 1 }} onClick={onAddOption}>
        + Add Option
      </Button>
    </>
  );
};
