// ================= НАСТРОЙКИ =================
const WHATSAPP_PHONE = "77713226575";
const CURRENCY = "₸";
const CART_KEY = "nur_gift_cart";

// ================= ТОВАРЫ (30 СЕТОВ С ФОТО) =================
const PRODUCTS = [
  // Комфорт
  {id:1, title:"Сет Комфорт Basic", category:"Комфорт", price:12990, desc:"Свеча, чай, шоколад", img:"img/comfort-1.jpg"},
  {id:2, title:"Сет Комфорт Plus", category:"Комфорт", price:15990, desc:"Аромасвеча, чай, сладости", img:"img/comfort-2.jpg"},
  {id:3, title:"Сет Комфорт Home", category:"Комфорт", price:17990, desc:"Свеча, кофе, кружка", img:"img/comfort-3.jpg"},

  // Красавица
  {id:4, title:"Сет Красавица Mini", category:"Красавица", price:16990, desc:"Украшение, свеча", img:"img/be-1.jpg"},
  {id:5, title:"Сет Красавица Lux", category:"Красавица", price:22990, desc:"Украшения, косметика", img:"img/be-2.jpg"},
  {id:6, title:"Сет Красавица Premium", category:"Красавица", price:27990, desc:"Украшения, парфюм", img:"img/be-3.jpg"},

  // Мужские
  {id:7, title:"Сет Мужской Classic", category:"Мужской", price:18990, desc:"Ремень, кошелёк", img:"img/men-1.jpg"},
  {id:8, title:"Сет Мужской Power", category:"Мужской", price:23990, desc:"Ремень, парфюм", img:"img/men-2.jpg"},
  {id:9, title:"Сет Мужской Lux", category:"Мужской", price:28990, desc:"Кожаные аксессуары", img:"img/men-3.jpg"},

  // Романтик
  {id:10, title:"Сет Романтик Light", category:"Романтик", price:15990, desc:"Свечи, шоколад", img:"img/lo-1.jpg"},
  {id:11, title:"Сет Романтик Love", category:"Романтик", price:19990, desc:"Свечи, сладости", img:"img/lo-2.jpg"},
  {id:12, title:"Сет Романтик Lux", category:"Романтик", price:24990, desc:"Парные подарки", img:"img/lo-3.jpg"},

  // Детские
  {id:13, title:"Сет Детский Joy", category:"Детский", price:13990, desc:"Игрушка, сладости", img:"img/ki-1.jpg"},
  {id:14, title:"Сет Детский Fun", category:"Детский", price:15990, desc:"Игрушка, сюрприз", img:"img/ki-2.jpg"},
  {id:15, title:"Сет Детский Premium", category:"Детский", price:18990, desc:"Большая игрушка", img:"img/ki-3.jpg"},

  // Новогодние
  {id:16, title:"Сет Новогодний Mini", category:"Новогодний", price:16990, desc:"Чай, шоколад", img:"img/new-1.jpg"},
  {id:17, title:"Сет Новогодний Family", category:"Новогодний", price:21990, desc:"Сладости, чай", img:"img/new-2.jpg"},
  {id:18, title:"Сет Новогодний Lux", category:"Новогодний", price:27990, desc:"Премиум сладости", img:"img/new-3.jpg"},

  // Премиум
  {id:19, title:"Мощный подарок Set 1", category:"Премиум", price:29990, desc:"Премиум набор", img:"img/pre-1.jpg"},
  {id:20, title:"Мощный подарок Set 2", category:"Премиум", price:34990, desc:"Эксклюзивный набор", img:"img/pre-2.jpg"},
  {id:21, title:"Мощный подарок Set 3", category:"Премиум", price:39990, desc:"VIP комплект", img:"img/pre-3.jpg"},

  // Мини
  {id:22, title:"Mini Sweet", category:"Мини", price:9990, desc:"Шоколад, свеча", img:"img/mini-1.jpg"},
  {id:23, title:"Mini Tea", category:"Мини", price:10990, desc:"Чай, кружка", img:"img/mini-2.jpg"},
  {id:24, title:"Mini Gift", category:"Мини", price:11990, desc:"Подарок, открытка", img:"img/mini-3.jpg"},
  {id:25, title:"Mini Love", category:"Мини", price:12990, desc:"Свеча, сладости", img:"img/mini-4.jpg"},
  {id:26, title:"Mini Box", category:"Мини", price:13990, desc:"Подарок-сюрприз", img:"img/mini-5.jpg"},

  // Extra
  {id:27, title:"Комфорт Extra", category:"Комфорт", price:18990, desc:"Расширенный набор", img:"img/comfort-4.jpg"},
  {id:28, title:"Красавица Extra", category:"Красавица", price:24990, desc:"Расширенный набор", img:"img/be-4.jpg"},
  {id:29, title:"Мужской Extra", category:"Мужской", price:26990, desc:"Расширенный набор", img:"img/men-4.jpg"},
  {id:30, title:"Романтик Extra", category:"Романтик", price:22990, desc:"Расширенный набор", img:"img/lo-4.jpg"}
];

