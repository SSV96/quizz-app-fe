'use client';
import React, { FC } from 'react';
import { Delete } from '@mui/icons-material';
import { Button, TextField, IconButton, Radio, Checkbox, Stack } from '@mui/material';
import { QuestionKindEnum, QuestionOption, QuestionPayload } from '../../types';

interface QuestionOptionsEditorProps {
  localQuestion: QuestionPayload;
  setLocalQuestion: React.Dispatch<React.SetStateAction<QuestionPayload | undefined>>;
}

export const QuestionOptionsEditor: FC<QuestionOptionsEditorProps> = ({
  localQuestion,
  setLocalQuestion,
}) => {
  const handleDeleteOption = (optionId: string) => {
    setLocalQuestion({
      ...localQuestion,
      options: localQuestion.options?.filter((o) => o.id !== optionId),
      correctOptionIds: localQuestion.correctOptionIds?.filter((id) => id !== optionId),
    });
  };

  return (
    <>
      <h4 style={{ fontWeight: 600, marginBottom: 8 }}>Options</h4>

      {localQuestion.options?.map((opt: QuestionOption) => (
        <Stack key={opt.id} direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={opt.text}
            onChange={(e) =>
              setLocalQuestion({
                ...localQuestion,
                options: localQuestion.options?.map((o) =>
                  o.id === opt.id ? { ...o, text: e.target.value } : o,
                ),
              })
            }
          />

          {localQuestion.kind === QuestionKindEnum.SINGLE ? (
            <Radio
              checked={localQuestion.correctOptionIds?.[0] === opt.id}
              onChange={() =>
                setLocalQuestion({
                  ...localQuestion,
                  correctOptionIds: [opt.id],
                })
              }
            />
          ) : (
            <Checkbox
              checked={localQuestion.correctOptionIds?.includes(opt.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setLocalQuestion({
                  ...localQuestion,
                  correctOptionIds: checked
                    ? [...(localQuestion.correctOptionIds || []), opt.id]
                    : localQuestion.correctOptionIds?.filter((id) => id !== opt.id),
                });
              }}
            />
          )}

          <IconButton color="error" onClick={() => handleDeleteOption(opt.id)} size="small">
            <Delete />
          </IconButton>
        </Stack>
      ))}

      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ mt: 1 }}
        onClick={() => {
          const optionCount = localQuestion?.options?.length ?? 0;
          setLocalQuestion({
            ...localQuestion,
            options: [
              ...(localQuestion?.options || []),
              {
                id: crypto.randomUUID(),
                text: `Option ${optionCount + 1}`,
              },
            ],
          });
        }}
      >
        + Add Option
      </Button>
    </>
  );
};
