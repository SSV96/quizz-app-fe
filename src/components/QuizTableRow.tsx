import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Quiz } from '../types/block';
import { TableCell, Tooltip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { useQuizStore } from '../store/useCanvasStore';
import clsx from 'classnames';
interface QuizTableRowProps {
  quizzes: Quiz[];
}

const QuizTableRow: FC<QuizTableRowProps> = ({ quizzes }) => {
  const deleteQuiz = useQuizStore((s) => s.deleteQuiz);

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
          className={clsx(
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
            <IconButton color="error" onClick={() => deleteQuiz(quiz.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell>
    </motion.tr>
  ));
};
export default QuizTableRow;
