export enum BlockEnum {
  HEADING = 'HEADING',
  QUESTION = 'QUESTION',
  BUTTON = 'BUTTON',
  FOOTER = 'FOOTER',
}

export enum QuestionKindEnum {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI',
  TEXT = 'TEXT',
}

export enum DroppableAreaEnum {
  SIDEBAR = 'SIDEBAR',
  CANVAS = 'CANVAS',
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionPayload {
  id?: string;
  kind?: QuestionKindEnum;
  text: string;
  textAnswer?: string;
  options?: QuestionOption[];
  correctOptionIds?: string[];
}

export interface Block {
  id: string;
  type: BlockEnum;
  properties: {
    text?: string;
    question?: QuestionPayload;
    style?: Record<string, string | number>;
    options?: QuestionOption[];
  };
}

export interface Quiz {
  id: string;
  title: string;
  blocks: Block[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}