// ================= КОРЗИНА =================
function loadCart(){
  return JSON.parse(localStorage.getItem(CART_KEY)) || {};
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addToCart(id){
  const cart = loadCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  updateCartCount();
}

// ================= MENU =================
function initMenuPage(){
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const sortSelect = document.getElementById("sortSelect");

  [...new Set(PRODUCTS.map(p => p.category))].forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  function render(){
    let list = [...PRODUCTS];
    const q = searchInput.value.toLowerCase();
    const cat = categorySelect.value;
    const sort = sortSelect.value;

    if (q) list = list.filter(p =>
      p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
    if (cat !== "all") list = list.filter(p => p.category === cat);
    if (sort === "price_asc") list.sort((a,b)=>a.price-b.price);
    if (sort === "price_desc") list.sort((a,b)=>b.price-a.price);

    grid.innerHTML = "";
    list.forEach(p => {
      const el = document.createElement("article");
      el.className = "product";
      el.innerHTML = `
        <div class="product__img" style="background-image:url('${p.img}')"></div>
        <h3>${p.title}</h3>
        <p class="muted">${p.desc}</p>
        <strong>${p.price.toLocaleString()} ${CURRENCY}</strong><br><br>
        <button class="btn" data-add="${p.id}">В корзину</button>
      `;
      grid.appendChild(el);
    });
  }

  render();
  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  sortSelect.addEventListener("change", render);

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    addToCart(btn.dataset.add);
    btn.textContent = "Добавлено ✓";
    setTimeout(()=>btn.textContent="В корзину",600);
  });
}

// ================= СЧЁТЧИК =================
function updateCartCount(){
  const cart = loadCart();
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const el = document.getElementById("cartCount");
  if (el) el.textContent = count;
}

