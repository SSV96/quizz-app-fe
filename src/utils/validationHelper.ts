import {
  IQuiz,
  BlockProperties,
  BlockEnum,
  IQuestionProperties,
  ITextBlockProperties,
} from '../types';

export const validateQuiz = (quiz: Partial<IQuiz>) => {
  const errors: string[] = [];

  if (!quiz.title || quiz.title.trim() === '') {
    errors.push('Quiz title is required');
  }

  const activeBlocks = quiz?.blocks?.filter((b) => !b.isDeleted);

  activeBlocks?.forEach((block, idx) => {
    const props = block.properties as BlockProperties;

    if (block.type === BlockEnum.QUESTION) {
      const questionProps = props as IQuestionProperties;

      if (!questionProps.title || questionProps.title.trim() === '') {
        errors.push(`Error at Block: ${idx + 1} must have a title`);
      }

      if (!questionProps.options || questionProps.options.length === 0) {
        errors.push(`Error at Block: ${idx + 1} must have at least one option`);
      }

      if (questionProps.options?.some((o) => !o.text || o.text.trim() === '')) {
        errors.push(`Error at Block: ${idx + 1} has an empty option`);
      }

      if (!questionProps.correctOptionIds || questionProps.correctOptionIds.length === 0) {
        errors.push(`Error at Block: ${idx + 1} must have at least one correct option`);
      }
    }

    if (block.type === BlockEnum.HEADING || block.type === BlockEnum.FOOTER) {
      const textProps = props as ITextBlockProperties;

      if (!textProps.text || textProps.text.trim() === '') {
        errors.push(`Error at ${block.type} Text block ${idx + 1} cannot be empty`);
      }
    }
  });

  return errors;
};
