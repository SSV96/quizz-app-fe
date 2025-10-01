'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import SidebarBlocks from '@/src/components/sidebar/SidebarBlocks';
import Canvas from '@/src/components/canvas/Canvas';
import PropertiesPanel from '@/src/components/properties/PropertiesPanel';
import { useQuizStore } from '@/src/store/useQuizStore';
import { DroppableAreaEnum, BlockEnum } from '@/src/types';
import { useQuiz } from '../hooks/useQuizzes';
import { LoaderIcon } from 'react-hot-toast';
import { useUndoRedoStore } from '../store/useUndoRedoStore';

export default function QuizEditorPage() {
  const params = useParams();
  const quizId = params?.id as string;

  const { data: quiz, isLoading, isError } = useQuiz(quizId);

  const addBlock = useUndoRedoStore((s) => s.addBlock);
  const reorderBlocks = useUndoRedoStore((s) => s.reorderBlocks);
  const updateBlock = useUndoRedoStore((s) => s.updateBlock);
  const resetBlocks = useUndoRedoStore((s) => s.reset);
  const blocks = useUndoRedoStore((s) => s.present);

  const setSelectedQuiz = useQuizStore((s) => s.setSelectedQuiz);
  const selectedQuiz = useQuizStore((s) => s.selectedQuiz);

  useEffect(() => {
    if (!quiz) return;

    setSelectedQuiz({
      id: quiz.id,
      title: quiz.title,
      published: quiz.published,
    });

    resetBlocks(quiz.blocks || []);
  }, [quiz, setSelectedQuiz, resetBlocks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === DroppableAreaEnum.SIDEBAR &&
      destination.droppableId === DroppableAreaEnum.CANVAS
    ) {
      addBlock(draggableId as BlockEnum, destination.index);
      return;
    }

    if (
      source.droppableId === DroppableAreaEnum.CANVAS &&
      destination.droppableId === DroppableAreaEnum.CANVAS
    ) {
      const newBlocks = Array.from(blocks);
      const [moved] = newBlocks.splice(source.index, 1);
      newBlocks.splice(destination.index, 0, moved);
      reorderBlocks(newBlocks);
    }
  };

  if (isLoading)
    return (
      <div className="p-6">
        <LoaderIcon />
      </div>
    );
  if (isError) return <div className="p-6 text-red-500">Failed to load quiz!</div>;

  if (!selectedQuiz) return <div className="p-6 text-gray-500">Loading quiz...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 h-full overflow-hidden">
        <SidebarBlocks />
        <Canvas updateBlock={updateBlock} />
        <PropertiesPanel updateBlock={updateBlock} />
      </div>
    </DragDropContext>
  );
}
