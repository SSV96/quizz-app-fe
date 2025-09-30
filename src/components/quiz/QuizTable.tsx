'use client';
import { FC } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { IQuizSummary } from '../../types';
import QuizTableRow from './QuizTableRow';

interface QuizTableProps {
  quizzes: IQuizSummary[];
}

const QuizTable: FC<QuizTableProps> = ({ quizzes }) => {
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
