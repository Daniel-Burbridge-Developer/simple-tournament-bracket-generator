import { create } from 'zustand';
import { SingleEliminationBracket } from '@/types/brackets';
import { Participant } from '~/types/participants';

interface Round {
  id: string;
  brackets: SingleEliminationBracket[];
  winners: Participant[];
}

interface BracketState {
  brackets: SingleEliminationBracket[];
  participants: Participant[];
  rounds: Round[];
  generateBrackets: (participants: Participant[]) => void;
  regenerateBrackets: () => void;
  deleteBracket: (id: string) => void;
  resetBrackets: () => void;
  setWinner: (bracketId: string, winner: Participant) => void;
}

export const useBracketStore = create<BracketState>()((set, get) => ({
  brackets: [],
  participants: [],
  rounds: [],
  generateBrackets: (participants) =>
    set((state) => {
      const scrambledParticipants = participants.sort(
        () => Math.random() - 0.5,
      );
      const newBrackets: SingleEliminationBracket[] = [];

      for (let i = 1; i < scrambledParticipants.length; i += 2) {
        newBrackets.push({
          id: crypto.randomUUID(),
          participants: [
            scrambledParticipants[i - 1],
            scrambledParticipants[i],
          ],
          winner: null,
          name: `Bracket ${state.brackets.length + newBrackets.length + 1}`,
        });
      }

      return {
        brackets: [...state.brackets, ...newBrackets],
        participants: participants,
      };
    }),
  regenerateBrackets: () => {
    const { participants } = get();
    if (participants.length === 0) return;

    set((state) => {
      const scrambledParticipants = [...participants].sort(
        () => Math.random() - 0.5,
      );
      const newBrackets: SingleEliminationBracket[] = [];

      for (let i = 1; i < scrambledParticipants.length; i += 2) {
        newBrackets.push({
          id: crypto.randomUUID(),
          participants: [
            scrambledParticipants[i - 1],
            scrambledParticipants[i],
          ],
          winner: null,
          name: `Bracket ${newBrackets.length + 1}`,
        });
      }

      return {
        brackets: newBrackets,
      };
    });
  },
  deleteBracket: (id) =>
    set((state) => ({ brackets: state.brackets.filter((b) => b.id !== id) })),
  resetBrackets: () => set({ brackets: [] }),
  setWinner: (bracketId, winner) =>
    set((state) => ({
      brackets: state.brackets.map((bracket) =>
        bracket.id === bracketId ? { ...bracket, winner } : bracket,
      ),
    })),
}));
