'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  isHome: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isHome }) => {
  const router = useRouter();

  const handleCreateQuiz = () => {
    router.push(`/quiz/edit`);
  };

  return (
    <nav className="flex flex-row-reverse w-full">
      {isHome && (
        <Button className="!bg-teal-700 !text-white" onClick={handleCreateQuiz}>
          Create Quiz
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
