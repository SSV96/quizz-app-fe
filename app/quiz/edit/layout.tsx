'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen  transition-colors">
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col overflow-y-auto p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
