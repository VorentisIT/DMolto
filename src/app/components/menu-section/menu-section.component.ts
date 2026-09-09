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
    // 1. Advance/decrement highlighted card index so glowing highlight moves to next/prev card
    const total = this.displayedCards().length;
    if (total > 0) {
      const current = this.pizzaService.highlightedCardIndex();
      if (direction === 'right') {
        this.pizzaService.highlightedCardIndex.set((current + 1) % total);
      } else {
        this.pizzaService.highlightedCardIndex.set((current - 1 + total) % total);
      }
    }

    // 2. Scroll cards track horizontally in Ribbon mode or grid wrapper in Grid mode
    const track = this.menuScrollTrack()?.nativeElement || 
                  (document.querySelector('.menu-grid-showcase-container') as HTMLElement);
    
    if (track) {
      const distance = direction === 'left' ? -320 : 320;
      if (typeof track.scrollBy === 'function') {
        track.scrollBy({ left: distance, behavior: 'smooth' });
      } else {
        track.scrollLeft += distance;
      }
    }

    const gridWrapper = document.querySelector('.full-menu-grid-wrapper') as HTMLElement;
    if (gridWrapper && this.layoutMode() === 'grid') {
      const distance = direction === 'left' ? -320 : 320;
      if (typeof gridWrapper.scrollBy === 'function') {
        gridWrapper.scrollBy({ top: distance, behavior: 'smooth' });
      } else {
        gridWrapper.scrollTop += distance;
      }
    }
  }
}
