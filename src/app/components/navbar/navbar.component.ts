import { Component, ViewEncapsulation, HostListener, signal } from '@angular/core';
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
  readonly isScrolled = signal<boolean>(false);

  constructor(public pizzaService: PizzaService) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  navigateToSection(tab: string, elementId?: string, event?: Event): void {
    if (event) event.preventDefault();
    this.pizzaService.activeNavTab.set(tab);
    this.pizzaService.isMobileMenuOpen.set(false);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
