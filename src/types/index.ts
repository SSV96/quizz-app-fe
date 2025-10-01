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

export enum QuizStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum DroppableAreaEnum {
  SIDEBAR = 'SIDEBAR',
  CANVAS = 'CANVAS',
}

export interface IQuestionOption {
  id: string;
  text: string;
}

export interface IQuestionProperties {
  title?: string;
  kind?: QuestionKindEnum;
  textAnswer?: string;
  options?: IQuestionOption[];
  correctOptionIds?: string[];
}

export interface IQuestionBlock extends UpdateFlags {
  id: string;
  order: number;
  type: BlockEnum.QUESTION;
  properties: IQuestionProperties;
}

export interface ITextBlockProperties {
  text?: string;
}

export interface ITextBlock extends UpdateFlags {
  id: string;
  order: number;
  type: BlockEnum.HEADING | BlockEnum.FOOTER;
  properties: ITextBlockProperties;
}

export interface IButtonBlockProperties {
  nextLabel: string;
  previousLabel: string;
  submitLabel: string;
}

export interface IButtonBlock extends UpdateFlags {
  id: string;
  order: number;
  type: BlockEnum.BUTTON;
  properties: IButtonBlockProperties;
}

export interface IUnknownBlock {
  id: string;
  order: number;
  type: BlockEnum;
  properties: Record<string, unknown>;
  isNew?: boolean;
  isUpdated?: boolean;
  isDeleted?: boolean;
}

export interface UpdateFlags {
  isNew?: boolean;
  isUpdated?: boolean;
  isDeleted?: boolean;
}
export type BlockProperties = TQuizBlock['properties'];
export type TQuizBlock = IQuestionBlock | ITextBlock | IButtonBlock | IUnknownBlock;

export interface IQuizSummary {
  id: string;
  title: string;
  published: boolean;
  updatedAt: string;
}

export interface IQuiz extends IQuizSummary {
  blocks: TQuizBlock[];
  published: boolean;
  updatedAt: string;
}

export interface EditorState<T> {
  past: T[];
  present: T;
  future: T[];
}
