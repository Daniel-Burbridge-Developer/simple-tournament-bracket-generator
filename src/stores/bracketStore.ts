import { create } from 'zustand';
import { SingleEliminationBracket } from '@/types/brackets';

interface BracketState {
  bracket: SingleEliminationBracket[];
  addBracket: (bracket: SingleEliminationBracket) => void;
  updateBracket: (id: string, bracket: SingleEliminationBracket) => void;
  deleteBracket: (id: string) => void;
}

export const useBracketStore = create<BracketState>()((set) => ({
  bracket: [],
  addBracket: (bracket) =>
    set((state) => ({ bracket: [...state.bracket, bracket] })),
  updateBracket: (id, bracket) =>
    set((state) => ({
      bracket: state.bracket.map((b) => (b.id === id ? bracket : b)),
    })),
  deleteBracket: (id) =>
    set((state) => ({ bracket: state.bracket.filter((b) => b.id !== id) })),
}));
