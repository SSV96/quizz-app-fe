'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Navbar from './Navbar';
import QuizEditorHeader from './QuizEditorHeader';

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isQuizEditor = pathname.match('/quiz/edit');

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {isHome && <Navbar isHome={isHome} />}

        {isQuizEditor && <QuizEditorHeader />}
      </div>
    </header>
  );
};

export default Header;
