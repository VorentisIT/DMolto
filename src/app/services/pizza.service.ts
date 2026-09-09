import { Injectable, signal, computed, effect } from '@angular/core';

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

  constructor() {
    effect(() => {
      const modalOpen = this.isReservationOpen() || this.isCartOpen() || this.isMobileMenuOpen() || this.isMenuDetailsModalOpen() || this.isStoryModalOpen();
      if (typeof document !== 'undefined') {
        if (modalOpen) {
          document.body.classList.add('modal-open-lock');
          document.body.style.overflow = 'hidden';
          document.body.style.touchAction = 'none';
        } else {
          document.body.classList.remove('modal-open-lock');
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
        }
      }
    });
  }

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
      description: 'San Marzano D.O.P. tomatoes, fior di latte mozzarella, sweet basil, EVOO.',
      price: 15.00,
      category: 'classic',
      image: '/images/margherita-pizza-hq.jpg'
    },
    {
      id: 'p2',
      name: 'Pepperoni Classico',
      subtitle: 'Traditional Favorite',
      description: 'Double cured pepperoni, San Marzano sugo, aged mozzarella, oregano.',
      price: 16.50,
      category: 'classic',
      image: '/images/diavola-pizza-hq.jpg'
    },
    {
      id: 'p3',
      name: 'Quattro Formaggi',
      subtitle: 'Four Cheese Classic',
      description: 'Gorgonzola, mozzarella, parmesan, scamorza with wildflower honey.',
      price: 18.00,
      category: 'classic',
      image: '/images/dmollo-hero-pizza.jpg'
    },
    {
      id: 'p4',
      name: 'Marinara Originale',
      subtitle: 'Authentic Heritage',
      description: 'San Marzano tomato sugo, roasted garlic, wild oregano, extra virgin olive oil.',
      price: 14.00,
      category: 'classic',
      image: '/images/dmollo-hero-pizza.png'
    },
    {
      id: 'p5',
      name: 'Capricciosa Tradizionale',
      subtitle: 'Classic Italian',
      description: 'Italian ham, artichoke hearts, wild mushrooms, black olives, mozzarella.',
      price: 17.50,
      category: 'classic',
      image: '/images/dmollo-experience-pizza.jpg'
    },

    // VEG CATEGORY
    {
      id: 'p6',
      name: 'Garden Ortolana',
      subtitle: 'Vegetarian Delight',
      description: 'Charred bell peppers, red onions, zucchini, Kalamata olives, fresh oregano.',
      price: 15.50,
      category: 'veg',
      image: '/images/dmollo-experience-pizza.png'
    },
    {
      id: 'p7',
      name: 'Wild Mushroom & Truffle',
      subtitle: 'Forest Harvest',
      description: 'Porcini & cremini mushrooms, white truffle oil, fontina & fior di latte.',
      price: 17.50,
      category: 'veg',
      image: '/images/burrata-truffle.jpg'
    },
    {
      id: 'p8',
      name: 'Pesto Burrata Supreme',
      subtitle: 'Artisan Green',
      description: 'Fresh basil pesto base, whole creamy burrata, cherry tomatoes, pine nuts.',
      price: 18.50,
      category: 'veg',
      image: '/images/dmollo-ambience-detail.jpg'
    },
    {
      id: 'p9',
      name: 'Spinach & Ricotta Bianca',
      subtitle: 'White Sauce Specialty',
      description: 'Baby spinach, whipped lemon ricotta, roasted garlic flakes, provolone.',
      price: 16.00,
      category: 'veg',
      image: '/images/dmollo-hero-pizza.jpg'
    },

    // NON-VEG CATEGORY
    {
      id: 'p10',
      name: 'BBQ Smoked Chicken',
      subtitle: 'Smoky & Savory',
      description: 'Grilled hickory chicken, sweet BBQ reduction, red onions, smoked scamorza.',
      price: 16.00,
      category: 'non-veg',
      image: '/images/seafood-pizza-hq.jpg'
    },
    {
      id: 'p11',
      name: 'Prosciutto e Funghi',
      subtitle: 'Italian Heritage',
      description: 'Prosciutto cotto, wood-roasted mushrooms, fior di latte, fresh thyme.',
      price: 18.50,
      category: 'non-veg',
      image: '/images/dmollo-dining.jpg'
    },
    {
      id: 'p12',
      name: 'Carnivora Meat Feast',
      subtitle: 'Bold & Hearty',
      description: 'Artisanal salami, Italian sausage, smoked bacon, pepperoni, chili oil.',
      price: 19.50,
      category: 'non-veg',
      image: '/images/diavola-pizza-hq.jpg'
    },
    {
      id: 'p13',
      name: 'Salame Piccante & Honey',
      subtitle: 'Sweet & Spicy',
      description: 'Crispy cup pepperoni, spicy Calabrian salame, hot habanero honey drizzle.',
      price: 17.50,
      category: 'non-veg',
      image: '/images/dmollo-hero-bg-cover.jpg'
    },

    // CHEF'S SPECIAL CATEGORY
    {
      id: 'p14',
      name: 'Spicy Diavola',
      subtitle: 'Chef’s Special',
      description: 'Spicy salami, fior di latte mozzarella, pickled Calabrian chili flakes.',
      price: 17.00,
      category: 'special',
      image: '/images/diavola-pizza-hq.jpg',
      isSpecial: true
    },
    {
      id: 'p15',
      name: 'Truffle Burrata Indulgence',
      subtitle: 'Gourmet Masterpiece',
      description: 'Wild forest porcini, white truffle oil glaze, creamy whole burrata crest.',
      price: 19.00,
      category: 'special',
      image: '/images/burrata-truffle.jpg',
      isSpecial: true
    },
    {
      id: 'p16',
      name: 'Pistachio & Mortadella',
      subtitle: 'Signature Creation',
      description: 'Slow-roasted Mortadella Bologna, crushed Bronte pistachios, stracciatella.',
      price: 20.00,
      category: 'special',
      image: '/images/dmollo-pizzaiolo.jpg',
      isSpecial: true
    },
    {
      id: 'p17',
      name: 'Gold Leaf Prosciutto Star',
      subtitle: 'Luxury Reserve',
      description: '24-month aged Prosciutto di Parma, black truffle pearls, edible gold shimmer.',
      price: 22.00,
      category: 'special',
      image: '/images/dmollo-ambience-main.jpg',
      isSpecial: true
    },

    // BEVERAGES & SIDES
    {
      id: 'p18',
      name: 'Italian Espresso & Cappuccino',
      subtitle: 'Artisan Coffee',
      description: 'Organic Italian dark roast espresso with silky steamed milk foam.',
      price: 6.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p19',
      name: 'Iced Caramel Macchiato',
      subtitle: 'Cold Brew Coffee',
      description: 'Cold brewed Italian espresso, vanilla bean syrup, cold milk & caramel drizzle.',
      price: 7.00,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p20',
      name: 'San Pellegrino Mineral Water',
      subtitle: 'Water Bottle',
      description: 'Chilled natural sparkling mineral water bottle imported from Bergamo, Italy.',
      price: 4.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p21',
      name: 'Italian Cold Drink Limonata',
      subtitle: 'Cold Drink Refreshment',
      description: 'Sparkling Sicilian lemon cold drink with fresh mint & crushed ice.',
      price: 5.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p22',
      name: 'Rosemary Blood Orange Spritz',
      subtitle: 'Signature Beverage',
      description: 'Blood orange reduction, sparkling water, fresh rosemary sprig.',
      price: 7.50,
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'p23',
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
      const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.subtitle.toLowerCase().includes(query);
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

  openReservation(): void {
    const elem = document.getElementById('reservations-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    this.isReservationOpen.set(true);
  }

  submitReservation(e: Event): void {
    if (e) e.preventDefault();
    this.isReservationOpen.set(false);
    const guestText = this.resGuests || '2 Guests';
    const timeText = this.resTime || '07:00 PM';
    const nameText = this.resName ? ` for ${this.resName}` : '';
    this.showToast(`🎉 Reservation confirmed${nameText}! Table for ${guestText} on ${this.resDate} at ${timeText}.`);
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
