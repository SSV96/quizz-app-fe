'use client';
import React from 'react';

export const TextQuestion = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder="Enter your answer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded w-full"
    />
  );
};
