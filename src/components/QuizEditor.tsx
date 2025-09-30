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

export default function QuizEditorPage() {
  const params = useParams();
  const quizId = params?.id as string;

  const { data: quiz, isSuccess, isLoading, isError } = useQuiz(quizId);

  const loadCurrentQuiz = useQuizStore((s) => s.loadCurrentQuiz);
  const addBlock = useQuizStore((s) => s.addBlock);
  const selectedQuiz = useQuizStore((s) => s.selectedQuiz);

  useEffect(() => {
    if (isSuccess && quiz) {
      loadCurrentQuiz(quiz);
    }
  }, [isSuccess, quiz, loadCurrentQuiz]);

  if (isLoading)
    return (
      <div className="p-6">
        <LoaderIcon />
      </div>
    );
  if (isError) return <div className="p-6 text-red-500">Failed to load quiz!</div>;
  if (!selectedQuiz) return <div className="p-6 text-red-500">Quiz not found!</div>;

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || !selectedQuiz) return;

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
      const reordered = Array.from(selectedQuiz.blocks);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);

      const reorderedWithOrder = reordered.map((b, i) => ({
        ...b,
        order: i,
        isUpdated: !b.isNew && b.order !== i ? true : b.isUpdated,
      }));

      useQuizStore.setState({
        selectedQuiz: { ...selectedQuiz, blocks: reorderedWithOrder },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 h-full overflow-hidden">
        <SidebarBlocks />
        <Canvas />
        <PropertiesPanel />
      </div>
    </DragDropContext>
  );
}
