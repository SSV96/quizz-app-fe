import { create } from 'zustand';
import { BlockEnum, BlockProperties, TQuizBlock } from '../types';
import { generateBlock } from '../utils/block-generator';

export interface UndoRedoState {
  past: TQuizBlock[][];
  present: TQuizBlock[];
  future: TQuizBlock[][];
  selectedBlockId: string | null;

  set: (newPresent: TQuizBlock[]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (initialState: TQuizBlock[]) => void;

  addBlock: (block: BlockEnum, index?: number) => void;
  reorderBlocks: (blocks: TQuizBlock[]) => void;
  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => void;
  deleteBlock: (blockId: string) => void;

  setSelectedBlock: (id: string | null) => void;
}

export const useUndoRedoStore = create<UndoRedoState>((set, get) => ({
  past: [],
  present: [],
  future: [],
  selectedBlockId: null,
  canUndo: false,
  canRedo: false,

  set: (newPresent) => {
    const { present, past } = get();
    set({
      past: [...past, present],
      present: newPresent,
      future: [],
      canUndo: past.length + 1 > 0,
      canRedo: false,
    });
  },

  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    set({
      past: past.slice(0, past.length - 1),
      present: previous,
      future: [present, ...future],
      canUndo: past.length - 1 > 0,
      canRedo: true,
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      past: [...past, present],
      present: next,
      future: future.slice(1),
      canUndo: true,
      canRedo: future.length - 1 > 0,
    });
  },

  reset: (initialState) => {
    set({
      past: [],
      present: initialState,
      future: [],
      selectedBlockId: null,
      canUndo: false,
      canRedo: false,
    });
  },

  addBlock: (type, index) => {
    const blocks = [...get().present];
    const order = index ?? blocks.length + 1;
    const newBlock = generateBlock({ type, order });
    if (typeof index === 'number') {
      blocks.splice(index, 0, newBlock);
    } else {
      blocks.push(newBlock);
    }
    get().set(blocks);
    get().setSelectedBlock(newBlock.id);
  },

  reorderBlocks: (blocks) => {
    get().set(blocks.map((b, i) => ({ ...b, order: i + 1 })));
  },

  updateBlock: (blockId: string, properties: Partial<BlockProperties>) => {
    const updated = get().present.map((b) =>
      b.id === blockId
        ? {
            ...b,
            properties: { ...b.properties, ...properties },
            isUpdated: !b.isNew ? true : b.isUpdated,
          }
        : b,
    );
    get().set(updated);
  },

  deleteBlock: (blockId) => {
    const updated = get().present.map((b) => (b.id === blockId ? { ...b, isDeleted: true } : b));
    get().set(updated);
  },
  setSelectedBlock: (id) => set({ selectedBlockId: id }),
}));
