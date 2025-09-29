'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex overflow-hidden"
      >
        {children}
      </motion.main>
    </div>
  );
}
