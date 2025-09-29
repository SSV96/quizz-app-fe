'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlockEnum, QuestionKindEnum } from '@/src/types';
import { useQuizStore } from '@/src/store/useQuizStore';
import QuizNotFound from '@/src/components/quiz/QuizNotFound';
import QuizNotPublished from '@/src/components/quiz/QuizNotPublished';
import QuizSubmitted from '@/src/components/quiz/QuizSubmitted';
import { QuizNavigation } from '@/src/components/quiz/QuizNavigation';
import { QuestionBlock } from '@/src/components/QuestionBlock';
import { useQuizAnswerStore } from '@/src/store/useAnswerStore';

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
    if (quizzes.length === 0) {
      loadQuizzes();
    }
    resetAnswers();
  }, [quizzes.length, loadQuizzes, resetAnswers]);

  if (!quiz) {
    return <QuizNotFound />;
  }

  if (!quiz.published) {
    return <QuizNotPublished id={quizId} />;
  }

  const blocks = quiz.blocks.filter((b) => b.type === BlockEnum.QUESTION);
  const currentBlock = blocks[currentIndex];

  const handleSubmit = () => {
    let correct = 0;

    blocks.forEach((block) => {
      const userAnswer = answers[block.id];
      const q = block.properties.question;
      const correctIds = q?.correctOptionIds || [];

      if (q?.kind === QuestionKindEnum.TEXT) {
        const correctText = q.textAnswer?.trim().toLowerCase();
        if (typeof userAnswer === 'string' && userAnswer.trim().toLowerCase() === correctText) {
          correct++;
        }
      } else if (Array.isArray(userAnswer)) {
        if (
          userAnswer.length === correctIds.length &&
          userAnswer.every((id) => correctIds.includes(id))
        ) {
          correct++;
        }
      } else if (q?.kind === QuestionKindEnum.SINGLE) {
        if (userAnswer === correctIds[0]) correct++;
      }
    });
    setScore(correct);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <QuizSubmitted
        score={score}
        totalQuestions={blocks.length}
        setCurrentIndex={setCurrentIndex}
        resetAnswers={resetAnswers}
        setIsSubmitted={setIsSubmitted}
        setScore={setScore}
      />
    );
  }

  let content: React.ReactNode;

  if (currentBlock) {
    content = (
      <>
        <QuestionBlock block={currentBlock} index={currentIndex} />
        <QuizNavigation
          currentIndex={currentIndex}
          total={blocks.length}
          onPrev={() => setCurrentIndex((i) => i - 1)}
          onNext={() => setCurrentIndex((i) => i + 1)}
          onSubmit={handleSubmit}
        />
      </>
    );
  } else {
    content = <p className="text-gray-500 text-center">No questions available.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title || 'Untitled Quiz'}</h1>
      {content}
    </div>
  );
}
