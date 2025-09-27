export type BlockType = "heading" | "question" | "button" | "footer";

export type QuestionKind = "single" | "multi" | "text";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionPayload {
  id?: string; 
  kind: QuestionKind;
  text: string;
  options?: QuestionOption[];
  correctOptionIds?: string[];
}

export interface Block {
  id: string;
  type: BlockType;
  properties: {
    
    text?: string;
   
    question?: QuestionPayload;
   
    style?: Record<string, any>;
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
