/**
 * D'MOLTO PIZZERIA & CAFE - INTERACTIVE ENGINE
 * Powered by UI/UX Pro Max & 21st.dev motion patterns
 */

// ==========================================================================
// 1. MENU DATA REPOSITORY
// ==========================================================================
const MENU_DATA = [
  // Wood-Fired Classics
  {
    id: "p1",
    name: "Margherita D’Molto Supreme",
    category: "wood-fired",
    diet: "veg",
    price: 545,
    isSpecial: true,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "Crushed San Marzano D.O.P. tomatoes, fresh fior di latte mozzarella, sweet basil leaves, cold-pressed EVOO, 48hr sourdough.",
    isPizza: true
  },
  {
    id: "p2",
    name: "Quattro Formaggi Con Miele",
    category: "wood-fired",
    diet: "veg",
    price: 645,
    isSpecial: false,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "Melted Gorgonzola dolce, smoked scamorza, Parmigiano Reggiano, creamy fior di latte, finished with hot wildflower honey.",
    isPizza: true
  },
  {
    id: "p3",
    name: "Diavola Calabrese Piccante",
    category: "wood-fired",
    diet: "non-veg",
    price: 685,
    isSpecial: true,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "Spicy Italian pepperoni salame, charred pickled jalapeños, crushed tomato sugo, mozzarella, hot chilli oil drizzle.",
    isPizza: true
  },
  {
    id: "p4",
    name: "Verdure Grigliate & Burrata",
    category: "wood-fired",
    diet: "veg",
    price: 625,
    isSpecial: false,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Charred zucchini, bell peppers, Kalamata olives, sundried tomatoes, crowned with a fresh creamy burrata crest.",
    isPizza: true
  },

  // Gourmet Signatures
  {
    id: "p5",
    name: "Tartufo Nero & Funghi Selvatici",
    category: "gourmet",
    diet: "veg",
    price: 745,
    isSpecial: true,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Black summer Italian truffle glaze, wild porcini and portobello mushrooms, whole burrata, fresh thyme, fleur de sel.",
    isPizza: true
  },
  {
    id: "p6",
    name: "Prosciutto Di Parma & Rocket",
    category: "gourmet",
    diet: "non-veg",
    price: 795,
    isSpecial: true,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "18-month aged Prosciutto di Parma, crisp baby arugula, 24-month shaved Parmigiano Reggiano, aged Modena balsamic drizzle.",
    isPizza: true
  },
  {
    id: "p7",
    name: "Pollo Affumicato & Genovese Pesto",
    category: "gourmet",
    diet: "non-veg",
    price: 695,
    isSpecial: false,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "Slow-smoked tender chicken breast, house-pounded pine nut basil pesto, blistered cherry tomatoes, fresh buffalo mozzarella.",
    isPizza: true
  },

  // Antipasti & Starters
  {
    id: "a1",
    name: "Rosemary Garlic Sourdough Focaccia",
    category: "antipasti",
    diet: "veg",
    price: 345,
    isSpecial: false,
    image: "assets/images/chef-craft.jpg",
    ingredients: "Wood-fired sourdough focaccia dimpled with roasted garlic confit cloves, fresh rosemary, Maldon sea salt, EVOO dip.",
    isPizza: false
  },
  {
    id: "a2",
    name: "Burrata Fritta Dorata",
    category: "antipasti",
    diet: "veg",
    price: 465,
    isSpecial: true,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Golden panko-crusted warm burrata ball melting over hot San Marzano marinara, basil oil, toasted sourdough crisps.",
    isPizza: false
  },
  {
    id: "a3",
    name: "Polpette Al Forno Napoletane",
    category: "antipasti",
    diet: "non-veg",
    price: 495,
    isSpecial: true,
    image: "assets/images/interior.jpg",
    ingredients: "Wood-fired Italian meatballs braised in rich San Marzano tomato sugo, molten provolone, fresh flat-leaf parsley.",
    isPizza: false
  },
  {
    id: "a4",
    name: "Truffle & Grana Padano Fries",
    category: "antipasti",
    diet: "veg",
    price: 325,
    isSpecial: false,
    image: "assets/images/hero-pizza.jpg",
    ingredients: "Hand-cut crisp potato wedges infused with aromatic white truffle oil, grated Grana Padano, rosemary sea salt.",
    isPizza: false
  },

  // Specialty Barista & Coffee
  {
    id: "c1",
    name: "D’Molto Woodfire Smoked Espresso",
    category: "coffee",
    diet: "veg",
    price: 195,
    isSpecial: true,
    image: "assets/images/interior.jpg",
    ingredients: "Intense double ristretto extraction from single-origin Arabica, notes of roasted dark chocolate and toasted hazelnuts.",
    isPizza: false
  },
  {
    id: "c2",
    name: "Velvet Flat White",
    category: "coffee",
    diet: "veg",
    price: 245,
    isSpecial: false,
    image: "assets/images/interior.jpg",
    ingredients: "Double espresso infused with silky micro-foamed whole milk, delicate latte art, smooth cocoa finish.",
    isPizza: false
  },
  {
    id: "c3",
    name: "Iced Spanish Cortado",
    category: "coffee",
    diet: "veg",
    price: 265,
    isSpecial: false,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Rich espresso layered over sweet condensed milk, poured over crystal-clear ice rocks.",
    isPizza: false
  },
  {
    id: "c4",
    name: "Affogato Al Caffe Tradizionale",
    category: "coffee",
    diet: "veg",
    price: 285,
    isSpecial: true,
    image: "assets/images/interior.jpg",
    ingredients: "Artisanal scoop of Madagascar vanilla bean gelato drowned in a steaming hot double shot of Italian espresso.",
    isPizza: false
  },

  // Italian Dolci & Desserts
  {
    id: "d1",
    name: "Tiramisu Al Mascarpone Classico",
    category: "dolci",
    diet: "veg",
    price: 395,
    isSpecial: true,
    image: "assets/images/interior.jpg",
    ingredients: "Savoiardi ladyfingers soaked in dark espresso and marsala essence, layered with velvety mascarpone and Dutch cocoa.",
    isPizza: false
  },
  {
    id: "d2",
    name: "Sicilian Pistachio Cannoli",
    category: "dolci",
    diet: "veg",
    price: 345,
    isSpecial: false,
    image: "assets/images/interior.jpg",
    ingredients: "Two crisp golden pastry shells piped with sweet sheep ricotta, Candied orange zest, Bronte pistachio crumble.",
    isPizza: false
  },
  {
    id: "d3",
    name: "Nutella & Roasted Hazelnut Calzone",
    category: "dolci",
    diet: "veg",
    price: 425,
    isSpecial: true,
    image: "assets/images/chef-craft.jpg",
    ingredients: "Warm wood-fired folded sourdough oozing with rich Nutella and toasted Italian hazelnuts, dusted with powdered sugar.",
    isPizza: true
  },

  // Refreshers & Spritz
  {
    id: "s1",
    name: "Blood Orange & Rosemary Spritz",
    category: "spritz",
    diet: "veg",
    price: 295,
    isSpecial: true,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Sicilian blood orange reduction, artisanal Indian tonic, bruised garden rosemary sprig, dehydrated citrus wheel.",
    isPizza: false
  },
  {
    id: "s2",
    name: "Amalfi Limoncello Fizz",
    category: "spritz",
    diet: "veg",
    price: 275,
    isSpecial: false,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Cold-pressed lemon juice, fresh mint leaves, pure raw cane syrup, sparkling mountain soda, candied lemon wheel.",
    isPizza: false
  },
  {
    id: "s3",
    name: "Wild Berry & Hibiscus Botanica",
    category: "spritz",
    diet: "veg",
    price: 285,
    isSpecial: false,
    image: "assets/images/burrata-truffle.jpg",
    ingredients: "Sun-dried Egyptian hibiscus tisane, wild raspberry puree, elderflower essence, effervescent mineral water.",
    isPizza: false
  }
];

