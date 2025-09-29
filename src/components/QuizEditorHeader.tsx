import React, { useState } from 'react';
import { SavePublishPanel } from './SavePublishPanel';
import { TextField } from '@mui/material';
import { useQuizStore } from '../store/useQuizStore';

const QuizEditorHeader = () => {
  const quiz = useQuizStore((s) => s.quizzes.find((q) => q.id === s.selectedQuizId));
  const [title, setTitle] = useState(quiz?.title || '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);

    const updatedQuizzes = useQuizStore
      .getState()
      .quizzes.map((q) =>
        q.id === quiz?.id ? { ...q, title: newTitle, updatedAt: new Date().toISOString() } : q,
      );

    useQuizStore.setState({ quizzes: updatedQuizzes });
  };
  return (
    <nav className="flex flex-row w-full">
      <TextField
        label="Quiz Title"
        variant="outlined"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        sx={{ width: 256 }}
      />
      <SavePublishPanel quiz={quiz} />
    </nav>
  );
};

export default QuizEditorHeader;
