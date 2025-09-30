'use client';
import React, { FC } from 'react';
import { Button } from '@mui/material';
import { IButtonBlock } from '@/src/types';

interface QuizNavigationProps {
  properties?: IButtonBlock['properties'];
  currentIndex: number;
  total: number;
  onPrev: VoidFunction;
  onNext: VoidFunction;
  onSubmit: VoidFunction;
}

export const QuizNavigation: FC<QuizNavigationProps> = ({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSubmit,
  properties,
}) => {
  const { previousLabel, nextLabel, submitLabel } = properties ?? {};

  return (
    <div className="flex justify-between mt-6">
      <Button disabled={currentIndex === 0} onClick={onPrev} variant="contained">
        {previousLabel ?? 'Previous'}
      </Button>

      {currentIndex === total - 1 ? (
        <Button onClick={onSubmit} variant="contained" color="success">
          {submitLabel ?? 'Submit'}
        </Button>
      ) : (
        <Button onClick={onNext} variant="contained">
          {nextLabel ?? 'Next'}
        </Button>
      )}
    </div>
  );
};
