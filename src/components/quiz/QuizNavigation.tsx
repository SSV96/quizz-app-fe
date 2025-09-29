'use client';
import React from 'react';
import { Button } from '@mui/material';
import { ButtonBlock } from '@/src/types';
export const QuizNavigation = ({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSubmit,
  properties,
}: {
  properties: ButtonBlock['properties'];
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) => {
  const { previousLabel, nextLabel, submitLabel } = properties;
  return (
    <div className="flex justify-between mt-6">
      <Button disabled={currentIndex === 0} onClick={onPrev} variant="contained">
        {previousLabel}
      </Button>

      {currentIndex === total - 1 ? (
        <Button onClick={onSubmit} variant="contained" color="success">
          {submitLabel}
        </Button>
      ) : (
        <Button onClick={onNext} variant="contained">
          {nextLabel}
        </Button>
      )}
    </div>
  );
};
