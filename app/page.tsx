'use client';
import { useQuizStore } from './@store/useCanvasStore';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomePage() {
  const quizzes = useQuizStore((s) => s.quizzes);
  const deleteQuiz = useQuizStore((s) => s.deleteQuiz);
  const loadQuizzes = useQuizStore((s) => s.loadQuizzes);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Quizzes</h1>
      </div>

      {quizzes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-gray-500 mt-20"
        >
          <p className="text-lg">No quizzes yet. Start by creating one 🚀</p>
        </motion.div>
      ) : (
        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardContent className="p-0">
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
                {quizzes.map((quiz, index) => (
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          quiz.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
