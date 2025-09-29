'use client';
import { useQuizStore } from '@/src/store/useCanvasStore';
import { BlockEnum } from '@/src/types/block';
import { QuestionEditor } from './QuestionEditor';
import { TextBlockEditor } from './TextBlockEditor';
import { SavePublishPanel } from '../SavePublishPanel';

export const PropertiesPanel = () => {
  const quizzes = useQuizStore((s) => s.quizzes);
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const selectedQuizId = useQuizStore((s) => s.selectedQuizId);

  const quiz = quizzes.find((q) => q.id === selectedQuizId);
  const block = quiz?.blocks.find((b) => b.id === selectedBlockId);

  if (!block) {
    return (
      <div style={{ width: 320 }} className="p-4 border-l bg-white flex flex-col h-full">
        <p className="text-gray-400">Select a block to edit</p>
      </div>
    );
  }

  return (
    <div style={{ width: 320 }} className="p-4 border-l flex flex-col justify-between h-full">
      <div className="flex-1">
        {block.type === BlockEnum.QUESTION ? (
          <QuestionEditor block={block} />
        ) : (
          <TextBlockEditor block={block} />
        )}
      </div>
      <SavePublishPanel quiz={quiz} />
    </div>
  );
};

export default PropertiesPanel;
