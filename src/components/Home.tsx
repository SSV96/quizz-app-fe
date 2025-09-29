'use client';
import { useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import QuizTable from './quiz/QuizTable';
import QuizsEmptyMessage from './quiz/QuizsEmptyMessage';

const Home = () => {
  const quizzes = useQuizStore((s) => s.quizzes);

  useEffect(() => {
    useQuizStore.getState().loadQuizzes();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-row-reverse mb-8"></div>
      {quizzes.length === 0 ? <QuizsEmptyMessage /> : <QuizTable quizzes={quizzes} />}
    </div>
  );
};

export default Home;
