'use client';
import { useEffect, FC } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useQuizStore } from '../store/useCanvasStore';
import { Quiz } from '../types/block';
import QuizTableRow from './QuizTableRow';

interface QuizTableProps {
  quizzes: Quiz[];
}

const QuizTable: FC<QuizTableProps> = ({ quizzes }) => {
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  return (
    <Table>
      <TableHead>
        <TableRow className="bg-gray-100">
          <TableCell className="font-bold">Title</TableCell>
          <TableCell className="font-bold">Last Updated</TableCell>
          <TableCell className="font-bold">Status</TableCell>
          <TableCell className="font-bold text-right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <QuizTableRow quizzes={quizzes} />
      </TableBody>
    </Table>
  );
};

export default QuizTable;