// ==========================================================================
// 2. STATE MANAGEMENT
// ==========================================================================
let currentCategory = "all";
let currentDiet = "all";
let cart = [];
let customizingItem = null;

// ==========================================================================
// 3. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initLiveOperatingHours();
  initEmberCanvas();
  initTiltEffect();
  initMenuRenderer();
  initCartSystem();
  initCustomizerModal();
  initReservationForm();
  initAudioSoundscape();
  initMobileNav();
  setDefaultReservationDate();
});

// ==========================================================================
// 4. LIVE OPERATING HOURS (MODEL TOWN, LUDHIANA)
// ==========================================================================
function initLiveOperatingHours() {
  function checkHours() {
    // Current date/time in IST (UTC+5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (3600000 * 5.5));

    const currentHour = istDate.getHours();
    const currentMin = istDate.getMinutes();
    const timeDecimal = currentHour + (currentMin / 60);

    // Open from 11:00 AM to 11:00 PM (11.0 to 23.0)
    const isOpen = timeDecimal >= 11.0 && timeDecimal < 23.0;

    const statusPill = document.getElementById("live-status-pill");
    const statusText = document.getElementById("live-status-text");
    const locationBadge = document.getElementById("location-hours-status");

    if (isOpen) {
      if (statusPill) statusPill.style.borderColor = "rgba(34, 197, 94, 0.4)";
      if (statusText) statusText.textContent = "Open Now in Model Town until 11:00 PM";
      if (locationBadge) locationBadge.textContent = "Open Now: 11:00 AM – 11:00 PM";
    } else {
      if (statusPill) {
        statusPill.style.background = "rgba(234, 88, 12, 0.15)";
        statusPill.style.borderColor = "rgba(234, 88, 12, 0.4)";
        statusPill.style.color = "#FB923C";
      }
      if (statusText) statusText.textContent = "Kitchen Opens Today at 11:00 AM";
      if (locationBadge) locationBadge.textContent = "Closed Now • Opens at 11:00 AM";
    }
  }

  checkHours();
  setInterval(checkHours, 60000);
}

