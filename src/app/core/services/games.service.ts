import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Jackpot } from '../models/game.model';
import { interval, Observable, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  readonly apiUrl = 'https://stage.whgstage.com/front-end-test/games.php';
  readonly jackpotApi = 'https://stage.whgstage.com/front-end-test/jackpots.php';

  constructor(private readonly http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getJackpots(): Observable<Jackpot[]> {
    return interval(5000).pipe(
      startWith(0),
      switchMap(() => this.http.get<Jackpot[]>(this.jackpotApi))
    );
  }
}
