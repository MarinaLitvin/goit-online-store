//Логіка сторінки Wishlist
import iziToast from "izitoast";

import { getProductById } from "./js/products-api.js";

import {
    getWishlist,
    getCart,
} from "./js/storage.js";
 
import { getProductsByIds } from "./js/helpers.js";

import {
  renderProducts,
  showNotFound,
  hideNotFound,
  updateWishlistCount,
  updateCartCount,
  showLoader,
  hideLoader,
} from "./js/render-function.js";

import {
  handleProductClick,
  handleModalClick,
  handleThemeToggle,
  initTheme,
} from "./js/handlers.js";

import { refs } from "./js/refs.js";

// Початкова тема з local storage
initTheme();

// Перемикання теми dark/light
refs.themeToggleButton.addEventListener(
  "click",
  handleThemeToggle
);

// Відкриття товару з Wishlist
refs.productsList.addEventListener(
  "click",
  handleProductClick
);

// Події модального вікна
refs.modal.addEventListener(
  "click",
  handleModalClick
);

async function initWishlistPage() {
    showLoader();

    try {
    // 1. Отримуємо ID товарів з localStorage
    const wishlistIds = getWishlist();
    const cartIds = getCart();

    // 2. Оновлюємо кількість Wishlist у навігації(Header counters)
    updateWishlistCount(wishlistIds.length);
    updateCartCount(cartIds.length);

    // 3. Якщо Wishlist порожній
    if (wishlistIds.length === 0) {
      renderProducts([]);
      showNotFound();
      return;
    }

    // 4. Отримуємо повні об'єкти товарів
    const products = await getProductsByIds(
      wishlistIds,
      getProductById
    );

    // 5. Ховаємо "No Products Found"
    hideNotFound();

    // 6. Рендеримо товари
    renderProducts(products);
  } catch (error) {
    console.error(error);
    
    iziToast.error({
    message: "Something went wrong. Please try again!",});
  } finally {
    hideLoader();
  }
}

initWishlistPage();