//Логіка сторінки Home
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
    getCategories,
    getProducts,
} from "./js/products-api.js";
 
import {
    renderCategories,
    renderProducts,
    updateCartCount,
    updateWishlistCount,
} from "./js/render-function.js";

import {
  handleCategoryClick,
  handleProductClick,
  handleModalClick,
  handleSearchSubmit,
  handleSearchClear,
} from "./js/handlers.js"

import { refs } from "./js/refs.js";

import {
  getCart,
  getWishlist,
 } from "./js/storage.js";
 
let currentPage = 1;

// Category delegation
refs.categoriesList.addEventListener(
  "click",
  handleCategoryClick);

// Product delegation
refs.productsList.addEventListener(
  "click",
  handleProductClick
);

// Modal events
refs.modal.addEventListener(
  "click",
  handleModalClick
);

// Submit form
refs.searchForm.addEventListener(
  "submit",
  handleSearchSubmit
);

// Clear form
refs.searchClearButton.addEventListener(
  "click",
  handleSearchClear
);

async function initHomePage() {
    try {
      // Отримуємо категорії
    const categories = await getCategories();
        // Додаємо All на початок
    categories.unshift("All");
        // Рендеримо категорії
    renderCategories(categories);
    
        // Make All buttons active initially
    const allButton = refs.categoriesList.querySelector(
      ".categories__btn"
    );

    allButton.classList.add("categories__btn--active");
    
    // Отримуємо товари
    const data = await getProducts(currentPage);

    // Рендеримо товари
    renderProducts(data.products);
    
    // Кількість товарів у кошику & wishlist
    updateCartCount(getCart().length);
    updateWishlistCount(getWishlist().length);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}

initHomePage();