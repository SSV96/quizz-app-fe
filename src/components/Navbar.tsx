'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SavePublishPanel } from './SavePublishPanel';
import { Quiz } from '@/src/types';

interface NavbarProps {
  isHome: boolean;
  quiz?: Quiz;
}

const Navbar: React.FC<NavbarProps> = ({ isHome, quiz }) => {
  const router = useRouter();

  const handleCreateQuiz = () => {
    router.push(`/quiz/edit`);
  };

  return (
    <div>
      {isHome ? (
        <Button className="!bg-teal-700 !text-white" onClick={handleCreateQuiz}>
          Create Quiz
        </Button>
      ) : (
        <SavePublishPanel quiz={quiz} />
      )}
    </div>
  );
};

export default Navbar;
