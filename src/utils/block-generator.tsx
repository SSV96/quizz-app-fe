import { nanoid } from 'nanoid';
import { BlockEnum, QuestionKindEnum, TQuizBlock } from '@/src/types';

interface GenerateBlockOptions {
  type: BlockEnum;
  order: number;
}

export const generateBlock = ({ type, order }: GenerateBlockOptions): TQuizBlock => {
  switch (type) {
    case BlockEnum.QUESTION:
      return {
        id: nanoid(),
        type,
        properties: {
          kind: QuestionKindEnum.SINGLE,
          text: 'New Question',
          textAnswer: 'Write Your Answer Here',
          title: 'Write Your Question Here',
          options: [
            { id: nanoid(), text: 'Option 1' },
            { id: nanoid(), text: 'Option 2' },
          ],
          correctOptionIds: [],
        },
        order,
        isDeleted: false,
        isNew: true,
        isUpdated: false,
      };

    case BlockEnum.BUTTON:
      return {
        id: nanoid(),
        type,
        properties: {
          previousLabel: 'Previous',
          nextLabel: 'Next',
          submitLabel: 'Submit',
        },
        order,
        isDeleted: false,
        isNew: true,
        isUpdated: false,
      };

    default:
      return {
        id: nanoid(),
        type,
        order,
        properties: {
          text: `Write Text for ${type} Here`,
        },
        isDeleted: false,
        isNew: true,
        isUpdated: false,
      };
  }
};
