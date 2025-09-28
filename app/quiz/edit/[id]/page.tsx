"use client";
import React, { useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import SidebarBlocks from "../../../@components/SidebarBlocks";
import Canvas from "../../../@components/Canvas";
import PropertiesPanel from "../../../@components/PropertiesPanel";
import { useQuizStore } from "../../../@store/useCanvasStore";
import { LocalStorage } from "../../../@utils/localstorage";
import { useParams } from "next/navigation";
import { BlockType } from "@/app/@types/block";

export default function QuizEditor() {
  const params = useParams();
  const quizId = params?.id as string;

  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedQuiz = quizzes.find((q) => q.id === quizId);

  const addBlock = useQuizStore((s) => s.addBlock);
  const setSelectedQuiz = useQuizStore((s) => s.setSelectedQuiz);
  const publishQuiz = useQuizStore((s) => s.publishQuiz);

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

    if (
      source.droppableId === "SIDEBAR" &&
      destination.droppableId === "CANVAS"
    ) {
      addBlock(quizId, draggableId as BlockType);
      return;
    }

    if (
      source.droppableId === "CANVAS" &&
      destination.droppableId === "CANVAS"
    ) {
      const quizzes = useQuizStore.getState().quizzes;
      const quiz = quizzes.find((q) => q.id === quizId);
      if (!quiz) return;

      const reordered = Array.from(quiz.blocks);
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);

      const updatedQuizzes = quizzes.map((q) =>
        q.id === quizId ? { ...q, blocks: reordered } : q
      );

      LocalStorage.saveQuizzes(updatedQuizzes);
      useQuizStore.setState({ quizzes: updatedQuizzes });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        <SidebarBlocks />

        <Canvas />

        <PropertiesPanel />

        <div className="absolute bottom-6 right-6 flex gap-4">
          <button
            onClick={() => useQuizStore.getState().saveQuiz()}
            className="px-6 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            Save Quiz
          </button>

          <button
            onClick={() => publishQuiz(selectedQuiz.id)}
            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Publish Quiz
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}
