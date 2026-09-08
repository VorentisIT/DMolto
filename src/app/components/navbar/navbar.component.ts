import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../../services/pizza.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  constructor(public pizzaService: PizzaService) {}

  navigateToSection(tab: string, elementId: string, event: Event): void {
    event.preventDefault();
    this.pizzaService.activeNavTab.set(tab);
    this.pizzaService.isMobileMenuOpen.set(false);

    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleSearch(): void {
    this.pizzaService.isSearchOpen.set(!this.pizzaService.isSearchOpen());
  }

  openCart(): void {
    this.pizzaService.isCartOpen.set(true);
  }

  openReservation(): void {
    this.pizzaService.isReservationOpen.set(true);
  }

  toggleMobileMenu(): void {
    this.pizzaService.isMobileMenuOpen.set(!this.pizzaService.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.pizzaService.isMobileMenuOpen.set(false);
  }
}
