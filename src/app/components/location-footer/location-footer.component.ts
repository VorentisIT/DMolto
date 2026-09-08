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

  goToNav(tab: string): void {
    this.pizzaService.activeNavTab.set(tab);
  }
}
