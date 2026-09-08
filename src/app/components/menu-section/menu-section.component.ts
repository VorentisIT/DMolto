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

  constructor(public pizzaService: PizzaService) {}

  setCategory(category: string): void {
    this.pizzaService.activeCategory.set(category);
  }

  setLayoutMode(mode: 'grid' | 'ribbon'): void {
    this.layoutOverride.set(mode);
  }

  addToCart(pizza: PizzaItem): void {
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
