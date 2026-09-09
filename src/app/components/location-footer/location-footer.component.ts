import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-location-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-footer.component.html',
  styleUrl: './location-footer.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LocationFooterComponent {
  constructor(public pizzaService: PizzaService) {}

  openReservation(): void {
    this.pizzaService.isReservationOpen.set(true);
  }

  goToNav(tab: string, event?: Event): void {
    if (event) event.preventDefault();
    this.pizzaService.activeNavTab.set(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
