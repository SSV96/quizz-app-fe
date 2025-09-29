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

export interface QuestionProperties {
  title?: string;
  kind?: QuestionKindEnum;
  textAnswer?: string;
  options?: QuestionOption[];
  correctOptionIds?: string[];
}

export interface QuestionBlock {
  id: string;
  type: BlockEnum.QUESTION;
  properties: QuestionProperties;
}

export interface ITextBlockProperties {
  text?: string;
}

export interface TextBlock {
  id: string;
  type: BlockEnum.HEADING | BlockEnum.FOOTER;
  properties: ITextBlockProperties;
}

export interface IButtonBlockProperties {
  nextLabel: string;
  previousLabel: string;
  submitLabel: string;
}

export interface ButtonBlock {
  id: string;
  type: BlockEnum.BUTTON;
  properties: IButtonBlockProperties;
}

export interface IUnknownBlock {
  id: string;
  type: BlockEnum;
  properties: any;
}

export type TQuizBlock = QuestionBlock | TextBlock | ButtonBlock | IUnknownBlock;

export interface Quiz {
  id: string;
  title: string;
  blocks: TQuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}