// ==========================================================================
// 5. EMBER & FIREFLY PARTICLE CANVAS
// ==========================================================================
function initEmberCanvas() {
  const canvas = document.getElementById("ember-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 55;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Ember {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.decay = Math.random() * 0.003 + 0.001;
      this.color = Math.random() > 0.4 ? "#EA580C" : "#F59E0B";
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
      this.opacity -= this.decay;
      if (this.opacity <= 0 || this.y < -10) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 6. 3D PERSPECTIVE CARD TILT (21st.dev Style)
// ==========================================================================
function initTiltEffect() {
  const card = document.getElementById("hero-tilt-card");
  if (!card) return;

  const wrapper = card.parentElement;

  wrapper.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 9;
    const rotY = (x / (rect.width / 2)) * 9;

    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  wrapper.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });

  // Quick add button inside hero card
  const heroAddBtn = card.querySelector(".quick-add-hero");
  if (heroAddBtn) {
    heroAddBtn.addEventListener("click", () => {
      const heroDish = MENU_DATA.find(d => d.id === "p1");
      if (heroDish) {
        openCustomizer(heroDish);
      }
    });
  }
}

// ==========================================================================
// 7. INTERACTIVE MENU RENDERER
// ==========================================================================
function initMenuRenderer() {
  const grid = document.getElementById("menu-grid");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const chipBtns = document.querySelectorAll(".chip-btn");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      currentCategory = btn.getAttribute("data-category");
      renderMenu();
    });
  });

  chipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      chipBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentDiet = btn.getAttribute("data-diet");
      renderMenu();
    });
  });

  renderMenu();
}

