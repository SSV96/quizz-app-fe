'use client';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useParams } from 'next/navigation';
import { useQuizStore } from '@/src/store/useCanvasStore';
import SidebarBlocks from '@/src/components/SidebarBlocks';
import Canvas from '@/src/components/Canvas';
import { BlockEnum } from '@/src/types/block';
import { LocalStorage } from '@/src/utils/localstorage';
import { PropertiesPanel } from '@/src/components/properties/PropertiesPanel';

export default function QuizEditor() {
  const params = useParams();
  const quizId = params?.id as string;

  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuiz = quizzes.find((q) => q.id === quizId);

  const addBlock = useQuizStore((s) => s.addBlock);
  const setSelectedQuiz = useQuizStore((s) => s.setSelectedQuiz);

  useEffect(() => {
    if (quizId) {
      setSelectedQuiz(quizId);
    }
  }, [quizId, setSelectedQuiz]);

  if (!selectedQuiz) {
    return <div className="p-6 text-red-500">Quiz not found!</div>;
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const quizId = useQuizStore.getState().selectedQuizId;
    if (!quizId) return;

    if (source.droppableId === 'SIDEBAR' && destination.droppableId === 'CANVAS') {
      addBlock(quizId, draggableId as BlockEnum);
      return;
    }

    if (source.droppableId === 'CANVAS' && destination.droppableId === 'CANVAS') {
      const quizzes = useQuizStore.getState().quizzes;
      const quiz = quizzes.find((q) => q.id === quizId);
      if (!quiz) return;

      const reordered = Array.from(quiz.blocks);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);

      const updatedQuizzes = quizzes.map((q) =>
        q.id === quizId ? { ...q, blocks: reordered } : q,
      );

      LocalStorage.saveQuizzes(updatedQuizzes);
      useQuizStore.setState({ quizzes: updatedQuizzes });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen bg-gray-550">
        <SidebarBlocks />
        <Canvas />
        <PropertiesPanel />
      </div>
    </DragDropContext>
  );
}
