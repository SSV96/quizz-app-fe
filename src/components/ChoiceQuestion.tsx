'use client';
import React from 'react';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import { QuestionKindEnum } from '@/src/types';

interface ChoiceQuestionProps {
  kind?: QuestionKindEnum;
  options: { id: string; text: string }[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  blockId: string;
}

export const ChoiceQuestion: React.FC<ChoiceQuestionProps> = ({
  kind,
  options,
  value,
  onChange,
  blockId,
}) => {
  const isMulti = kind === QuestionKindEnum.MULTI;

  if (isMulti) {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          {options.map((opt) => {
            const checked = Array.isArray(value) && value.includes(opt.id);
            return (
              <FormControlLabel
                key={opt.id}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      const prev = Array.isArray(value) ? value : [];
                      if (e.target.checked) {
                        onChange([...prev, opt.id]);
                      } else {
                        onChange(prev.filter((id) => id !== opt.id));
                      }
                    }}
                  />
                }
                label={opt.text || 'Untitled Option'}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    );
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        name={blockId}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id}
            control={<Radio />}
            label={opt.text || 'Untitled Option'}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
