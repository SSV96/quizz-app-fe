import React, { FC } from 'react';
import { Button, Zoom, FormControlLabel, Switch } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useQuizStore } from '../store/useCanvasStore';
import { Quiz } from '../types/block';

interface SavePublishPanelProps {
  quiz?: Quiz;
}

export const SavePublishPanel: FC<SavePublishPanelProps> = ({ quiz }: { quiz?: Quiz }) => {
  const togglePublishQuiz = useQuizStore((s) => s.togglePublishQuiz);

  return (
    <div className="mt-auto pt-4 border-t flex flex-col gap-3">
      <Zoom in>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={() => useQuizStore.getState().saveQuiz()}
          className="!rounded-xl !px-6 !py-3 shadow-lg"
        >
          Save Quiz
        </Button>
      </Zoom>

      {quiz && (
        <Zoom in>
          <FormControlLabel
            control={
              <Switch
                checked={quiz.published}
                onChange={() => togglePublishQuiz(quiz.id)}
                color="primary"
              />
            }
            label={quiz.published ? 'Published' : 'Draft'}
          />
        </Zoom>
      )}
    </div>
  );
};
