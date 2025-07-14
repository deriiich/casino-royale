import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  signal,
  computed
} from '@angular/core';
import { MenuLinks } from '../core/models/menu-links.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  menuLinks = input<MenuLinks[]>();
  selectedIndex = input<number>(0);
  isMenuOpen = signal(false);
  category = computed(() => this.menuLinks()?.[this.selectedIndex()]?.label);

  @Output() selectedCategory = new EventEmitter<number>();

  protected showGames(index: number) {
    this.selectedCategory.emit(index);
    this.closeMenu();
  }

  protected toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu() {
    if (this.isMenuOpen()) this.isMenuOpen.set(false);
  }
}