function renderMenu() {
  const grid = document.getElementById("menu-grid");
  if (!grid) return;

  const filtered = MENU_DATA.filter(item => {
    const matchesCat = currentCategory === "all" || item.category === currentCategory;
    let matchesDiet = true;
    if (currentDiet === "veg") matchesDiet = item.diet === "veg";
    if (currentDiet === "non-veg") matchesDiet = item.diet === "non-veg";
    if (currentDiet === "chef") matchesDiet = item.isSpecial === true;
    return matchesCat && matchesDiet;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 0; color: var(--text-dim);">
        <p style="font-size: 1.2rem; font-family: var(--font-serif); margin-bottom: 8px;">No creations found</p>
        <p style="font-size: 0.9rem;">Try selecting a different category or dietary preference above.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="menu-card" data-id="${item.id}">
      <div class="menu-card-media">
        <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" width="380" height="220">
        <div class="badge-group">
          <span class="badge-diet ${item.diet === 'veg' ? 'badge-veg' : 'badge-non-veg'}">
            ${item.diet === 'veg' ? '🌱 Pure Veg' : '🍗 Non-Veg'}
          </span>
          ${item.isSpecial ? '<span class="badge-diet badge-special">⭐ Chef Choice</span>' : ''}
        </div>
      </div>
      <div class="menu-card-body">
        <div class="card-header-row">
          <h3 class="dish-name">${item.name}</h3>
          <span class="dish-cost">₹${item.price}</span>
        </div>
        <p class="dish-ingredients">${item.ingredients}</p>
        <div class="card-actions-row">
          ${item.isPizza ? `
            <button type="button" class="btn-customize" onclick="triggerCustomizer('${item.id}')">
              <i data-lucide="sliders"></i>
              <span>Customize</span>
            </button>
          ` : ''}
          <button type="button" class="btn btn-sm btn-primary btn-add-cart" onclick="quickAddToCart('${item.id}')">
            <i data-lucide="plus"></i>
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Global hook for HTML onclick
window.triggerCustomizer = function(id) {
  const dish = MENU_DATA.find(d => d.id === id);
  if (dish) {
    openCustomizer(dish);
  }
};

window.quickAddToCart = function(id) {
  const dish = MENU_DATA.find(d => d.id === id);
  if (!dish) return;

  const cartItem = {
    dishId: dish.id,
    name: dish.name,
    basePrice: dish.price,
    crust: dish.isPizza ? "Classic 48hr Neapolitan Sourdough" : null,
    extras: [],
    totalPrice: dish.price,
    qty: 1
  };

  addToCart(cartItem);
};

// ==========================================================================
// 8. CUSTOMIZATION MODAL
// ==========================================================================
function initCustomizerModal() {
  const overlay = document.getElementById("customize-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  const addBtn = document.getElementById("modal-add-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeCustomizer);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCustomizer();
    });
  }

  // Handle Radio & Checkbox changes for price updates
  const modal = document.getElementById("customize-modal");
  if (modal) {
    modal.addEventListener("change", updateModalPrice);
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!customizingItem) return;

      const selectedCrustInput = document.querySelector('input[name="crust-choice"]:checked');
      const crust = selectedCrustInput ? selectedCrustInput.value : "Classic 48hr Sourdough";

      const selectedExtras = [];
      let extraPriceTotal = 0;
      document.querySelectorAll('input[name="topping-extra"]:checked').forEach(cb => {
        selectedExtras.push(cb.value);
        extraPriceTotal += parseInt(cb.getAttribute("data-price") || 0, 10);
      });

      let crustExtra = 0;
      if (crust.includes("+₹95")) crustExtra = 95;

      const itemTotal = customizingItem.price + crustExtra + extraPriceTotal;

      const cartItem = {
        dishId: customizingItem.id,
        name: customizingItem.name,
        basePrice: customizingItem.price,
        crust: customizingItem.isPizza ? crust : null,
        extras: selectedExtras,
        totalPrice: itemTotal,
        qty: 1
      };

      addToCart(cartItem);
      closeCustomizer();
    });
  }
}

