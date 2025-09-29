'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import SidebarBlocks from '@/src/components/sidebar/SidebarBlocks';
import Canvas from '@/src/components/canvas/Canvas';
import PropertiesPanel from '@/src/components/properties/PropertiesPanel';
import { useQuizStore } from '@/src/store/useQuizStore';
import { DroppableAreaEnum, BlockEnum } from '@/src/types';
import { LocalStorage } from '@/src/utils/localstorage';

export default function QuizEditorPage() {
  const params = useParams();
  const quizId = params?.id as string;

  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuiz = quizzes.find((q) => q.id === quizId);

  const addBlock = useQuizStore((s) => s.addBlock);
  const setSelectedQuiz = useQuizStore((s) => s.setSelectedQuiz);

  useEffect(() => {
    if (quizId) setSelectedQuiz(quizId);
  }, [quizId, setSelectedQuiz]);

  if (!selectedQuiz) {
    return <div className="p-6 text-red-500">Quiz not found!</div>;
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const quizId = useQuizStore.getState().selectedQuizId;
    if (!quizId) return;

    if (
      source.droppableId === DroppableAreaEnum.SIDEBAR &&
      destination.droppableId === DroppableAreaEnum.CANVAS
    ) {
      addBlock(quizId, draggableId as BlockEnum, destination.index);

      return;
    }

    if (
      source.droppableId === DroppableAreaEnum.CANVAS &&
      destination.droppableId === DroppableAreaEnum.CANVAS
    ) {
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
      <div className="flex flex-1 h-full overflow-hidden">
        <SidebarBlocks selectedQuiz={selectedQuiz} />

        <Canvas quiz={selectedQuiz} />

        <PropertiesPanel quiz={selectedQuiz} />
      </div>
    </DragDropContext>
  );
}
