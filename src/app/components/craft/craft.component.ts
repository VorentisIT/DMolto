import { Component, ViewEncapsulation, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza.service';

export interface CraftPillar {
  id: string;
  num: number;
  title: string;
  icon: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-craft',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './craft.component.html',
  styleUrl: './craft.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CraftComponent {
  readonly craftPillars: CraftPillar[] = [
    {
      id: 'sourdough',
      num: 1,
      title: '48h Sourdough',
      icon: 'CAPUTO 00',
      badge: '48-Hour Cold Ferment',
      tagline: 'Light, Digestible & Airy Cornicione',
      description: 'Our dough is cold-fermented for a minimum of 48 hours using imported Caputo 00 flour and wild sourdough starter. This creates a signature blistered crust that is incredibly light, fragrant, and easily digestible.',
      image: '/images/chef-craft.jpg'
    },
    {
      id: 'tomatoes',
      num: 2,
      title: 'San Marzano D.O.P.',
      icon: 'VOLCANIC SOIL',
      badge: 'Volcanic Soil Tomatoes',
      tagline: 'Sweet, Low Acidity & Rich Volcanic Flavor',
      description: 'Grown in the sun-drenched volcanic soil of Mount Vesuvius in Campania, San Marzano D.O.P. plum tomatoes are crushed by hand to preserve their natural sweetness and vibrant ruby color without bitter seeds.',
      image: '/images/tomatoes.jpg'
    },
    {
      id: 'mozzarella',
      num: 3,
      title: 'Fior di Latte',
      icon: 'FRESH MILK',
      badge: 'Artisan Fresh Mozzarella',
      tagline: 'Creamy Melt & Delicate Milk Fragrance',
      description: 'Sourced daily from local artisan cheese makers, our Fior di Latte is torn by hand just moments before entering the oven. It melts into a velvety, creamy pool that perfectly balances our tangy tomato sugo.',
      image: '/images/mozzarella.jpg'
    },
    {
      id: 'hearth',
      num: 4,
      title: '450°C Stone Hearth',
      icon: 'WOOD FIRED',
      badge: '90-Second Neapolitan Bake',
      tagline: 'Blistered Crust & Melted Perfection',
      description: 'Slid onto a beechwood peel and thrust into our 450°C dome hearth stone oven, every pizza cooks in just 90 seconds. The intense heat locks in moisture while giving the crust its prized leopard-spotted char.',
      image: '/images/gallery-garnish.jpg'
    }
  ];

  readonly selectedIndex = signal<number>(0);
  readonly activePillar = computed(() => this.craftPillars[this.selectedIndex()]);

  constructor(public pizzaService: PizzaService) {}

  selectPillar(index: number): void {
    this.selectedIndex.set(index);
  }

  openReservation(): void {
    this.pizzaService.isReservationOpen.set(true);
  }

  goToMenu(): void {
    this.pizzaService.activeNavTab.set('menu');
  }
}
