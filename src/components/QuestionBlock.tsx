'use client';
import React from 'react';
import { QuestionKindEnum, QuestionBlock } from '@/src/types';
import { TextQuestion } from './TextQuestion';
import { ChoiceQuestion } from './ChoiceQuestion';
import { useQuizAnswerStore } from '../store/useAnswerStore';

interface QuestionBlockProps {
  block: QuestionBlock;
  index: number;
}

export const QuestionPreviewBlock: React.FC<QuestionBlockProps> = ({ block, index }) => {
  const { answers, setAnswer } = useQuizAnswerStore();
  const q = block.properties;

  const isTextQuestion = q?.kind === QuestionKindEnum.TEXT;

  return (
    <div className="p-4 border rounded shadow-sm bg-gray-50 space-y-4">
      <p className="font-medium">
        Q{index + 1}. {q.title || 'Untitled Question'}
      </p>
      {isTextQuestion ? (
        <TextQuestion
          value={(answers[block.id] as string) || ''}
          onChange={(val) => setAnswer(block.id, val)}
        />
      ) : (
        <ChoiceQuestion
          kind={q.kind}
          options={q.options || []}
          value={answers[block.id]}
          onChange={(val) => setAnswer(block.id, val)}
          blockId={block.id}
        />
      )}
    </div>
  );
};
