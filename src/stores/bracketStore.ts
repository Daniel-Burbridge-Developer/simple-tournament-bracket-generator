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

/// REFERENCE ONLY

// import { create } from 'zustand';
// import { SingleEliminationBracket } from '@/types/brackets';
// import { Participant } from '~/types/participants';

// interface Round {
//   id: string;
//   name: string;
//   brackets: SingleEliminationBracket[];
//   isComplete: boolean;
//   roundNumber: number;
// }

// interface Tournament {
//   id: string;
//   name: string;
//   participants: Participant[];
//   rounds: Round[];
//   currentRound: number;
//   isComplete: boolean;
//   createdAt: Date;
// }

// interface TournamentState {
//   // Current tournament
//   currentTournament: Tournament | null;

//   // Tournament management
//   createTournament: (name: string, participants: Participant[]) => void;
//   generateFirstRound: () => void;
//   advanceToNextRound: () => void;
//   resetTournament: () => void;

//   // Bracket management
//   setWinner: (roundId: string, bracketId: string, winner: Participant) => void;
//   regenerateRound: (roundNumber: number) => void;

//   // Utility
//   getCurrentRound: () => Round | null;
//   getTournamentProgress: () => number;
// }

// export const useTournamentStore = create<TournamentState>()((set, get) => ({
//   currentTournament: null,

//   createTournament: (name, participants) => {
//     const tournament: Tournament = {
//       id: crypto.randomUUID(),
//       name,
//       participants: [...participants],
//       rounds: [],
//       currentRound: 0,
//       isComplete: false,
//       createdAt: new Date(),
//     };

//     set({ currentTournament: tournament });
//   },

//   generateFirstRound: () => {
//     const { currentTournament } = get();
//     if (!currentTournament) return;

//     const shuffledParticipants = [...currentTournament.participants].sort(
//       () => Math.random() - 0.5,
//     );

//     const brackets: SingleEliminationBracket[] = [];
//     for (let i = 1; i < shuffledParticipants.length; i += 2) {
//       brackets.push({
//         id: crypto.randomUUID(),
//         participants: [shuffledParticipants[i - 1], shuffledParticipants[i]],
//         winner: null,
//         name: `Match ${brackets.length + 1}`,
//       });
//     }

//     const firstRound: Round = {
//       id: crypto.randomUUID(),
//       name: 'Round 1',
//       brackets,
//       isComplete: false,
//       roundNumber: 1,
//     };

//     set((state) => ({
//       currentTournament: state.currentTournament
//         ? {
//             ...state.currentTournament,
//             rounds: [firstRound],
//             currentRound: 1,
//           }
//         : null,
//     }));
//   },

//   advanceToNextRound: () => {
//     const { currentTournament } = get();
//     if (!currentTournament) return;

//     const currentRound =
//       currentTournament.rounds[currentTournament.currentRound - 1];
//     if (!currentRound || !currentRound.isComplete) return;

//     // Get winners from current round
//     const winners = currentRound.brackets
//       .map((bracket) => bracket.winner)
//       .filter((winner): winner is Participant => winner !== null);

//     if (winners.length <= 1) {
//       // Tournament is complete
//       set((state) => ({
//         currentTournament: state.currentTournament
//           ? {
//               ...state.currentTournament,
//               isComplete: true,
//             }
//           : null,
//       }));
//       return;
//     }

//     // Create next round brackets
//     const shuffledWinners = [...winners].sort(() => Math.random() - 0.5);
//     const newBrackets: SingleEliminationBracket[] = [];

//     for (let i = 1; i < shuffledWinners.length; i += 2) {
//       newBrackets.push({
//         id: crypto.randomUUID(),
//         participants: [shuffledWinners[i - 1], shuffledWinners[i]],
//         winner: null,
//         name: `Match ${newBrackets.length + 1}`,
//       });
//     }

//     const nextRound: Round = {
//       id: crypto.randomUUID(),
//       name: `Round ${currentTournament.currentRound + 1}`,
//       brackets: newBrackets,
//       isComplete: false,
//       roundNumber: currentTournament.currentRound + 1,
//     };

