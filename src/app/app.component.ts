import { Component, computed, OnInit, signal } from '@angular/core';
import { Game, GameCategory, Jackpot } from './core/models/game.model';
import { MenuLinks } from './core/models/menu-links.model';
import { GamesService } from './core/services/games.service';
import { GameComponent } from './games/game.component';
import { HeaderComponent } from './header/header.component';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'casino-royale';

  protected readonly menuLinks: MenuLinks[] = [
    { label: 'Top Games', filter: 'top' },
    { label: 'New Games', filter: 'new' },
    { label: 'Slots', filter: 'slots' },
    { label: 'Jackpots', filter: 'jackpots' },
    { label: 'Live', filter: 'live' },
    { label: 'Blackjack', filter: 'blackjack' },
    { label: 'Roulette', filter: 'roulette' },
    { label: 'Table', filter: ['poker', 'blackjack'] },
    { label: 'Poker', filter: 'poker' },
    { label: 'Others', filter: ['ball', 'virtual', 'fun', 'classic'] }
  ];

  private filter = signal<GameCategory | GameCategory[]>(this.menuLinks[0].filter);
  private readonly allGames = signal<Game[]>([]);
  protected readonly selectedIndex = signal(0);
  protected readonly ribbonLabel = signal('TOP');
  protected readonly filteredGames = computed(() => {
    const games = this.allGames();
    const filter = this.filter();

    if (this.filter() === 'jackpots') {
      return games.filter((game) => game.amount);
    }

    if (Array.isArray(filter)) {
      return games.filter((game) => filter.some((category) => game.categories.includes(category)));
    } else {
      return games.filter((game) => game.categories.includes(filter));
    }
  });

  constructor(private readonly gamesService: GamesService) {}

  ngOnInit(): void {
    combineLatest([this.gamesService.getGames(), this.gamesService.getJackpots()]).subscribe(
      ([games, jackpots]) => {
        const jackpotMap = new Map(jackpots.map((j) => [j.game, j.amount]));

        const jackpotGames = games.map((game) => ({
          ...game,
          amount: jackpotMap.get(game.id)
        }));

        this.allGames.set(jackpotGames);
      }
    );
  }

  protected loadGames(event: number): void {
    this.selectedIndex.set(event);
    const filter = this.menuLinks[event].filter;
    this.filter.set(filter);
    if (filter === 'top') {
      this.ribbonLabel.set('TOP');
    } else if (filter === 'new') {
      this.ribbonLabel.set('NEW');
    }
  }
}
