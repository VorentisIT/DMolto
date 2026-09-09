import { Injectable, signal, computed } from '@angular/core';

export interface PizzaItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: 'all' | 'classic' | 'veg' | 'non-veg' | 'special' | 'sides' | 'desserts' | 'beverages';
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

export interface ExperienceStep {
  id: number;
  num: string;
  title: string;
  headingText: string;
  headingAccent: string;
  description: string;
  image: string;
  handwritten: string;
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  // Navigation & Category States
  readonly activeNavTab = signal<string>('home');
  readonly activeCategory = signal<string>('all');
  readonly activeExperienceStepIndex = signal<number>(0);
  readonly isSearchOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly isReservationOpen = signal<boolean>(false);
  readonly isCartOpen = signal<boolean>(false);
  readonly isStoryModalOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isMenuDetailsModalOpen = signal<boolean>(false);
  readonly selectedPizzaForModal = signal<PizzaItem | null>(null);
  readonly menuSliceOffset = signal<number>(0);
  readonly toastMessage = signal<string | null>(null);

  // Reservation Form Model
  resGuests = '2 Guests';
  resDate = new Date().toISOString().split('T')[0];
  resTime = '07:00 PM';
  resName = '';
  resPhone = '';

  // Hero State
  readonly heroMode = signal<'story' | 'pizza'>('story');

  readonly categoryImages: Record<string, string> = {
    all: '/images/dmollo-hero-pizza.png',
    classic: '/images/dmollo-hero-pizza.jpg',
    veg: '/images/dmollo-experience-pizza.jpg',
    'non-veg': '/images/dmollo-dining.jpg',
    special: '/images/dmollo-ambience-detail.jpg',
    sides: '/images/dmollo-pizzaiolo.jpg',
    desserts: '/images/dmollo-ambience-main.jpg',
    beverages: '/images/gallery-bar.jpg'
  };

  readonly activeHeroCircleImage = computed(() => {
    if (this.heroMode() === 'pizza') {
      return this.selectedHeroPizza().image;
    }
    const cat = this.activeCategory();
    return this.categoryImages[cat] || '/images/dmollo-hero-pizza.png';
  });

  readonly heroPizzas: HeroPizza[] = [
    {
      id: 'margherita',
      name: 'Margherita Classica',
      ingredients: 'San Marzano D.O.P. tomatoes, fior di latte mozzarella, fresh sweet basil, cold-pressed EVOO.',
      price: '$15.00',
      weight: '200g',
      image: '/images/dmollo-hero-pizza.jpg',
      thumb: '/images/dmollo-hero-pizza.jpg'
    },
    {
      id: 'diavola',
      name: 'Spicy Diavola',
      ingredients: 'spicy artisanal salami, San Marzano tomato sugo, smoked scamorza, fiery pickled Calabrian chilies.',
      price: '$17.00',
      weight: '220g',
      image: '/images/dmollo-experience-pizza.jpg',
      thumb: '/images/dmollo-experience-pizza.jpg'
    },
    {
      id: 'truffle',
      name: 'Truffle Mushroom',
      ingredients: 'wild forest porcini, white truffle oil glaze, creamy whole burrata crest, fresh thyme.',
      price: '$16.00',
      weight: '240g',
      image: '/images/dmollo-ambience-detail.jpg',
      thumb: '/images/dmollo-ambience-detail.jpg'
    },
    {
      id: 'bbq',
      name: 'BBQ Chicken',
      ingredients: 'grilled chicken, BBQ sauce, mozzarella, red onions, fresh herbs.',
      price: '$16.00',
      weight: '230g',
      image: '/images/dmollo-hero-pizza.jpg',
      thumb: '/images/dmollo-hero-pizza.jpg'
    }
  ];

  readonly selectedHeroPizzaIndex = signal<number>(0);
  readonly selectedHeroPizza = computed(() => this.heroPizzas[this.selectedHeroPizzaIndex()]);