//     set((state) => ({
//       currentTournament: state.currentTournament
//         ? {
//             ...state.currentTournament,
//             rounds: [...state.currentTournament.rounds, nextRound],
//             currentRound: state.currentTournament.currentRound + 1,
//           }
//         : null,
//     }));
//   },

//   resetTournament: () => {
//     set({ currentTournament: null });
//   },

//   setWinner: (roundId, bracketId, winner) => {
//     set((state) => {
//       if (!state.currentTournament) return state;

//       const updatedRounds = state.currentTournament.rounds.map((round) => {
//         if (round.id !== roundId) return round;

//         const updatedBrackets = round.brackets.map((bracket) =>
//           bracket.id === bracketId ? { ...bracket, winner } : bracket,
//         );

//         const isComplete = updatedBrackets.every(
//           (bracket) => bracket.winner !== null,
//         );

//         return {
//           ...round,
//           brackets: updatedBrackets,
//           isComplete,
//         };
//       });

//       return {
//         currentTournament: {
//           ...state.currentTournament,
//           rounds: updatedRounds,
//         },
//       };
//     });
//   },

//   regenerateRound: (roundNumber) => {
//     const { currentTournament } = get();
//     if (!currentTournament) return;

//     const roundIndex = roundNumber - 1;
//     const round = currentTournament.rounds[roundIndex];
//     if (!round) return;

//     // Get participants for this round (either original participants or winners from previous round)
//     let participants: Participant[];
//     if (roundNumber === 1) {
//       participants = [...currentTournament.participants];
//     } else {
//       const previousRound = currentTournament.rounds[roundIndex - 1];
//       participants = previousRound.brackets
//         .map((bracket) => bracket.winner)
//         .filter((winner): winner is Participant => winner !== null);
//     }

//     const shuffledParticipants = [...participants].sort(
//       () => Math.random() - 0.5,
//     );
//     const newBrackets: SingleEliminationBracket[] = [];

//     for (let i = 1; i < shuffledParticipants.length; i += 2) {
//       newBrackets.push({
//         id: crypto.randomUUID(),
//         participants: [shuffledParticipants[i - 1], shuffledParticipants[i]],
//         winner: null,
//         name: `Match ${newBrackets.length + 1}`,
//       });
//     }

//     set((state) => ({
//       currentTournament: state.currentTournament
//         ? {
//             ...state.currentTournament,
//             rounds: state.currentTournament.rounds.map((r, index) =>
//               index === roundIndex
//                 ? { ...r, brackets: newBrackets, isComplete: false }
//                 : r,
//             ),
//           }
//         : null,
//     }));
//   },

//   getCurrentRound: () => {
//     const { currentTournament } = get();
//     if (!currentTournament || currentTournament.currentRound === 0) return null;
//     return currentTournament.rounds[currentTournament.currentRound - 1] || null;
//   },

//   getTournamentProgress: () => {
//     const { currentTournament } = get();
//     if (!currentTournament || currentTournament.rounds.length === 0) return 0;

//     const totalBrackets = currentTournament.rounds.reduce(
//       (total, round) => total + round.brackets.length,
//       0,
//     );
//     const completedBrackets = currentTournament.rounds.reduce(
//       (total, round) => total + round.brackets.filter((b) => b.winner).length,
//       0,
//     );

//     return Math.round((completedBrackets / totalBrackets) * 100);
//   },
// }));

// // Legacy compatibility - you can gradually migrate components
// export const useBracketStore = create(() => ({
//   brackets: [],
//   participants: [],
//   generateBrackets: (participants: Participant[]) => {
//     const store = useTournamentStore.getState();
//     store.createTournament('Tournament', participants);
//     store.generateFirstRound();
//   },
//   regenerateBrackets: () => {
//     const store = useTournamentStore.getState();
//     store.regenerateRound(1);
//   },
//   deleteBracket: () => {}, // Not applicable in new structure
//   resetBrackets: () => {
//     const store = useTournamentStore.getState();
//     store.resetTournament();
//   },
//   setWinner: (bracketId: string, winner: Participant) => {
//     const store = useTournamentStore.getState();
//     const currentRound = store.getCurrentRound();
//     if (currentRound) {
//       store.setWinner(currentRound.id, bracketId, winner);
//     }
//   },
// }));
