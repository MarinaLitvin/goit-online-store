//Логіка сторінки Cart
import iziToast from "izitoast";

import { getProductById } from "./js/products-api.js";
import {
    getCart,
    getWishlist,
} from "./js/storage.js";
import {
  getProductsByIds,
  calculateCartItems,
  calculateCartTotal,
} from "./js/helpers.js";

import {
  renderProducts,
  showNotFound,
  hideNotFound,
  updateCartCount,
  updateWishlistCount,
  showLoader,
  hideLoader,
} from "./js/render-function.js";

import {
  handleProductClick,
  handleModalClick,
} from "./js/handlers.js";

import { refs } from "./js/refs.js";

// Відкриття товару з Cart
refs.productsList.addEventListener(
  "click",
  handleProductClick
);

// Події модального вікна
refs.modal.addEventListener(
  "click",
  handleModalClick
);

// Buy Products
refs.buyProductsButton.addEventListener(
  "click",
  handleBuyProducts
);

async function initCartPage() {
    showLoader();
    
    try {
    // 1. Отримуємо ID товарів з localStorage
    const cartIds = getCart();    
    const wishlistIds = getWishlist();

    // 2. Оновлюємо кількість товарів у навігації(Header counters)
    updateCartCount(cartIds.length);
    updateWishlistCount(wishlistIds.length);

    // 3. Якщо Cart порожній
    if (cartIds.length === 0) {
      renderProducts([]);
      showNotFound();

      refs.itemsCount.textContent = "0";
      refs.totalPrice.textContent = "$0";

      return;
    }

    // 4. Отримуємо повні об'єкти товарів
    const products = await getProductsByIds(
      cartIds,
      getProductById
    );

    // 5. Ховаємо повідомлення
    hideNotFound();

    // 6. Рендеримо товари
    renderProducts(products);

    // 7. Кількість товарів
    refs.itemsCount.textContent =
      calculateCartItems(products);

    // 8. Загальна вартість
    refs.totalPrice.textContent =
      `$${calculateCartTotal(products)}`;
  } catch (error) {
    console.error(error);
    
    iziToast.error({
    message: "Something went wrong. Please try again!",});
  } finally {
    hideLoader();
  }
}

function handleBuyProducts() {
  iziToast.success({
    title: "Success",
    message: "Your products have been purchased!",
  });
}

initCartPage();