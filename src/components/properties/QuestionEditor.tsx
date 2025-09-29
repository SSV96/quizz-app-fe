'use client';
import React, { useEffect, useState } from 'react';
import { BlockEnum, QuestionKindEnum } from '../../types/block';
import { useQuizStore } from '../../store/useCanvasStore';
import { TextAnswerEditor } from './TextAnswerEditor';
import { QuestionOptionsEditor } from './QuestionOptionsEditor';

export const QuestionEditor = ({ block }: { block: any }) => {
  const updateBlock = useQuizStore((s) => s.updateBlock);
  const [localQuestion, setLocalQuestion] = useState(block?.properties.question);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION) {
      setLocalQuestion(block.properties.question);
    }
  }, [block]);

  useEffect(() => {
    if (block?.type === BlockEnum.QUESTION && localQuestion) {
      const timeout = setTimeout(() => {
        updateBlock(block.id, { question: localQuestion });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [localQuestion, block?.id, block?.type, updateBlock]);

  if (!localQuestion) return null;

  return (
    <>
      <h3 className="font-bold mb-3">Edit Question</h3>
      <p className="font-semibold text-gray-700 mb-3">
        {localQuestion.text || 'Untitled Question'}
      </p>

      <label className="block mb-1 font-medium">Question Type</label>
      <select
        value={localQuestion.kind || QuestionKindEnum.SINGLE}
        onChange={(e) =>
          setLocalQuestion({
            ...localQuestion,
            kind: e.target.value as QuestionKindEnum,
            correctOptionIds: [],
          })
        }
        className="w-full border px-3 py-2 rounded mb-3"
      >
        <option value="single">Single Choice</option>
        <option value="multi">Multiple Choice</option>
        <option value="text">Text Answer</option>
      </select>

      {localQuestion.kind !== QuestionKindEnum.TEXT ? (
        <QuestionOptionsEditor localQuestion={localQuestion} setLocalQuestion={setLocalQuestion} />
      ) : (
        <TextAnswerEditor localQuestion={localQuestion} setLocalQuestion={setLocalQuestion} />
      )}
    </>
  );
};
