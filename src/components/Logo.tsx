import React from 'react';
import Image from 'next/image';
const Logo = () => {
  return (
    <>
      <Image src="/quiz-icon.svg" alt="app icon" width={50} height={50} />
      <span className="text-2xl font-bold text-teal-700">Quiz App</span>
    </>
  );
};

export default Logo;
