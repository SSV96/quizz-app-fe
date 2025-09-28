'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '../../@store/useCanvasStore';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';

export default function QuizEditorPage() {
  const router = useRouter();
  const createQuiz = useQuizStore((s) => s.createQuiz);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreateQuiz = () => {
    const quiz = createQuiz(title || 'Untitled Quiz');
    setOpen(false);
    setTitle('');
    router.push(`/quiz/edit/${quiz.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Create a New Quiz
      </h1>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className="!bg-blue-600 !rounded-lg shadow-md hover:shadow-lg transition"
        onClick={() => setOpen(true)}
      >
        New Quiz
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quiz Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" className="!bg-blue-600" onClick={handleCreateQuiz}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
