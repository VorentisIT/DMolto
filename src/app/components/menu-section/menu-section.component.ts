import { Component, ViewEncapsulation, ElementRef, viewChild } from '@angular/core';
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

  constructor(public pizzaService: PizzaService) {}

  setCategory(category: string): void {
    this.pizzaService.activeCategory.set(category);
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
