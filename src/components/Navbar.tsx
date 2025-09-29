'use client';
'use client';
import React from 'react';

import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateQuiz = () => {
    router.push(`/quiz/edit`);
  };

  return (
    <nav className="flex space-x-8 items-center">
      {pathname === '/' && (
        <Button className="!bg-green-500 !text-white" onClick={handleCreateQuiz}>
          Create Quiz
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
