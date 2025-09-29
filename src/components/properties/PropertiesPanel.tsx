'use client';
import { BlockEnum, Quiz } from '@/src/types';
import { QuestionEditor } from './QuestionEditor';
import { TextBlockEditor } from './TextBlockEditor';
import { useQuizStore } from '@/src/store/useQuizStore';

export const PropertiesPanel = ({ quiz }: { quiz: Quiz }) => {
  const selectedBlockId = useQuizStore((s) => s.selectedBlockId);
  const block = quiz?.blocks.find((b) => b.id === selectedBlockId);

  if (!block) {
    return (
      <div style={{ width: 320 }} className="p-4 bg-gray-100 flex flex-col h-full">
        <h2>Properties </h2>
        <p className="text-gray-400">Select a block to edit</p>
      </div>
    );
  }

  return (
    <div style={{ width: 320 }} className="bg-gray-100 p-4  flex flex-col justify-between h-full">
      <h2>Properties </h2>
      <div className="flex-1">
        {block.type === BlockEnum.QUESTION ? (
          <QuestionEditor block={block} />
        ) : (
          <TextBlockEditor block={block} />
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
