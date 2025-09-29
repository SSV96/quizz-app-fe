'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { BlockEnum, QuestionBlock, QuestionKindEnum } from '@/src/types';
import { useQuizStore } from '@/src/store/useQuizStore';
import { useQuizAnswerStore } from '@/src/store/useAnswerStore';
import QuizNotFound from '@/src/components/quiz/QuizNotFound';
import QuizNotPublished from '@/src/components/quiz/QuizNotPublished';
import QuizSubmitted from '@/src/components/quiz/QuizSubmitted';
import { QuizNavigation } from '@/src/components/quiz/QuizNavigation';
import { QuestionPreviewBlock } from '@/src/components/QuestionBlock';

export default function QuizPreview() {
  const params = useParams();
  const quizId = params?.id as string;

  const quizzes = useQuizStore((s) => s.quizzes);
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);
  const { answers, resetAnswers } = useQuizAnswerStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = quizzes.find((q) => q.id === quizId);

  useEffect(() => {
    if (quizzes.length === 0) loadQuizzes();
    resetAnswers();
  }, [quizzes.length, loadQuizzes, resetAnswers]);

  if (!quiz) {
    return <QuizNotFound />;
  }
  if (!quiz.published) {
    return <QuizNotPublished id={quizId} />;
  }

  const { questionBlocks, headerBlock, footerBlock, buttonBlock } = quiz.blocks.reduce<{
    questionBlocks: QuestionBlock[];
    headerBlock?: (typeof quiz.blocks)[number];
    footerBlock?: (typeof quiz.blocks)[number];
    buttonBlock?: (typeof quiz.blocks)[number];
  }>(
    (acc, block) => {
      switch (block.type) {
        case BlockEnum.QUESTION:
          acc.questionBlocks.push(block as QuestionBlock);
          break;
        case BlockEnum.HEADING:
          acc.headerBlock ??= block;
          break;
        case BlockEnum.FOOTER:
          acc.footerBlock ??= block;
          break;
        case BlockEnum.BUTTON:
          acc.buttonBlock ??= block;
          break;
      }
      return acc;
    },
    { questionBlocks: [] },
  );

  const currentBlock = questionBlocks[currentIndex];

  const handleSubmit = useCallback(() => {
    let correct = 0;

    questionBlocks.forEach((block) => {
      const userAnswer = answers[block.id];
      const q = block.properties;
      const correctIds = q?.correctOptionIds || [];

      switch (q?.kind) {
        case QuestionKindEnum.TEXT:
          const correctText = q.textAnswer?.trim().toLowerCase();
          if (typeof userAnswer === 'string' && userAnswer.trim().toLowerCase() === correctText) {
            correct++;
          }
          break;

        case QuestionKindEnum.SINGLE:
          if (userAnswer === correctIds[0]) correct++;
          break;

        case QuestionKindEnum.MULTI:
          if (
            Array.isArray(userAnswer) &&
            userAnswer.length === correctIds.length &&
            userAnswer.every((id) => correctIds.includes(id))
          ) {
            correct++;
          }
          break;

        default:
          break;
      }
    });

    setScore(correct);
    setIsSubmitted(true);
  }, [answers, questionBlocks]);

  if (isSubmitted) {
    return (
      <QuizSubmitted
        score={score}
        totalQuestions={questionBlocks.length}
        setCurrentIndex={setCurrentIndex}
        resetAnswers={resetAnswers}
        setIsSubmitted={setIsSubmitted}
        setScore={setScore}
      />
    );
  }

  const hasQuestions = questionBlocks.length > 0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title || 'Untitled Quiz'}</h1>

      {hasQuestions ? (
        <>
          <header>{headerBlock?.properties.text}</header>
          <QuestionPreviewBlock block={currentBlock} index={currentIndex} />
          <QuizNavigation
            properties={buttonBlock?.properties}
            currentIndex={currentIndex}
            total={questionBlocks.length}
            onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            onNext={() => setCurrentIndex((i) => Math.min(questionBlocks.length - 1, i + 1))}
            onSubmit={handleSubmit}
          />
          <footer>{footerBlock?.properties.text}</footer>
        </>
      ) : (
        <p className="text-gray-500 text-center">No questions available.</p>
      )}
    </div>
  );
}
