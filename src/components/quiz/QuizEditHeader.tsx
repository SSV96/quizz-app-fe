import React, { useState } from 'react';
import { SavePublishPanel } from '../SavePublishPanel';
import Link from 'next/link';
import { TextField } from '@mui/material';
import { useQuizStore } from '@/src/store/useQuizStore';

const QuizEditHeader = () => {
  const quiz = useQuizStore((s) => s.quizzes.find((q) => q.id === s.selectedQuizId));
  const [title, setTitle] = useState(quiz?.title || '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);

    if (!quiz) return;

    const updatedQuizzes = useQuizStore
      .getState()
      .quizzes.map((q) =>
        q.id === quiz.id ? { ...q, title: newTitle, updatedAt: new Date().toISOString() } : q,
      );

    useQuizStore.setState({ quizzes: updatedQuizzes });
  };

  return (
    <div className="flex justify-between pb-2">
      <TextField
        label="Quiz Title"
        variant="outlined"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        className="w-64"
      />
      <SavePublishPanel quiz={quiz} />
    </div>
  );
};

export default QuizEditHeader;
