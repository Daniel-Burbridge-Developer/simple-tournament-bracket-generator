import { create } from 'zustand';
import { Bracket } from '@/types/brackets';

interface BracketState {
  bracket: Bracket[];
  addBracket: (bracket: Bracket) => void;
  updateBracket: (id: string, bracket: Bracket) => void;
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


