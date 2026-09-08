import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent {
  constructor(public pizzaService: PizzaService) {}

  selectHeroPizza(index: number): void {
    this.pizzaService.selectHeroPizza(index);
  }

  showBrandStory(): void {
    this.pizzaService.showBrandStory();
  }

  nextHeroPizza(): void {
    const nextIdx = (this.pizzaService.selectedHeroPizzaIndex() + 1) % this.pizzaService.heroPizzas.length;
    this.pizzaService.selectHeroPizza(nextIdx);
  }

  prevHeroPizza(): void {
    const prevIdx = (this.pizzaService.selectedHeroPizzaIndex() - 1 + this.pizzaService.heroPizzas.length) % this.pizzaService.heroPizzas.length;
    this.pizzaService.selectHeroPizza(prevIdx);
  }

  openReservation(): void {
    this.pizzaService.isReservationOpen.set(true);
  }

  openStoryModal(): void {
    this.pizzaService.isStoryModalOpen.set(true);
  }

  goToNav(tab: string): void {
    this.pizzaService.activeNavTab.set(tab);
  }
}