// ================= CHECKOUT =================
function initCheckoutPage(){
    const form = document.getElementById("checkoutForm");
    const preview = document.getElementById("orderPreview");
    const totalEl = document.getElementById("checkoutTotal");
    if (!form || !preview || !totalEl) return;
  
    const cart = loadCart();
    preview.innerHTML = "";
    let total = 0;
  
    if (Object.keys(cart).length === 0){
      preview.innerHTML = "<p class='muted'>Корзина пуста</p>";
      totalEl.textContent = "0 ₸";
      return;
    }
  
    for (let id in cart){
      const p = PRODUCTS.find(x => x.id == id);
      const qty = cart[id];
      const sum = p.price * qty;
      total += sum;
  
      const el = document.createElement("div");
      el.className = "preview-item";
      el.innerHTML = `
        <strong>${p.title}</strong>
        <span class="muted">${qty} × ${p.price.toLocaleString()} ₸</span>
      `;
      preview.appendChild(el);
    }
  
    totalEl.textContent = total.toLocaleString() + " ₸";
  
    form.addEventListener("submit", e => {
      e.preventDefault();
  
      const fd = new FormData(form);
      let text = "🛍️ ЗАКАЗ NUR GIFT\n\n";
  
      text += `Имя: ${fd.get("name")}\n`;
      text += `Телефон: ${fd.get("phone")}\n`;
      text += `Адрес: ${fd.get("address")}\n`;
      if (fd.get("comment")) text += `Комментарий: ${fd.get("comment")}\n`;
  
      text += "\nТовары:\n";
      for (let id in cart){
        const p = PRODUCTS.find(x => x.id == id);
        text += `- ${p.title} — ${cart[id]} шт\n`;
      }
  
      text += `\nИТОГО: ${total.toLocaleString()} ₸`;
  
      window.open(
        `https://wa.me/77713226575?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    });
  }



// ================= CART PAGE =================
function initCartPage(){
    const list = document.getElementById("cartList");
    const totalEl = document.getElementById("cartTotal");
    if (!list || !totalEl) return;
  
    function render(){
      const cart = loadCart();
      list.innerHTML = "";
      let total = 0;
  
      if (Object.keys(cart).length === 0){
        list.innerHTML = "<p class='muted'>Корзина пуста</p>";
        totalEl.textContent = "0 ₸";
        return;
      }
  
      for (let id in cart){
        const p = PRODUCTS.find(x => x.id == id);
        const qty = cart[id];
        const sum = p.price * qty;
        total += sum;
  
        const el = document.createElement("div");
        el.className = "cart-item";
        el.innerHTML = `
          <div>
            <div class="cart-item__title">${p.title}</div>
            <div class="cart-item__sub">${p.price.toLocaleString()} ₸</div>
          </div>
          <div class="qty">
            <button data-dec="${id}">−</button>
            <strong>${qty}</strong>
            <button data-inc="${id}">+</button>
            <button class="remove" data-remove="${id}">×</button>
          </div>
        `;
        list.appendChild(el);
      }
  
      totalEl.textContent = total.toLocaleString() + " ₸";
    }
  
    list.addEventListener("click", e => {
      const cart = loadCart();
      if (e.target.dataset.inc) cart[e.target.dataset.inc]++;
      if (e.target.dataset.dec){
        cart[e.target.dataset.dec]--;
        if (cart[e.target.dataset.dec] <= 0) delete cart[e.target.dataset.dec];
      }
      if (e.target.dataset.remove) delete cart[e.target.dataset.remove];
      saveCart(cart);
      updateCartCount();
      render();
    });
  
    render();
  }

  // ===== СТАТИСТИКА НА ГЛАВНОЙ =====
function updateHeroStats(){
    const cart = loadCart();
    const items = Object.values(cart).reduce((a,b)=>a+b,0);
    let total = 0;
  
    for (let id in cart){
      const p = PRODUCTS.find(x => x.id == id);
      total += p.price * cart[id];
    }
  
    const itemsEl = document.getElementById("statItems");
    const totalEl = document.getElementById("statTotal");
  
    if (itemsEl) itemsEl.textContent = items;
    if (totalEl) totalEl.textContent = total.toLocaleString() + " ₸";
  }

  function updateHeroStats(){
    const cart = loadCart();
    const items = Object.values(cart).reduce((a,b)=>a+b,0);
    let total = 0;
  
    for (let id in cart){
      const p = PRODUCTS.find(x => x.id == id);
      total += p.price * cart[id];
    }
  
    const itemsEl = document.getElementById("statItems");
    const totalEl = document.getElementById("statTotal");
  
    if (itemsEl) itemsEl.textContent = items;
    if (totalEl) totalEl.textContent = total.toLocaleString() + " ₸";
  } 
  
  // ===== FOLLOW GLOW EFFECT =====
const glowElements = document.querySelectorAll(".card, .product, .btn");

glowElements.forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;

    el.style.setProperty("--mx", mx + "%");
    el.style.setProperty("--my", my + "%");
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  });
});
  
// ===== SELECT CARD ON CLICK =====
const selectableCards = document.querySelectorAll(".card, .product");

selectableCards.forEach(card => {
  card.addEventListener("click", e => {
    // не мешаем кнопкам внутри карточек
    if (e.target.closest("button, a")) return;

    // убираем выделение у остальных
    selectableCards.forEach(c => c.classList.remove("is-selected"));

    // выделяем текущую
    card.classList.add("is-selected");
  });
});



  // ================= INIT =================
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof initMenuPage === "function") initMenuPage();
    if (typeof initCartPage === "function") initCartPage();
    if (typeof initCheckoutPage === "function") initCheckoutPage();
    updateHeroStats();
    updateCartCount();
  });

  // ===== CLICK SELECT + ADD EFFECT (WORKS WITH JS GENERATED CARDS) =====
document.addEventListener("click", (e) => {
  // 1) КЛИК ПО КАРТОЧКЕ ТОВАРА -> ВЫДЕЛЕНИЕ
  const productCard = e.target.closest(".product");
  if (productCard && !e.target.closest("a, button")) {
    document.querySelectorAll(".product.is-selected").forEach(el => el.classList.remove("is-selected"));
    productCard.classList.add("is-selected");
    return;
  }

  // 2) КЛИК ПО КНОПКЕ "В КОРЗИНУ" -> ЭФФЕКТ ДОБАВЛЕНИЯ
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    const card = addBtn.closest(".product");
    if (!card) return;

    // убираем прошлое выделение
    document.querySelectorAll(".product.is-selected").forEach(el => el.classList.remove("is-selected"));

    // делаем карточку "выбранной"
    card.classList.add("is-selected");

    // анимация "добавлено"
    card.classList.add("is-added");
    setTimeout(() => card.classList.remove("is-added"), 350);
  }
});

// ===== NAV ACTIVE AUTO SCROLL (MOBILE) =====
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-scroll");
  const active = nav?.querySelector(".is-active");

  if (!nav || !active) return;

  // прокрутить так, чтобы активный пункт был по центру
  const navRect = nav.getBoundingClientRect();
  const linkRect = active.getBoundingClientRect();

  nav.scrollLeft +=
    linkRect.left -
    navRect.left -
    navRect.width / 2 +
    linkRect.width / 2;
});