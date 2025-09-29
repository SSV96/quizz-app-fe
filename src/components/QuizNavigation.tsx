'use client';
import React from 'react';

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
      <button
        disabled={currentIndex === 0}
        onClick={onPrev}
        className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      {currentIndex === total - 1 ? (
        <button onClick={onSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
          Submit Quiz
        </button>
      ) : (
        <button onClick={onNext} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next
        </button>
      )}
    </div>
  );
};
