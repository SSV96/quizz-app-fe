'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TextField } from '@mui/material';
import Logo from './Logo';
import Navbar from './Navbar';
import { useQuizStore } from '@/src/store/useQuizStore';
import { useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const quiz = useQuizStore((s) => s.quizzes.find((q) => q.id === s.selectedQuizId));
  const [title, setTitle] = useState(quiz?.title || '');

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);

    const updatedQuizzes = useQuizStore
      .getState()
      .quizzes.map((q) =>
        q.id === quiz?.id ? { ...q, title: newTitle, updatedAt: new Date().toISOString() } : q,
      );

    useQuizStore.setState({ quizzes: updatedQuizzes });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {!isHome && (
            <TextField
              label="Quiz Title"
              variant="outlined"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              sx={{ width: 256 }}
            />
          )}
        </div>

        <Navbar isHome={isHome} quiz={quiz} />
      </div>
    </header>
  );
};

export default Header;
