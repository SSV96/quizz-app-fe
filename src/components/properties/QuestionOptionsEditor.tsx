'use client';
import React from 'react';
import { Delete } from '@mui/icons-material';
import { QuestionKindEnum } from '../../types/block';

export const QuestionOptionsEditor = ({
  localQuestion,
  setLocalQuestion,
}: {
  localQuestion: any;
  setLocalQuestion: (fn: any) => void;
}) => {
  const handleDeleteOption = (optionId: string) => {
    setLocalQuestion({
      ...localQuestion,
      options: localQuestion.options?.filter((o: any) => o.id !== optionId),
      correctOptionIds: localQuestion.correctOptionIds?.filter((id: string) => id !== optionId),
    });
  };

  return (
    <>
      <h4 className="font-semibold mb-2">Options</h4>
      {localQuestion.options?.map((opt: any) => (
        <div key={opt.id} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={opt.text}
            onChange={(e) =>
              setLocalQuestion({
                ...localQuestion,
                options: localQuestion.options?.map((o: any) =>
                  o.id === opt.id ? { ...o, text: e.target.value } : o,
                ),
              })
            }
            className="flex-1 border px-3 py-1 rounded"
          />
          {localQuestion.kind === QuestionKindEnum.SINGLE ? (
            <input
              type="radio"
              name="correct"
              checked={localQuestion.correctOptionIds?.[0] === opt.id}
              onChange={() =>
                setLocalQuestion({
                  ...localQuestion,
                  correctOptionIds: [opt.id],
                })
              }
            />
          ) : (
            <input
              type="checkbox"
              checked={localQuestion.correctOptionIds?.includes(opt.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setLocalQuestion({
                  ...localQuestion,
                  correctOptionIds: checked
                    ? [...(localQuestion.correctOptionIds || []), opt.id]
                    : localQuestion.correctOptionIds?.filter((id: string) => id !== opt.id),
                });
              }}
            />
          )}
          <button
            onClick={() => handleDeleteOption(opt.id)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Delete />
          </button>
        </div>
      ))}

      <button
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
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
      </button>
    </>
  );
};
