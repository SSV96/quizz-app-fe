'use client';
import React from 'react';
import { Button } from '@mui/material';
export const QuizNavigation = ({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSubmit,
}: {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="flex justify-between mt-6">
      <Button disabled={currentIndex === 0} onClick={onPrev} variant="contained">
        Previous
      </Button>

      {currentIndex === total - 1 ? (
        <Button onClick={onSubmit} variant="contained" color="success">
          Submit Quiz
        </Button>
      ) : (
        <Button onClick={onNext} variant="contained">
          Next
        </Button>
      )}
    </div>
  );
};
