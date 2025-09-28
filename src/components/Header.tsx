import Link from 'next/link';
import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image src="quiz-icon.svg" alt="app icon" width={50} height={50} />
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
