'use client';
import { Quiz } from '../@types/block';

export const demoQuiz: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'React Basics Quiz',
    blocks: [
      {
        id: 'block-1',
        type: 'heading',
        properties: {
          text: 'Welcome to React Basics Quiz!',
        },
      },
      {
        id: 'block-2',
        type: 'question',
        properties: {
          question: {
            id: 'q1',
            kind: 'single',
            text: 'What is React?',
            options: [
              { id: 'o1', text: 'A JavaScript library' },
              { id: 'o2', text: 'A CSS framework' },
              { id: 'o3', text: 'A database' },
            ],
            correctOptionIds: ['o1'],
          },
        },
      },
      {
        id: 'block-3',
        type: 'question',
        properties: {
          question: {
            id: 'q2',
            kind: 'multi',
            text: 'Which features belong to React?',
            options: [
              { id: 'o1', text: 'Virtual DOM' },
              { id: 'o2', text: 'State management' },
              { id: 'o3', text: 'Built-in SQL engine' },
            ],
            correctOptionIds: ['o1', 'o2'],
          },
        },
      },
      {
        id: 'block-5',
        type: 'footer',
        properties: {
          text: 'Good luck',
        },
      },
    ],
    published: true,
    createdAt: '2025-09-01T10:00:00.000Z',
    updatedAt: '2025-09-05T14:30:00.000Z',
    publishedAt: '2025-09-06T09:00:00.000Z',
  },
  {
    id: 'quiz-2',
    title: 'JavaScript Fundamentals',
    blocks: [
      {
        id: 'block-1',
        type: 'heading',
        properties: {
          text: 'JavaScript Quiz',
        },
      },
      {
        id: 'block-2',
        type: 'question',
        properties: {
          question: {
            id: 'q1',
            kind: 'text',
            text: 'Explain closures in JavaScript.',
          },
        },
      },
      {
        id: 'block-3',
        type: 'question',
        properties: {
          question: {
            id: 'q2',
            kind: 'single',
            text: 'Which of the following is NOT a JavaScript data type?',
            options: [
              { id: 'o1', text: 'String' },
              { id: 'o2', text: 'Boolean' },
              { id: 'o3', text: 'Float' },
            ],
            correctOptionIds: ['o3'],
          },
        },
      },
    ],
    published: false,
    createdAt: '2025-09-02T12:00:00.000Z',
    updatedAt: '2025-09-08T16:00:00.000Z',
    publishedAt: null,
  },
];
