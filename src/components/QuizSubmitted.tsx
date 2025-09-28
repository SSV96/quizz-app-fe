import React from 'react';

interface QuizSubmittedProps {
  score: number;
  totalQuestions: number;
  setCurrentIndex: (index: number) => void;
  resetAnswers: () => void;
  setIsSubmitted: (submitted: boolean) => void;
  setScore: (score: number) => void;
}

const QuizSubmitted: React.FC<QuizSubmittedProps> = ({
  score,
  totalQuestions,
  setCurrentIndex,
  resetAnswers,
  setIsSubmitted,
  setScore,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>
      <p className="text-xl mb-6">
        Your Score: {score} / {totalQuestions}
      </p>
      <button
        onClick={() => {
          setCurrentIndex(0);
          resetAnswers();
          setIsSubmitted(false);
          setScore(0);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizSubmitted;
