'use client';
import { BlockEnum, QuestionKindEnum, Quiz } from '../types';
const today = new Date().toISOString();

export const demoQuiz: Quiz[] = [
  {
    id: 'quiz-1',
    title: '(Sample Quiz 1) React Basics Quiz',
    blocks: [
      {
        id: 'block-1',
        type: BlockEnum.HEADING,
        properties: {
          text: 'Welcome to React Basics Quiz!',
        },
      },
      {
        id: 'block-2',
        type: BlockEnum.QUESTION,
        properties: {
          kind: QuestionKindEnum.SINGLE,

          title: 'what is the React',
          options: [
            { id: 'o1', text: 'A JavaScript library' },
            { id: 'o2', text: 'A CSS framework' },
            { id: 'o3', text: 'A database' },
          ],
          correctOptionIds: ['o1'],
        },
      },
      {
        id: 'block-3',
        type: BlockEnum.QUESTION,
        properties: {
          kind: QuestionKindEnum.MULTI,
          textAnswer: 'Which features belong to React?',
          options: [
            { id: 'o1', text: 'Virtual DOM' },
            { id: 'o2', text: 'State management' },
            { id: 'o3', text: 'Built-in SQL engine' },
          ],
          correctOptionIds: ['o1', 'o2'],
        },
      },
      {
        id: 'block-4',
        type: BlockEnum.BUTTON,
        properties: {
          previousLabel: 'Previous',
          nextLabel: 'Next',
          submitLabel: 'Submit',
        },
      },
      {
        id: 'block-5',
        type: BlockEnum.FOOTER,
        properties: {
          text: 'Good luck',
        },
      },
    ],
    published: true,
    createdAt: today,
    updatedAt: today,
    publishedAt: today,
  },
  {
    id: 'quiz-2',
    title: '(Sample Quiz 2) JavaScript Fundamentals',
    blocks: [
      {
        id: 'block-1',
        type: BlockEnum.HEADING,
        properties: {
          text: 'JavaScript Quiz',
        },
      },
      {
        id: 'block-2',
        type: BlockEnum.QUESTION,
        properties: {
          kind: QuestionKindEnum.TEXT,
          textAnswer: 'Explain closures in JavaScript.',
        },
      },
      {
        id: 'block-3',
        type: BlockEnum.QUESTION,
        properties: {
          kind: QuestionKindEnum.SINGLE,
          textAnswer: 'Which of the following is NOT a JavaScript data type?',
          options: [
            { id: 'o1', text: 'String' },
            { id: 'o2', text: 'Boolean' },
            { id: 'o3', text: 'Float' },
          ],
          correctOptionIds: ['o3'],
        },
      },
      {
        id: 'block-4',
        type: BlockEnum.BUTTON,
        properties: {
          previousLabel: 'Previous',
          nextLabel: 'Next',
          submitLabel: 'Submit',
        },
      },
    ],
    published: false,
    createdAt: today,
    updatedAt: today,
    publishedAt: null,
  },
];