  // Experience Steps Data matching exact reference image
  readonly experienceSteps: ExperienceStep[] = [
    {
      id: 1,
      num: '01',
      title: 'Fresh Ingredients',
      headingText: 'From Fresh Ingredients',
      headingAccent: 'to Your Table',
      description: 'Watch simple ingredients transform into an extraordinary pizza. At D’Mollo, it’s not just food — it’s a journey of flavor, tradition, and passion.',
      image: '/images/dmollo-experience-pizza.png',
      handwritten: 'Good Ingredients\nGreat Stories'
    },
    {
      id: 2,
      num: '02',
      title: 'Art of Making',
      headingText: 'The Artisanal Craft',
      headingAccent: 'of Pizza Dough',
      description: 'Our master pizzaiolos naturally ferment dough for 48 hours, hand-stretching every pie to achieve the signature light, airy leopard crust.',
      image: '/images/dmollo-pizzaiolo.jpg',
      handwritten: 'Handcrafted\nWith Passion'
    },
    {
      id: 3,
      num: '03',
      title: 'Baked to Perfection',
      headingText: 'Fired in Italian',
      headingAccent: 'Stone Ovens',
      description: 'Baked at 900°F over wood-burning timber, locking in rich smoky aromas and melting imported fior di latte mozzarella to gold.',
      image: '/images/dmollo-ambience-detail.jpg',
      handwritten: '900°F Wood Fired\nPerfection'
    },
    {
      id: 4,
      num: '04',
      title: 'Served with Love',
      headingText: 'Warm Hospitality',
      headingAccent: 'At Your Table',
      description: 'Delivered piping hot with fresh basil, extra virgin olive oil drizzle, and genuine Neapolitan passion right to your table.',
      image: '/images/dmollo-dining.jpg',
      handwritten: 'Served Hot\nWith Love'
    }
  ];

  readonly activeExperienceStep = computed(() => this.experienceSteps[this.activeExperienceStepIndex()]);

  readonly activeExperienceStepBackground = computed(() => {
    const img = this.activeExperienceStep()?.image || '/images/dmollo-experience-pizza.jpg';
    return `linear-gradient(180deg, rgba(11, 13, 12, 0.84) 0%, rgba(11, 13, 12, 0.95) 100%), radial-gradient(circle at 50% 35%, rgba(255, 100, 26, 0.22) 0%, transparent 65%), url('${img}') center/cover no-repeat`;
  });

  selectExperienceStep(index: number): void {
    this.activeExperienceStepIndex.set(index);
  }

