'use client';
import { Button, TextField } from '@mui/material';
import { useQuizStore } from '../store/useQuizStore';
import { useUndoRedoStore } from '../store/useUndoRedoStore';
import { SavePublishPanel } from './SavePublishPanel';

const QuizEditorHeader = () => {
  const selectedQuiz = useQuizStore((s) => s.selectedQuiz);

  const past = useUndoRedoStore((s) => s.past);
  const future = useUndoRedoStore((s) => s.future);
  const canUndo = useUndoRedoStore((s) => s.canUndo);
  const canRedo = useUndoRedoStore((s) => s.canRedo);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  if (!selectedQuiz) return null;

  const handleTitleChange = (newTitle: string) => {
    useQuizStore.setState((state) => ({
      selectedQuiz: state.selectedQuiz
        ? { ...state.selectedQuiz, title: newTitle }
        : state.selectedQuiz,
    }));
  };

  const totalSteps = past.length + 1 + future.length;
  const currentStep = past.length + 1;

  return (
    <nav className="flex flex-row w-full items-center gap-4 p-2 bg-white shadow-sm">
      <TextField
        label="Quiz Title"
        variant="outlined"
        value={selectedQuiz.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        sx={{ width: 256 }}
      />

      <div className="flex gap-2 items-center">
        <Button onClick={undo} disabled={!canUndo} variant="outlined">
          Undo
        </Button>
        <Button onClick={redo} disabled={!canRedo} variant="outlined">
          Redo
        </Button>
        <span className="text-gray-500 text-sm">
          Step {currentStep} / {totalSteps}
        </span>
      </div>

      <SavePublishPanel />
    </nav>
  );
};

export default QuizEditorHeader;
