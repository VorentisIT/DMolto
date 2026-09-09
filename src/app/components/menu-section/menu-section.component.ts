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
    return this.pizzaService.filteredMenuItems();
  });

  readonly categories = ['all', 'classic', 'veg', 'non-veg', 'special', 'beverages'];

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
    const total = this.displayedCards().length;
    if (total <= 0) return;

    const current = this.pizzaService.highlightedCardIndex();
    const nextIdx = direction === 'right' ? (current + 1) % total : (current - 1 + total) % total;
    this.pizzaService.highlightedCardIndex.set(nextIdx);

    setTimeout(() => {
      const activeCard = document.querySelector('.chef-special-card-active') as HTMLElement ||
                         document.querySelectorAll('.luxury-pizza-card')[nextIdx] as HTMLElement;
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 40);
  }
}
