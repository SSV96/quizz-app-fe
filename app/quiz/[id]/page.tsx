'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  BlockEnum,
  IButtonBlock,
  ITextBlock,
  IQuestionBlock,
  QuestionKindEnum,
  TQuizBlock,
} from '@/src/types';
import { useQuizAnswerStore } from '@/src/store/useAnswerStore';
import QuizNotFound from '@/src/components/quiz/QuizNotFound';
import QuizNotPublished from '@/src/components/quiz/QuizNotPublished';
import QuizSubmitted from '@/src/components/quiz/QuizSubmitted';
import { QuizNavigation } from '@/src/components/quiz/QuizNavigation';
import { QuestionPreviewBlock } from '@/src/components/QuestionBlock';
import { useQuiz } from '@/src/hooks/useQuizzes';
import { LoaderIcon } from 'react-hot-toast';

export default function QuizPreview() {
  const params = useParams();
  const quizId = params?.id as string;

  const { data: quiz, isLoading, isError } = useQuiz(quizId);
  const { answers, resetAnswers } = useQuizAnswerStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetAnswers();
    setCurrentIndex(0);
    setIsSubmitted(false);
    setScore(0);
  }, [quiz?.id, resetAnswers]);

  const isQuestionBlock = (b: TQuizBlock): b is IQuestionBlock => b.type === BlockEnum.QUESTION;

  const isButtonBlock = (b: TQuizBlock): b is IButtonBlock => b.type === BlockEnum.BUTTON;

  const { questionBlocks, headerBlock, footerBlock, buttonBlock } = useMemo(() => {
    const acc: {
      questionBlocks: IQuestionBlock[];
      headerBlock?: ITextBlock;
      footerBlock?: ITextBlock;
      buttonBlock?: IButtonBlock;
    } = { questionBlocks: [] };

    quiz?.blocks.forEach((block: TQuizBlock) => {
      if (isQuestionBlock(block)) {
        acc.questionBlocks.push(block);
      } else if (block.type === BlockEnum.HEADING) {
        acc.headerBlock ??= block as ITextBlock;
      } else if (block.type === BlockEnum.FOOTER) {
        acc.footerBlock ??= block as ITextBlock;
      } else if (isButtonBlock(block)) {
        acc.buttonBlock ??= block;
      }
    });

    return acc;
  }, [quiz?.blocks]);

  const currentBlock = useMemo(() => questionBlocks[currentIndex], [questionBlocks, currentIndex]);

  const handleSubmit = useCallback(() => {
    let correct = 0;

    questionBlocks.forEach((block) => {
      const userAnswer = answers[block.id];
      const q = block.properties;
      const correctIds = q?.correctOptionIds || [];

      switch (q?.kind) {
        case QuestionKindEnum.TEXT:
          if (
            typeof userAnswer === 'string' &&
            userAnswer.trim().toLowerCase() === q.textAnswer?.trim().toLowerCase()
          ) {
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

  if (isLoading) {
    return <LoaderIcon />;
  }

  if (isError) {
    return <div className="p-6 text-center text-red-500">Failed to load quiz</div>;
  }

  if (!quiz) {
    return <QuizNotFound />;
  }

  if (!quiz.published) {
    return <QuizNotPublished id={quizId} />;
  }

  const hasQuestions = questionBlocks.length > 0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title || 'Untitled Quiz'}</h1>

      {hasQuestions ? (
        <>
          {headerBlock?.properties.text && (
            <p className="mb-4">{headerBlock.properties.text || 'Lets Play Quiz'}</p>
          )}

          <QuestionPreviewBlock block={currentBlock} index={currentIndex} />
          <QuizNavigation
            properties={buttonBlock?.properties}
            currentIndex={currentIndex}
            total={questionBlocks.length}
            onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            onNext={() => setCurrentIndex((i) => Math.min(questionBlocks.length - 1, i + 1))}
            onSubmit={handleSubmit}
          />

          {footerBlock?.properties.text && (
            <p className="mt-4">{footerBlock.properties.text || 'Quizz App is Best'}</p>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">No questions available.</p>
      )}
    </div>
  );
}
