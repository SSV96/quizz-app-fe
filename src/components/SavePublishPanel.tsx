import React, { FC } from 'react';
import { Button, Zoom } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Flag } from '@mui/icons-material';
import cn from 'classnames';
import { IQuiz } from '../types';
import { usePublishedQuiz, useUpdateQuiz } from '../hooks/useQuizzes';

interface SavePublishPanelProps {
  quiz?: Partial<IQuiz>;
}

export const SavePublishPanel: FC<SavePublishPanelProps> = ({ quiz }) => {
  const { mutate } = useUpdateQuiz();
  const { mutate: publishQuizMutation } = usePublishedQuiz();

  if (!quiz) return null;

  const handleSave = () => {
    mutate(quiz);
  };

  const handlePublishToggle = () => {
    publishQuizMutation(quiz?.id || '');
  };

  return (
    <div className="flex justify-end w-full gap-2">
      <Zoom in>
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePublishToggle}
          className={cn('flex items-center gap-1 !rounded-md !px-2 !py-3 shadow-lg', {
            '!bg-green-500 !hover:bg-green-600 !text-white': quiz.published,
            '!bg-gray-400 !hover:bg-gray-500 !text-white': !quiz.published,
          })}
        >
          <Flag />
          <span className="inline-block w-20 text-center">
            {quiz.published ? 'Published' : 'Draft'}
          </span>
        </Button>
      </Zoom>

      <Zoom in>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          className="!rounded-md !px-2 !py-3 shadow-lg"
        >
          Save Quiz
        </Button>
      </Zoom>
    </div>
  );
};
