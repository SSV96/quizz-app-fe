'use client';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import dayjs from 'dayjs';
import Link from 'next/link';
import { IQuizSummary } from '../../types';
import { TableCell, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { useDeleteQuiz } from '@/src/hooks/useQuizzes';

interface QuizTableRowProps {
  quizzes: IQuizSummary[];
}

const QuizTableRow: FC<QuizTableRowProps> = ({ quizzes }) => {
  const { mutateAsync } = useDeleteQuiz();

  const handleDeleteQuiz = async (id: string) => {
    await mutateAsync(id);
  };

  return quizzes.map((quiz, index) => (
    <motion.tr
      key={quiz.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="border-b"
    >
      <TableCell>{quiz.title || 'Untitled Quiz'}</TableCell>

      <TableCell>
        {quiz.updatedAt ? dayjs(quiz.updatedAt).format('MMM D, YYYY h:mm A') : '—'}
      </TableCell>

      <TableCell>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            quiz.published ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600',
          )}
        >
          {quiz.published ? 'Published' : 'Draft'}
        </span>
      </TableCell>

      <TableCell align="right">
        <div className="flex justify-start gap-2">
          <Tooltip title="Edit Quiz">
            <Link href={`/quiz/edit/${quiz.id}/`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Play Quiz">
            <Link href={`/quiz/${quiz.id}`}>
              <IconButton color="success">
                <PlayCircleIcon />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Delete Quiz">
            <IconButton color="error" onClick={() => handleDeleteQuiz(quiz.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </motion.tr>
  ));
};
export default QuizTableRow;
