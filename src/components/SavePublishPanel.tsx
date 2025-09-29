import React, { FC } from 'react';
import { Button, Zoom } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useQuizStore } from '../store/useQuizStore';
import { Flag } from '@mui/icons-material';
import cx from 'classnames';
import { Quiz } from '../types';

interface SavePublishPanelProps {
  quiz?: Quiz;
}

export const SavePublishPanel: FC<SavePublishPanelProps> = ({ quiz }) => {
  const togglePublishQuiz = useQuizStore((s) => s.togglePublishQuiz);

  return (
    <div className="flex justify-end w-full gap-2">
      {quiz && (
        <Zoom in>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => togglePublishQuiz(quiz.id, !quiz.published)}
            className={cx('flex items-center gap-1 !rounded-md !px-2 !py-3 shadow-lg', {
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
      )}

      <Zoom in>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={() => useQuizStore.getState().saveQuiz()}
          className="!rounded-md !px-2 !py-3 shadow-lg"
        >
          Save Quiz
        </Button>
      </Zoom>
    </div>
  );
};
