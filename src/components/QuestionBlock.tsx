'use client';
import React from 'react';
import { QuestionKindEnum } from '@/src/types/block';
import { useQuizAnswerStore } from '@/src/store/useCanvasStore';
import { TextQuestion } from './TextQuestion';
import { ChoiceQuestion } from './ChoiceQuestion';

export const QuestionBlock = ({ block, index }: { block: any; index: number }) => {
  const { answers, setAnswer } = useQuizAnswerStore();
  const q = block.properties.question;

  return (
    <div className="p-4 border rounded shadow-sm bg-gray-50 space-y-4">
      <p className="font-medium">
        Q{index + 1}. {q?.text || 'Untitled Question'}
      </p>

      {q?.kind === QuestionKindEnum.TEXT ? (
        <TextQuestion
          value={(answers[block.id] as string) || ''}
          onChange={(val) => setAnswer(block.id, val)}
        />
      ) : (
        <ChoiceQuestion
          kind={q?.kind}
          options={q?.options || []}
          value={answers[block.id]}
          onChange={(val) => setAnswer(block.id, val)}
          blockId={block.id}
        />
      )}
    </div>
  );
};
