import { Component, signal, computed, ElementRef, viewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface PizzaItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: 'all' | 'classics' | 'signature' | 'vegetarian' | 'seafood' | 'desserts' | 'beverages';
  image: string;
  isSpecial?: boolean;
}

export interface CartItem {
  pizza: PizzaItem;
  quantity: number;
}

export interface CraftStep {
  num: number;
  title: string;
  icon: string;
  subtitle: string;
}

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

export interface HeroPizza {
  id: string;
  name: string;
  ingredients: string;
  price: string;
  weight: string;
  image: string;
  thumb: string;
}

import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { CraftComponent } from './components/craft/craft.component';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { LocationFooterComponent } from './components/location-footer/location-footer.component';
import { PizzaService } from './services/pizza.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    HeroComponent,
    CraftComponent,
    MenuSectionComponent,
    ReservationsComponent,
    LocationFooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public pizzaService: PizzaService
  ) {}
  readonly activeCategory = signal<string>('all');
  readonly isSearchOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly isReservationOpen = signal<boolean>(false);
  readonly isCartOpen = signal<boolean>(false);
  readonly isStoryModalOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly toastMessage = signal<string | null>(null);

  // Craft Section State & Pillars (Left Content + Right Image)
  readonly craftPillars: CraftPillar[] = [
    {
      id: 'sourdough',
      num: 1,
      title: '48h Sourdough',
      icon: '🌾',
      badge: '48-Hour Cold Ferment',
      tagline: 'Light, Digestible & Airy Cornicione',
      description: 'Our dough is cold-fermented for a minimum of 48 hours using imported Caputo 00 flour and wild sourdough starter. This creates a signature blistered crust that is incredibly light, fragrant, and easily digestible.',
      image: '/images/dough-ball.jpg'
    },
    {
      id: 'tomatoes',
      num: 2,
      title: 'San Marzano D.O.P.',
      icon: '🍅',
      badge: 'Volcanic Soil Tomatoes',
      tagline: 'Sweet, Low Acidity & Rich Volcanic Flavor',
      description: 'Grown in the sun-drenched volcanic soil of Mount Vesuvius in Campania, San Marzano D.O.P. plum tomatoes are crushed by hand to preserve their natural sweetness and vibrant ruby color without bitter seeds.',
      image: '/images/tomatoes.jpg'
    },
    {
      id: 'mozzarella',
      num: 3,
      title: 'Fior di Latte',
      icon: '🧀',
      badge: 'Artisan Fresh Mozzarella',
      tagline: 'Creamy Melt & Delicate Milk Fragrance',
      description: 'Sourced daily from local artisan cheese makers, our Fior di Latte is torn by hand just moments before entering the oven. It melts into a velvety, creamy pool that perfectly balances our tangy tomato sugo.',
      image: '/images/mozzarella.jpg'
    },
    {
      id: 'hearth',
      num: 4,
      title: '450°C Stone Hearth',
      icon: '🔥',
      badge: '90-Second Neapolitan Bake',
      tagline: 'Blistered Crust & Melted Perfection',
      description: 'Slid onto a beechwood peel and thrust into our 450°C dome hearth stone oven, every pizza cooks in just 90 seconds. The intense heat locks in moisture while giving the crust its prized leopard-spotted char.',
      image: '/images/chef-craft.jpg'
    }
  ];

  readonly selectedCraftIndex = signal<number>(0);
  readonly selectedCraftPillar = computed(() => this.craftPillars[this.selectedCraftIndex()]);

  selectCraftPillar(index: number): void {
    this.selectedCraftIndex.set(index);
  }

  readonly currentTime = signal<string>('');

  // Live Real-Time Activities
  readonly recentActivities = [
    'Piping hot Margherita Classica just slid out of 450°C oven',
    'Chef handcrafted fresh batch of 48-hour slow fermented sourdough',
    'Table 4 reserved for romantic candlelit dinner tonight',
    'Diavola Piccante with smoked scamorza just served',
    'Fresh Fior di Latte delivered from local dairy artisan'
  ];
  readonly currentActivityIndex = signal<number>(0);
  readonly currentActivity = computed(() => this.recentActivities[this.currentActivityIndex()]);

  // ==========================================================================
  // HERO STATE & HIGH QUALITY PIZZAS (HOME STORY VS PIZZA SHOWCASE)
  // ==========================================================================
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

  selectHeroPizza(index: number): void {
    this.heroMode.set('pizza');
    this.selectedHeroPizzaIndex.set(index);
    this.animateHeroPizzaChange();
  }

  showBrandStory(): void {
    this.heroMode.set('story');
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.fromTo('#hero-giant-pizza',
      { scale: 0.9, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }
    );
    gsap.fromTo('.hero-animated-text',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
    );
  }

  nextHeroPizza(): void {
    this.heroMode.set('pizza');
    const nextIdx = (this.selectedHeroPizzaIndex() + 1) % this.heroPizzas.length;
    this.selectHeroPizza(nextIdx);
  }

  prevHeroPizza(): void {
    this.heroMode.set('pizza');
    const prevIdx = (this.selectedHeroPizzaIndex() - 1 + this.heroPizzas.length) % this.heroPizzas.length;
    this.selectHeroPizza(prevIdx);
  }

  animateHeroPizzaChange(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Animate the main giant pizza entering from the right side
    gsap.fromTo('#hero-giant-pizza',
      {
        xPercent: 70,
        rotation: 40,
        opacity: 0,
        scale: 0.88
      },
      {
        xPercent: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out'
      }
    );

    // Animate text elements (title, ingredients, price)
    gsap.fromTo('.hero-animated-text',
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out'
      }
    );
  }

  // Gallery Active Slide
  readonly activeGalleryIndex = signal<number>(0);

  // Lenis & Timeline references
  private lenis: Lenis | null = null;
  private assemblyTimeline: gsap.core.Timeline | null = null;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  private clockTimer: ReturnType<typeof setInterval> | null = null;
  private activityTimer: ReturnType<typeof setInterval> | null = null;

  // ViewChilds for ScrollTrigger targeting
  readonly assemblySection = viewChild<ElementRef<HTMLElement>>('assemblySection');
  readonly menuScrollTrack = viewChild<ElementRef<HTMLElement>>('menuScrollTrack');

  // Menu Catalog (Editorial items from the shared design)
  readonly menuItems = signal<PizzaItem[]>([
    {
      id: 'p1',
      name: 'Margherita Classica',
      subtitle: 'Napoli Tradition',
      description: 'San Marzano D.O.P. crushed tomatoes, fior di latte mozzarella, fresh sweet basil, cold-pressed EVOO.',
      price: 450,
      category: 'classics',
      image: '/images/hero-pizza.jpg'
    },
    {
      id: 'p2',
      name: 'Diavola Piccante',
      subtitle: 'Fiery & Bold',
      description: 'Spicy artisanal salami, San Marzano tomato sugo, smoked scamorza, fiery pickled Calabrian chilies.',
      price: 520,
      category: 'signature',
      image: '/images/hero-pizza.jpg',
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
      category: 'classics',
      image: '/images/hero-pizza.jpg'
    },
    {
      id: 'p5',
      name: 'Caprese Fresca',
      subtitle: 'Fresh & Light',
      description: 'Blistered sweet cherry tomatoes, fresh buffalo mozzarella pearls, baby arugula rocket, aged balsamic glaze.',
      price: 480,
      category: 'vegetarian',
      image: '/images/burrata-truffle.jpg'
    },
    {
      id: 'p6',
      name: 'Prosciutto e Rucola',
      subtitle: 'The Classic Masterpiece',
      description: '18-month aged Prosciutto di Parma, peppery wild rocket, 24-month shaved Parmigiano Reggiano.',
      price: 560,
      category: 'signature',
      image: '/images/hero-pizza.jpg'
    },
    {
      id: 'p7',
      name: 'Pesto Genovese',
      subtitle: 'Ligurian Green',
      description: 'Fragrant pine nut basil pesto emulsion, sundried cherry tomatoes, toasted pine nuts, fresh mozzarella.',
      price: 500,
      category: 'vegetarian',
      image: '/images/gallery-garnish.jpg'
    },
    {
      id: 'p8',
      name: 'Napoletana Special',
      subtitle: "Chef's Signature Pie",
      description: "Chef's special with seasonal Italian truffles, fior di latte, cured speck, and sweet hot honey.",
      price: 620,
      category: 'signature',
      image: '/images/hero-pizza.jpg',
      isSpecial: true
    },
    {
      id: 'p9',
      name: 'Frutti di Mare',
      subtitle: 'Neapolitan Coast',
      description: 'Pan-seared calamari rings, wild tiger prawns, garlic confit, cherry tomatoes, fresh flat-leaf parsley.',
      price: 690,
      category: 'seafood',
      image: '/images/burrata-truffle.jpg'
    },
    {
      id: 'p10',
      name: 'Tiramisu Tradizionale',
      subtitle: 'Dolci Al Cucchiaio',
      description: 'Savoiardi ladyfingers soaked in dark espresso & marsala essence, layered with velvety mascarpone and Dutch cocoa.',
      price: 395,
      category: 'desserts',
      image: '/images/interior.jpg'
    },
    {
      id: 'p11',
      name: 'Blood Orange & Rosemary Spritz',
      subtitle: 'Artisan Refresher',
      description: 'Sicilian blood orange reduction, artisanal sparkling tonic, bruised rosemary sprig, dehydrated citrus.',
      price: 295,
      category: 'beverages',
      image: '/images/burrata-truffle.jpg'
    }
  ]);

  // Filtered Menu Computed
  readonly filteredMenu = computed(() => {
    const category = this.activeCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return this.menuItems().filter(item => {
      const matchesCat = category === 'all' || item.category === category;
      const matchesQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    });
  });

  // Cart Management
  readonly cart = signal<CartItem[]>([]);

  readonly cartTotalCount = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly cartTotalPrice = computed(() => {
    return this.cart().reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0);
  });

  // Reservation Form Model
  resName = '';
  resPhone = '';
  resGuests = '2 Guests (Date Night)';
  resDate = this.getTomorrowDate();
  resTime = '07:30 PM (Dinner Prime)';
  resNotes = '';

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initLenisAndScrollTriggers();
      this.updateClock();
      this.clockTimer = setInterval(() => this.updateClock(), 1000);
      this.activityTimer = setInterval(() => {
        this.currentActivityIndex.update(idx => (idx + 1) % this.recentActivities.length);
      }, 4500);
    }
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
    if (this.clockTimer) clearInterval(this.clockTimer);
    if (this.activityTimer) clearInterval(this.activityTimer);
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  getTomorrowDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  private updateClock(): void {
    const now = new Date();
    this.currentTime.set(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
  }

  // ==========================================================================
  // LENIS SMOOTH SCROLL & CINEMATIC GSAP TIMELINES
  // ==========================================================================
  private initLenisAndScrollTriggers(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 1. HERO SCROLL TRANSITION TIMELINE (Pizza shifts down & hides on scroll) - disabled on mobile
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      heroTl.to('#hero-left-content', {
        opacity: 0,
        y: -60,
        ease: 'power1.out'
      }, 0);

      heroTl.to('#hero-giant-pizza', {
        y: 160,
        rotation: 24,
        scale: 0.82,
        opacity: 0,
        ease: 'power1.inOut'
      }, 0);
    }

    // 2. THE CRAFT SHOWCASE IMAGE SCROLL PARALLAX
    gsap.fromTo('.craft-showcase-photo', 
      { yPercent: -12, scale: 1.08 },
      { 
        yPercent: 12,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#assembly-stage',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    // 3. EDITORIAL OUR STORY IMAGES SCROLL PARALLAX & HIDE TRANSITION
    gsap.fromTo('#story-pizzaiolo-img', 
      { yPercent: -18, scale: 1.1, opacity: 0.9 },
      { 
        yPercent: 18,
        scale: 0.96,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#story-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    gsap.fromTo('.inset-polaroid-img', 
      { yPercent: -15, rotation: -3 },
      { 
        yPercent: 15,
        rotation: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-inset-polaroid',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

  }

  // Horizontal Menu Drag / Track Navigation
  scrollMenuTrack(direction: 'left' | 'right'): void {
    const track = this.menuScrollTrack()?.nativeElement;
    if (!track) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  // Cart Actions
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

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  checkoutViaWhatsApp(): void {
    const items = this.cart();
    if (items.length === 0) {
      this.showToast('Your bag is empty!');
      return;
    }

    let msg = `*🍕 New Order Request - D'Molto Pizzeria*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.pizza.name}* (x${item.quantity}) - ₹${item.pizza.price * item.quantity}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Total Amount:* ₹${this.cartTotalPrice()}\n`;
    msg += `*Location:* 130 Model Town Road, Ludhiana\n`;
    msg += `Please confirm order preparation. Thank you!`;

    const url = `https://wa.me/918360340447?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  // Reservation Actions
  openReservationModal(): void {
    this.isReservationOpen.set(true);
  }

  closeReservationModal(): void {
    this.isReservationOpen.set(false);
  }

  submitReservation(e: Event): void {
    e.preventDefault();
    if (!this.resName || !this.resPhone) {
      this.showToast('Please provide your name and contact phone.');
      return;
    }

    let msg = `*🍷 Table Reservation Request - D'Molto Pizzeria*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Guest Name:* ${this.resName}\n`;
    msg += `*Phone:* ${this.resPhone}\n`;
    msg += `*Party Size:* ${this.resGuests}\n`;
    msg += `*Date:* ${this.resDate}\n`;
    msg += `*Time Slot:* ${this.resTime}\n`;
    if (this.resNotes) {
      msg += `*Special Requests:* ${this.resNotes}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Looking forward to your reservation confirmation!`;

    const url = `https://wa.me/918360340447?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    this.closeReservationModal();
    this.showToast('Reservation request sent to concierge!');
  }

  // Story Video Modal
  openStoryModal(): void {
    this.isStoryModalOpen.set(true);
  }

  closeStoryModal(): void {
    this.isStoryModalOpen.set(false);
  }

  // Gallery Navigation
  prevGallery(): void {
    const cur = this.activeGalleryIndex();
    this.activeGalleryIndex.set(cur > 0 ? cur - 1 : 2);
  }

  nextGallery(): void {
    const cur = this.activeGalleryIndex();
    this.activeGalleryIndex.set(cur < 2 ? cur + 1 : 0);
  }

  // Toast Helper
  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3200);
  }
}
