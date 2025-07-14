import { Component, input } from '@angular/core';
import { Game } from '../core/models/game.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  game = input.required<Game>();
  ribbonLabel = input<string>('');
}
