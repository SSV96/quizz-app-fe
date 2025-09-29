'use client';
import React from 'react';
import { QuestionKindEnum } from '@/src/types/block';

export const ChoiceQuestion = ({
  kind,
  options,
  value,
  onChange,
  blockId,
}: {
  kind: QuestionKindEnum;
  options: { id: string; text: string }[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  blockId: string;
}) => {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isMulti = kind === QuestionKindEnum.MULTI;
        const checked = Array.isArray(value) ? value.includes(opt.id) : value === opt.id;

        return (
          <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type={isMulti ? 'checkbox' : 'radio'}
              name={blockId}
              value={opt.id}
              checked={checked}
              onChange={(e) => {
                if (isMulti) {
                  const prev = Array.isArray(value) ? value : [];
                  if (e.target.checked) {
                    onChange([...prev, opt.id]);
                  } else {
                    onChange(prev.filter((id) => id !== opt.id));
                  }
                } else {
                  onChange(opt.id);
                }
              }}
            />
            <span>{opt.text || 'Untitled Option'}</span>
          </label>
        );
      })}
    </div>
  );
};
