import { GameCategory } from './game.model';

export interface MenuLinks {
  label: string;
  filter: GameCategory | GameCategory[];
}
