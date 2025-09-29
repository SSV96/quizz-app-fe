'use client';
import React from 'react';
import { Block, QuestionKindEnum } from '@/src/types';
import { TextQuestion } from './TextQuestion';
import { ChoiceQuestion } from './ChoiceQuestion';
import { useQuizAnswerStore } from '../store/useAnswerStore';

interface QuestionBlockProps {
  block: Block;
  index: number;
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({ block, index }) => {
  const { answers, setAnswer } = useQuizAnswerStore();
  const q = block.properties.question;

  let QuestionContent: React.ReactNode = null;

  if (q?.kind === QuestionKindEnum.TEXT) {
    QuestionContent = (
      <TextQuestion
        value={(answers[block.id] as string) || ''}
        onChange={(val) => setAnswer(block.id, val)}
      />
    );
  } else if (q) {
    QuestionContent = (
      <ChoiceQuestion
        kind={q.kind}
        options={q.options || []}
        value={answers[block.id]}
        onChange={(val) => setAnswer(block.id, val)}
        blockId={block.id}
      />
    );
  }

  return (
    <div className="p-4 border rounded shadow-sm bg-gray-50 space-y-4">
      <p className="font-medium">
        Q{index + 1}. {q?.text || 'Untitled Question'}
      </p>
      {QuestionContent}
    </div>
  );
};
