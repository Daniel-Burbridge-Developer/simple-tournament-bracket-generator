// TODO: READ BELOW - CHANGE ACCORDINGLY, YOINK FROM BracketStore
// Should I have a tournamnet store, and then also a round store, and then a bracket store?
// ai please answer me in a way that is easy to understand and not too technical.
/// I WAS TRYING TO DO THIS WRONG. IF I WANT A HISTORY OF ALL TOURNAMENTS I WOULD PROBABLY USE A DATABASE, AND THEN A DIFFERENT STORE THAT CONTROLS THAT DATABASE OR SOMETHING.
// THIS SHOULD JUST BE A SINGLE TOURNAMENT STORE.

import { create } from 'zustand';
import { Participant } from '~/types/participants';
import { SingleEliminationBracket } from '~/types/brackets';

interface Round {
  id: string;
  brackets: SingleEliminationBracket[];
  winners: Participant[];
}

enum TournamentStyle {
  SINGLE_ELIMINATION = 'single_elimination',
}

interface Tournament {
  id: string;
  name: string;
  style: TournamentStyle;
  participants: Participant[];
  rounds: Round[];
  winner: Participant | null;
}

interface TournamentState {
  // state
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  rounds: Round[];
  currentRound: Round | null;

  //Actions
  addTournament: (tournament: Tournament) => void;
  setCurrentTournament: (id: string) => void;

  //Getters
}

export const useTournamentStore = create<TournamentState>()((set, get) => ({
  //State
  tournaments: [],
  currentTournament: null,

  //Actions
  addTournament: (tournament: Tournament) =>
    set((state) => ({
      tournaments: [...state.tournaments, tournament],
      //TODO: Fix this - Will this cause issues, buecase tournament isn't technically updated yet?
      currentTournament: state.tournaments[state.tournaments.length - 1],
    })),

  setCurrentTournament: (id: string) =>
    set((state) => ({
      currentTournament: state.tournaments.find((t) => t.id === id) || null,
    })),

  //Getters
  getTournament: (id: string) =>
    get().tournaments.find((t) => t.id === id) || null,
}));