function openCustomizer(dish) {
  customizingItem = dish;
  const overlay = document.getElementById("customize-modal-overlay");
  const nameEl = document.getElementById("modal-dish-name");
  const descEl = document.getElementById("modal-dish-desc");
  const imgEl = document.getElementById("modal-dish-img");
  const crustSection = document.getElementById("crust-section");

  if (nameEl) nameEl.textContent = dish.name;
  if (descEl) descEl.textContent = dish.ingredients;
  if (imgEl) {
    imgEl.src = dish.image;
    imgEl.alt = dish.name;
  }

  if (crustSection) {
    crustSection.style.display = dish.isPizza ? "block" : "none";
  }

  // Reset checkboxes and radios
  const defaultRadio = document.querySelector('input[name="crust-choice"]');
  if (defaultRadio) defaultRadio.checked = true;
  document.querySelectorAll('input[name="topping-extra"]').forEach(cb => cb.checked = false);

  updateModalPrice();

  if (overlay) {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeCustomizer() {
  const overlay = document.getElementById("customize-modal-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  customizingItem = null;
}

function updateModalPrice() {
  if (!customizingItem) return;

  let total = customizingItem.price;

  const selectedCrust = document.querySelector('input[name="crust-choice"]:checked');
  if (selectedCrust && selectedCrust.value.includes("+₹95")) {
    total += 95;
  }

  document.querySelectorAll('input[name="topping-extra"]:checked').forEach(cb => {
    total += parseInt(cb.getAttribute("data-price") || 0, 10);
  });

  const priceEl = document.getElementById("modal-calculated-price");
  if (priceEl) priceEl.textContent = `₹${total}`;
}

// ==========================================================================
// 9. CART & ORDER DRAWER
// ==========================================================================
function initCartSystem() {
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const closeBtn = document.getElementById("cart-drawer-close");
  const overlay = document.getElementById("cart-drawer-overlay");
  const checkoutBtn = document.getElementById("checkout-whatsapp-btn");

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCart);
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCart();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", dispatchWhatsAppOrder);
  }

  renderCart();
}

function openCart() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

window.closeCart = function() {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
};

function addToCart(newItem) {
  // Check if identical item with same crust and extras already exists
  const existing = cart.find(item => 
    item.dishId === newItem.dishId &&
    item.crust === newItem.crust &&
    JSON.stringify(item.extras) === JSON.stringify(newItem.extras)
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(newItem);
  }

  renderCart();
  showToast(`Added "${newItem.name}" to your order bag!`);
}

function updateItemQty(index, change) {
  if (cart[index]) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    renderCart();
  }
}
window.updateItemQty = updateItemQty;

function renderCart() {
  const container = document.getElementById("cart-items-container");
  const countBadge = document.getElementById("cart-count");
  const subtotalEl = document.getElementById("cart-subtotal");
  const emptyState = document.getElementById("empty-cart-state");

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  if (countBadge) countBadge.textContent = totalCount;

  const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.qty), 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🍕</div>
        <h4>Your bag is feeling light</h4>
        <p>Explore our wood-fired pizzas, appetizers, and specialty barista drinks to add your favorites.</p>
        <a href="#menu" class="btn btn-sm btn-primary" onclick="closeCart()">Explore Menu</a>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item-card">
      <div class="cart-item-top">
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          ${item.crust ? `<p class="cart-item-crust">Crust: ${item.crust}</p>` : ''}
          ${item.extras && item.extras.length > 0 ? `<p class="cart-item-extras">Extras: ${item.extras.join(", ")}</p>` : ''}
        </div>
        <span class="cart-item-price">₹${item.totalPrice * item.qty}</span>
      </div>
      <div class="cart-item-bottom">
        <span style="font-size: 0.78rem; color: var(--text-dim);">₹${item.totalPrice} each</span>
        <div class="cart-qty-control">
          <button type="button" class="qty-btn" onclick="updateItemQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button type="button" class="qty-btn" onclick="updateItemQty(${idx}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function dispatchWhatsAppOrder() {
  if (cart.length === 0) {
    showToast("Please add items to your order bag first!");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.totalPrice * item.qty), 0);

  let message = `*🍕 New Order Request - D'Molto Pizza Ludhiana*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  cart.forEach((item, i) => {
    message += `${i + 1}. *${item.name}* (x${item.qty})\n`;
    if (item.crust) message += `   • Crust: ${item.crust}\n`;
    if (item.extras && item.extras.length > 0) message += `   • Extras: ${item.extras.join(", ")}\n`;
    message += `   • Item Total: ₹${item.totalPrice * item.qty}\n\n`;
  });
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal:* ₹${subtotal}\n`;
  message += `*Outlet:* 130 Model Town Road, Ludhiana\n`;
  message += `Please confirm preparation time and payment link. Thank you!`;

  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/918360340447?text=${encoded}`;
  window.open(whatsappUrl, "_blank");
  showToast("Opening WhatsApp with your order details...");
}

// ==========================================================================
// 10. TABLE RESERVATION BOOKING ENGINE
// ==========================================================================
function setDefaultReservationDate() {
  const dateInput = document.getElementById("res-date");
  if (!dateInput) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.value = `${yyyy}-${mm}-${dd}`;
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

function initReservationForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("res-name").value.trim();
    const phone = document.getElementById("res-phone").value.trim();
    const guests = document.getElementById("res-guests").value;
    const date = document.getElementById("res-date").value;
    const time = document.getElementById("res-time").value;
    const occasion = document.getElementById("res-occasion").value;
    const notes = document.getElementById("res-notes").value.trim();

    if (!name || !phone || !date) {
      showToast("Please fill in your name, phone number, and preferred date.");
      return;
    }

    let message = `*🍷 Table Reservation Request - D'Molto Pizza Ludhiana*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Guest Name:* ${name}\n`;
    message += `*Contact Phone:* ${phone}\n`;
    message += `*Party Size:* ${guests}\n`;
    message += `*Date:* ${date}\n`;
    message += `*Time Slot:* ${time}\n`;
    message += `*Occasion:* ${occasion}\n`;
    if (notes) {
      message += `*Special Requests:* ${notes}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Venue:* 130 Model Town Road, Ludhiana\n`;
    message += `Looking forward to your reservation confirmation!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/918360340447?text=${encoded}`;
    window.open(url, "_blank");

    showToast("Connecting you with D'Molto Concierge on WhatsApp!");
  });
}

