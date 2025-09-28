'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BlockEnum, QuestionKindEnum } from '@/src/types/block';
import { useQuizAnswerStore, useQuizStore } from '@/src/store/useCanvasStore';
import QuizNotFound from '@/src/components/QuizNotFound';
import QuizNotPublished from '@/src/components/QuizNotPublished';
import QuizSubmitted from '@/src/components/QuizSubmitted';

export default function QuizPreview() {
  const params = useParams();
  const quizId = params?.id as string;
  const quizzes = useQuizStore((s) => s.quizzes);
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);
  const { answers, setAnswer, resetAnswers } = useQuizAnswerStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizzes.length === 0) {
      loadQuizzes();
    }
    resetAnswers();
  }, [quizzes.length, loadQuizzes, resetAnswers]);

  const quiz = quizzes.find((q) => q.id === quizId);

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
      const correctIds = block.properties.question?.correctOptionIds || [];

      if (block.properties.question?.kind === QuestionKindEnum.TEXT) {
        const correctText = block.properties.question?.textAnswer?.trim().toLowerCase();
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
      } else if (block.properties.question?.kind === QuestionKindEnum.SINGLE) {
        if (userAnswer === correctIds[0]) {
          correct++;
        }
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{quiz.title || 'Untitled Quiz'}</h1>

      {currentBlock ? (
        <div className="space-y-6">
          <div className="p-4 border rounded shadow-sm bg-gray-50">
            <p className="font-medium mb-4">
              Q{currentIndex + 1}. {currentBlock.properties.question?.text || 'Untitled Question'}
            </p>

            {currentBlock.properties.question?.kind !== QuestionKindEnum.TEXT ? (
              <div className="space-y-2">
                {currentBlock.properties.question?.options?.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type={
                        currentBlock.properties.question?.kind === QuestionKindEnum.MULTI
                          ? 'checkbox'
                          : 'radio'
                      }
                      name={currentBlock.id}
                      value={opt.id}
                      checked={
                        Array.isArray(answers[currentBlock.id])
                          ? answers[currentBlock.id].includes(opt.id)
                          : answers[currentBlock.id] === opt.id
                      }
                      onChange={(e) => {
                        if (currentBlock.properties.question?.kind === QuestionKindEnum.MULTI) {
                          const prev = (answers[currentBlock.id] as string[]) || [];
                          if (e.target.checked) {
                            setAnswer(currentBlock.id, [...prev, opt.id]);
                          } else {
                            setAnswer(
                              currentBlock.id,
                              prev.filter((id) => id !== opt.id),
                            );
                          }
                        } else {
                          setAnswer(currentBlock.id, opt.id);
                        }
                      }}
                    />
                    <span>{opt.text || 'Untitled Option'}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder="Enter your answer"
                value={(answers[currentBlock.id] as string) || ''}
                onChange={(e) => setAnswer(currentBlock.id, e.target.value)}
                className="border px-3 py-2 rounded w-full"
              />
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            {currentIndex === blocks.length - 1 ? (
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No questions available.</p>
      )}
    </div>
  );
}
