import { Home } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const QuizNotFound: FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="p-8 text-center text-red-500">
      Quiz not found!
      <Button onClick={handleGoHome} variant="contained" className="underline" endIcon={<Home />}>
        Go back home
      </Button>
    </div>
  );
};

export default QuizNotFound;
