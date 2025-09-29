import { motion } from 'framer-motion';
import React from 'react';

const QuizsEmptyMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center text-gray-500 mt-20"
    >
      <p className="text-lg text-gray-600">
        No quizzes available. Please add a quiz to get started.
      </p>
    </motion.div>
  );
};

export default QuizsEmptyMessage;
