import { SavePublishPanel } from './SavePublishPanel';
import { TextField } from '@mui/material';
import { useQuizStore } from '../store/useQuizStore';
import { FC } from 'react';

const QuizEditorHeader: FC = () => {
  const selectedQuiz = useQuizStore().selectedQuiz;

  const setSelectedQuiz = useQuizStore((s) => s.setSelectedQuiz);

  const handleTitleChange = (newTitle: string) => {
    setSelectedQuiz({
      title: newTitle,
    });
  };

  return (
    <nav className="flex flex-row w-full">
      <TextField
        label="Quiz Title"
        variant="outlined"
        value={selectedQuiz?.title || ''}
        onChange={(e) => handleTitleChange(e.target.value)}
        sx={{ width: 256 }}
      />
      <SavePublishPanel quiz={selectedQuiz || {}} />
    </nav>
  );
};

export default QuizEditorHeader;
