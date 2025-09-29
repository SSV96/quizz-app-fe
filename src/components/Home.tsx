'use client';
import { useEffect } from 'react';
import { useQuizStore } from '../store/useCanvasStore';
import QuizTable from './QuizTable';
import Heading from './Heading';
import QuizsEmptyMessage from './QuizsEmptyMessage';

const Home = () => {
  const quizzes = useQuizStore((s) => s.quizzes);

  useEffect(() => {
    useQuizStore.getState().loadQuizzes();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Heading />
      </div>
      {quizzes.length === 0 ? <QuizsEmptyMessage /> : <QuizTable quizzes={quizzes} />}
    </div>
  );
};

export default Home;