  // Menu Catalog matching exact reference image
  readonly menuItems = signal<PizzaItem[]>([
    {
      id: 'p1',
      name: 'Margherita Classica',
      subtitle: 'Classic Neapolitan',
      description: 'Fresh tomatoes, mozzarella, basil, olive oil.',
      price: 15.00,
      category: 'classic',
      image: '/images/margherita-pizza-hq.jpg'
    },
    {
      id: 'p2',
      name: 'Truffle Mushroom',
      subtitle: 'Earthy Indulgence',
      description: 'Wild mushrooms, truffle oil, mozzarella.',
      price: 18.00,
      category: 'special',
      image: '/images/burrata-truffle.jpg'
    },
    {
      id: 'p3',
      name: 'Spicy Diavola',
      subtitle: 'Chef’s Special',
      description: 'Spicy salami, mozzarella, chili flakes.',
      price: 17.00,
      category: 'special',
      image: '/images/diavola-pizza-hq.jpg',
      isSpecial: true
    },
    {
      id: 'p4',
      name: 'BBQ Chicken',
      subtitle: 'Smoky & Savory',
      description: 'Grilled chicken, BBQ sauce, red onions.',
      price: 16.00,
      category: 'non-veg',
      image: '/images/seafood-pizza-hq.jpg'
    },
    {
      id: 'p5',
      name: 'Quattro Formaggi',
      subtitle: 'Four Cheese',
      description: 'Gorgonzola, mozzarella, parmesan, scamorza with wildflower honey.',
      price: 18.00,
      category: 'classic',
      image: '/images/dmollo-hero-pizza.jpg'
    },
    {
      id: 'p6',
      name: 'Garden Ortolana',
      subtitle: 'Vegetarian Delight',
      description: 'Charred bell peppers, red onions, zucchini, olives, oregano.',
      price: 15.50,
      category: 'veg',
      image: '/images/dmollo-experience-pizza.jpg'
    },
    {
      id: 'p7',
      name: 'Wood-Fired Garlic Bread',
      subtitle: 'Artisan Side',
      description: 'Freshly baked sourdough garlic bread with roasted rosemary butter.',
      price: 9.00,
      category: 'sides',
      image: '/images/dmollo-ambience-detail.jpg'
    },
    {
      id: 'p8',
      name: 'Artisanal Tiramisù',
      subtitle: 'House Dessert',
      description: 'Ladyfingers soaked in dark espresso & Marsala, mascarpone cream.',
      price: 10.00,
      category: 'desserts',
      image: '/images/dmollo-ambience-main.jpg'
    },
    {
      id: 'p9',
      name: 'Italian Espresso & Cappuccino',
      subtitle: 'Artisan Coffee',
      description: 'Single or double shot organic Italian espresso with silky steamed milk foam.',
      price: 6.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p10',
      name: 'Iced Caramel Macchiato',
      subtitle: 'Cold Brew Coffee',
      description: 'Cold brewed Italian espresso, vanilla bean syrup, cold milk & caramel drizzle.',
      price: 7.00,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p11',
      name: 'San Pellegrino Mineral Water',
      subtitle: 'Water Bottle',
      description: 'Chilled natural sparkling mineral water bottle imported from Bergamo, Italy.',
      price: 4.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p12',
      name: 'Italian Cold Drink Limonata',
      subtitle: 'Cold Drink Refreshment',
      description: 'Sparkling Sicilian lemon cold drink with fresh mint & crushed ice.',
      price: 5.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p13',
      name: 'Rosemary Blood Orange Spritz',
      subtitle: 'Signature Beverage',
      description: 'Blood orange reduction, sparkling water, fresh rosemary sprig.',
      price: 7.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p14',
      name: 'Affogato al Caffè',
      subtitle: 'Espresso & Gelato',
      description: 'Hot artisanal espresso poured over vanilla bean gelato with dark chocolate shavings.',
      price: 8.00,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?auto=format&fit=crop&w=800&q=80'
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
    this.isCartOpen.set(true);
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

  submitReservation(e: Event): void {
    e.preventDefault();
    this.isReservationOpen.set(false);
    this.showToast(`Table reserved for ${this.resGuests} on ${this.resDate} at ${this.resTime}!`);
  }

  checkoutWhatsApp(): void {
    const items = this.cart();
    if (items.length === 0) return;
    
    let text = `🍕 *NEW D'MOLLO PIZZERIA ORDER*\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.pizza.name}* x${item.quantity} - $${(item.pizza.price * item.quantity).toFixed(2)}\n`;
    });
    text += `\n💰 *Total Amount:* $${this.cartTotalPrice().toFixed(2)}\n`;
    text += `\nPlease confirm my order and delivery time! Thank you!`;
    
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919812345678?text=${encoded}`;
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
    this.isCartOpen.set(false);
    this.showToast('Redirecting to WhatsApp for instant order confirmation!');
  }

  openPizzaDetails(pizza: PizzaItem): void {
    this.selectedPizzaForModal.set(pizza);
    this.isMenuDetailsModalOpen.set(true);
  }

  closePizzaDetails(): void {
    this.isMenuDetailsModalOpen.set(false);
  }

  readonly highlightedCardIndex = signal<number>(2);

  showPizzaMenu(): void {
    this.activeCategory.set('all');
    this.menuSliceOffset.set(0);
    this.showToast('Displaying All Artisanal Pizzas!');
  }

  showCoffeeMenu(): void {
    this.activeCategory.set('beverages');
    this.menuSliceOffset.set(0);
    this.showToast('Displaying Coffee & Artisanal Beverage items!');
  }

  shiftMenuCards(): void {
    const total = this.menuItems().length;
    this.menuSliceOffset.update(offset => (offset + 1) % total);
    this.highlightedCardIndex.update(idx => (idx + 1) % 4);
    this.showToast('Sliding to next artisanal menu items!');
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3200);
  }
}
