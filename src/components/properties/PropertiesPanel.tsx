'use client';
import { BlockEnum, ButtonBlock, QuestionBlock, Quiz, TextBlock } from '@/src/types';
import { QuestionEditor } from './QuestionEditor';
import { TextBlockEditor } from './TextBlockEditor';
import { useQuizStore } from '@/src/store/useQuizStore';
import ButtonProperties from './ButtonProperties';

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

  const isQuestionBlock = block?.type === BlockEnum.QUESTION;
  const isButtonBlock = block?.type === BlockEnum.BUTTON;
  const isTextBlockEditor = block?.type === BlockEnum.HEADING || block?.type === BlockEnum.FOOTER;

  return (
    <div style={{ width: 320 }} className="bg-gray-100 p-4  flex flex-col justify-between h-full">
      <h2>Properties </h2>
      <div className="flex-1">
        {isQuestionBlock && <QuestionEditor block={block as QuestionBlock} />}
        {isButtonBlock && <ButtonProperties block={block as ButtonBlock} />}
        {isTextBlockEditor && <TextBlockEditor block={block as TextBlock} />}
      </div>
    </div>
  );
};

export default PropertiesPanel;
