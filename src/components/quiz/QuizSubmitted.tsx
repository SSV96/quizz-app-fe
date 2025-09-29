import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleRestart = () => {
    setCurrentIndex(0);
    resetAnswers();
    setIsSubmitted(false);
    setScore(0);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-center space-y-4">
      <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>
      <p className="text-xl mb-6">
        Your Score: {score} / {totalQuestions}
      </p>

      <div className="flex justify-center gap-4">
        <Button onClick={handleRestart} variant="contained" color="primary">
          Restart Quiz
        </Button>

        <Button onClick={handleGoHome} variant="outlined" color="primary">
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default QuizSubmitted;