// ==========================================================================
// 11. AMBIENT WOODFIRE & CAFE SOUNDSCAPE (Native Web Audio API)
// ==========================================================================
let audioContext = null;
let isAudioPlaying = false;
let noiseNode = null;
let gainNode = null;
let crackleTimer = null;

function initAudioSoundscape() {
  const audioBtn = document.getElementById("audio-toggle");
  if (!audioBtn) return;

  audioBtn.addEventListener("click", () => {
    if (!isAudioPlaying) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
  });
}

function startAmbientAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audioContext = new AudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Generate warm low-pass filtered brown noise for oven rumble
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    // Filter to warm rumble
    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 280;

    gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    noiseNode.start();

    // Woodfire crackle micro-burst generator
    crackleTimer = setInterval(() => {
      if (!audioContext || !isAudioPlaying) return;
      if (Math.random() > 0.45) {
        playWoodCrackle();
      }
    }, 250);

    isAudioPlaying = true;
    updateAudioUI(true);
    showToast("Woodfire oven soundscape active 🪵🔥");
  } catch (err) {
    console.warn("Web Audio autoplay prevented:", err);
  }
}

function playWoodCrackle() {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const clickGain = audioContext.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(Math.random() * 800 + 400, audioContext.currentTime);

  clickGain.gain.setValueAtTime(Math.random() * 0.015 + 0.005, audioContext.currentTime);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.04);

  osc.connect(clickGain);
  clickGain.connect(audioContext.destination);
  osc.start();
  osc.stop(audioContext.currentTime + 0.04);
}

function stopAmbientAudio() {
  if (noiseNode) {
    try { noiseNode.stop(); } catch(e){}
    noiseNode = null;
  }
  if (crackleTimer) {
    clearInterval(crackleTimer);
    crackleTimer = null;
  }
  if (audioContext) {
    try { audioContext.close(); } catch(e){}
    audioContext = null;
  }
  isAudioPlaying = false;
  updateAudioUI(false);
  showToast("Soundscape paused");
}

function updateAudioUI(playing) {
  const audioBtn = document.getElementById("audio-toggle");
  const audioIcon = document.getElementById("audio-icon");
  if (!audioBtn || !audioIcon) return;

  if (playing) {
    audioBtn.classList.add("playing");
    audioIcon.setAttribute("data-lucide", "volume-2");
  } else {
    audioBtn.classList.remove("playing");
    audioIcon.setAttribute("data-lucide", "volume-x");
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// 12. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const links = document.querySelectorAll(".mobile-nav-link");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      if (hamburgerIcon) hamburgerIcon.setAttribute("data-lucide", "menu");
    } else {
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      if (hamburgerIcon) hamburgerIcon.setAttribute("data-lucide", "x");
    }
    if (window.lucide) window.lucide.createIcons();
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      if (hamburgerIcon) hamburgerIcon.setAttribute("data-lucide", "menu");
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

// ==========================================================================
// 13. TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">✨</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
