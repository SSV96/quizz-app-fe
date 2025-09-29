'use client';
import React from 'react';

export const TextAnswerEditor = ({
  localQuestion,
  setLocalQuestion,
}: {
  localQuestion: any;
  setLocalQuestion: (fn: any) => void;
}) => {
  return (
    <input
      type="text"
      value={localQuestion.textAnswer ?? ''}
      onChange={(e) =>
        setLocalQuestion({
          ...localQuestion,
          textAnswer: e.target.value,
        })
      }
      className="flex-1 border px-3 py-1 rounded"
    />
  );
};
