import { Component, ViewEncapsulation, ElementRef, viewChild, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService, PizzaItem } from '../../services/pizza.service';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-section.component.html',
  styleUrl: './menu-section.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MenuSectionComponent {
  readonly menuScrollTrack = viewChild<ElementRef<HTMLElement>>('menuScrollTrack');
  readonly layoutOverride = signal<'grid' | 'ribbon' | null>(null);

  readonly layoutMode = computed<'grid' | 'ribbon'>(() => {
    const override = this.layoutOverride();
    if (override) return override;
    // Default to 'ribbon' on Home page, and 'grid' on dedicated Menu page
    return this.pizzaService.activeNavTab() === 'menu' ? 'grid' : 'ribbon';
  });

  readonly displayedCards = computed(() => {
    let items = this.pizzaService.filteredMenuItems();
    if (!items.length) items = this.pizzaService.menuItems();

    if (this.layoutMode() === 'ribbon') {
      const offset = this.pizzaService.menuSliceOffset() % items.length;
      const result: PizzaItem[] = [];
      for (let i = 0; i < 4; i++) {
        result.push(items[(offset + i) % items.length]);
      }
      return result;
    }

    return items;
  });

  constructor(public pizzaService: PizzaService) {}

  setCategory(category: string): void {
    this.pizzaService.activeCategory.set(category);
  }

  setLayoutMode(mode: 'grid' | 'ribbon'): void {
    this.layoutOverride.set(mode);
  }

  addToCart(pizza: PizzaItem, event?: Event): void {
    if (event) event.stopPropagation();
    this.pizzaService.addToCart(pizza);
  }

  openReservation(): void {
    this.pizzaService.isReservationOpen.set(true);
  }

  scrollMenuTrack(direction: 'left' | 'right'): void {
    const track = this.menuScrollTrack()?.nativeElement;
    if (!track) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
