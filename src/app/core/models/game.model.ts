export interface Game {
  id: string;
  name: string;
  image: string;
  categories: GameCategory[];
  amount?: number;
}

export type GameCategory =
  | 'top'
  | 'slots'
  | 'new'
  | 'classic'
  | 'poker'
  | 'roulette'
  | 'blackjack'
  | 'fun'
  | 'virtual'
  | 'ball'
  | 'jackpots'
  | 'live';

export interface Jackpot {
  game: string;
  amount: number;
}
