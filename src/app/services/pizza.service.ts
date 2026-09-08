import { Injectable, signal, computed } from '@angular/core';

export interface PizzaItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: 'all' | 'classics' | 'signature' | 'vegetarian' | 'seafood' | 'desserts' | 'beverages';
  image?: string;
  isSpecial?: boolean;
}

export interface CartItem {
  pizza: PizzaItem;
  quantity: number;
}

export interface HeroPizza {
  id: string;
  name: string;
  ingredients: string;
  price: string;
  weight: string;
  image: string;
  thumb: string;
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // Navigation & Category States
  readonly activeNavTab = signal<string>('home');
  readonly activeCategory = signal<string>('all');
  readonly isSearchOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly isReservationOpen = signal<boolean>(false);
  readonly isCartOpen = signal<boolean>(false);
  readonly isStoryModalOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  // Hero State
  readonly heroMode = signal<'story' | 'pizza'>('story');

  readonly heroPizzas: HeroPizza[] = [
    {
      id: 'seafood',
      name: 'Seafood pizza',
      ingredients: 'tomato sauce, mozzarella cheese, cocktail shrimps, salmon, mussels, lemon, parsley.',
      price: '$18.00',
      weight: '230g',
      image: '/images/seafood-pizza-hq.jpg',
      thumb: '/images/thumb-seafood-hq.jpg'
    },
    {
      id: 'veggie',
      name: 'Vegetarian pizza',
      ingredients: 'tomato sauce, mozzarella cheese, bell peppers, red onions, mushrooms, kalamata olives, oregano.',
      price: '$16.50',
      weight: '210g',
      image: '/images/veggie-pizza-hq.jpg',
      thumb: '/images/thumb-veggie-hq.jpg'
    },
    {
      id: 'margherita',
      name: 'Margherita Classica',
      ingredients: 'San Marzano D.O.P. tomatoes, fior di latte mozzarella, fresh sweet basil, cold-pressed EVOO.',
      price: '$15.00',
      weight: '200g',
      image: '/images/margherita-pizza-hq.jpg',
      thumb: '/images/thumb-margherita-hq.jpg'
    },
    {
      id: 'diavola',
      name: 'Diavola Piccante',
      ingredients: 'spicy artisanal salami, San Marzano tomato sugo, smoked scamorza, fiery pickled Calabrian chilies.',
      price: '$17.50',
      weight: '220g',
      image: '/images/diavola-pizza-hq.jpg',
      thumb: '/images/thumb-diavola-hq.jpg'
    }
  ];

  readonly selectedHeroPizzaIndex = signal<number>(0);
  readonly selectedHeroPizza = computed(() => this.heroPizzas[this.selectedHeroPizzaIndex()]);

  // Menu Catalog
  readonly menuItems = signal<PizzaItem[]>([
    {
      id: 'p1',
      name: 'Margherita Classica',
      subtitle: 'Napoli Tradition',
      description: 'San Marzano D.O.P. crushed tomatoes, fior di latte mozzarella, fresh sweet basil, cold-pressed EVOO.',
      price: 450,
      category: 'classics',
      image: '/images/margherita-pizza-hq.jpg'
    },
    {
      id: 'p2',
      name: 'Diavola Piccante',
      subtitle: 'Fiery & Bold',
      description: 'Spicy artisanal salami, San Marzano tomato sugo, smoked scamorza, fiery pickled Calabrian chilies.',
      price: 520,
      category: 'signature',
      image: '/images/diavola-pizza-hq.jpg',
      isSpecial: true
    },
    {
      id: 'p3',
      name: 'Truffle & Mushrooms',
      subtitle: 'Earthy Indulgence',
      description: 'Wild forest porcini and cremini mushrooms, white truffle oil glaze, creamy whole burrata crest.',
      price: 580,
      category: 'signature',
      image: '/images/burrata-truffle.jpg',
      isSpecial: true
    },
    {
      id: 'p4',
      name: 'Quattro Formaggi',
      subtitle: 'White Base Harmony',
      description: 'Four Italian cheeses: Gorgonzola dolce, aged Parmigiano Reggiano, scamorza, and fior di latte with wildflower honey.',
      price: 550,
      category: 'classics'
    },
    {
      id: 'p5',
      name: 'Seafood Amalfi',
      subtitle: 'Coastal Special',
      description: 'Wild cocktail shrimps, Atlantic salmon bites, blue mussels, lemon zest butter, and fresh parsley.',
      price: 680,
      category: 'seafood',
      image: '/images/seafood-pizza-hq.jpg',
      isSpecial: true
    },
    {
      id: 'p6',
      name: 'Ortolana Veggie',
      subtitle: 'Garden Fresh',
      description: 'Charred bell peppers, caramelised red onions, wood-baked zucchini, Kalamata olives, and wild oregano.',
      price: 480,
      category: 'vegetarian',
      image: '/images/veggie-pizza-hq.jpg'
    },
    {
      id: 'p7',
      name: 'Artisanal Tiramisù',
      subtitle: 'Dolci Craft',
      description: 'Savoiardi ladyfingers soaked in dark espresso & Marsala wine, layered with whipped mascarpone cream.',
      price: 320,
      category: 'desserts'
    },
    {
      id: 'p8',
      name: 'San Pellegrino Sparkling',
      subtitle: '750ml Glass Bottle',
      description: 'Natural sparkling mineral water sourced from the Italian Alps.',
      price: 180,
      category: 'beverages'
    }
  ]);

  readonly filteredMenuItems = computed(() => {
    const cat = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();
    return this.menuItems().filter(item => {
      const matchesCat = cat === 'all' || item.category === cat;
      const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  });

  // Cart State
  readonly cart = signal<CartItem[]>([
    { pizza: this.menuItems()[0], quantity: 1 }
  ]);

  readonly cartTotalCount = computed(() => 
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly cartTotalPrice = computed(() => 
    this.cart().reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0)
  );

  // Actions
  selectHeroPizza(index: number): void {
    this.heroMode.set('pizza');
    this.selectedHeroPizzaIndex.set(index);
  }

  showBrandStory(): void {
    this.heroMode.set('story');
  }

  addToCart(pizza: PizzaItem): void {
    const current = this.cart();
    const existing = current.find(i => i.pizza.id === pizza.id);
    if (existing) {
      existing.quantity += 1;
      this.cart.set([...current]);
    } else {
      this.cart.set([...current, { pizza, quantity: 1 }]);
    }
    this.showToast(`Added "${pizza.name}" to your order bag!`);
  }

  updateQuantity(index: number, delta: number): void {
    const current = [...this.cart()];
    if (!current[index]) return;
    current[index].quantity += delta;
    if (current[index].quantity <= 0) {
      current.splice(index, 1);
    }
    this.cart.set(current);
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3200);
  }
}
