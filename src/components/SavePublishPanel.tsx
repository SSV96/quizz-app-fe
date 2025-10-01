'use client';
import React, { FC, useEffect } from 'react';
import { Button, Zoom } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Flag } from '@mui/icons-material';
import cn from 'classnames';
import { usePublishQuiz, useUpdateQuiz } from '../hooks/useQuizzes';
import { useQuizStore } from '../store/useQuizStore';
import toast from 'react-hot-toast';

export const SavePublishPanel: FC = () => {
  const selectedQuiz = useQuizStore((s) => s.selectedQuiz);

  const saveQuizToBE = useQuizStore((s) => s.saveQuizToBE);

  const { mutate: publishQuizMutation, isPending: isPublishPending } = usePublishQuiz(
    selectedQuiz?.id ?? '',
  );
  const { mutate: updateQuizFn, isPending: isUpdatePending } = useUpdateQuiz();

  if (!selectedQuiz) return null;

  const handleSave = () => {
    if (!updateQuizFn) return;

    saveQuizToBE(updateQuizFn);
  };

  const handlePublishToggle = () => {
    if (!selectedQuiz) return;
    if (selectedQuiz.published) {
      toast.success('Quiz already published');
      return;
    }
    publishQuizMutation();
  };

  return (
    <div className="flex justify-end w-full gap-2">
      <Zoom in>
        <Button
          variant="contained"
          color="inherit"
          disabled={selectedQuiz.published || isPublishPending}
          onClick={handlePublishToggle}
          className={cn('flex items-center gap-1 !rounded-md !px-2 !py-3 shadow-lg', {
            '!bg-green-500 !hover:bg-green-600 !text-white': selectedQuiz.published,
            '!bg-gray-400 !hover:bg-gray-500 !text-white': !selectedQuiz.published,
          })}
        >
          <Flag />
          <span className="inline-block w-20 text-center">
            {selectedQuiz.published ? 'Published' : 'Draft'}
          </span>
        </Button>
      </Zoom>

      <Zoom in>
        <Button
          variant="contained"
          color="success"
          disabled={isUpdatePending}
          startIcon={<SaveIcon />}
          onClick={handleSave}
          className="!rounded-md !px-2 !py-3 shadow-lg"
        >
          {isUpdatePending ? 'Saving...' : 'Save Quiz'}
        </Button>
      </Zoom>
    </div>
  );
};
