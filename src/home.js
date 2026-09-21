//Логіка сторінки Home
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
  PRODUCTS_PER_PAGE,
 } from "./js/constants.js";

import {
    getCategories,
    getProducts,
} from "./js/products-api.js";
 
import {
    renderCategories,
    renderProducts,
    updateCartCount,
    updateWishlistCount,
    showLoader,
    hideLoader,
    showLoadMore,
    hideLoadMore,
} from "./js/render-function.js";

import {
  handleCategoryClick,
  handleProductClick,
  handleModalClick,
  handleSearchSubmit,
  handleSearchClear,
  handleLoadMore,
  initTheme,
  handleThemeToggle,
} from "./js/handlers.js"

import { refs } from "./js/refs.js";

import {
  getCart,
  getWishlist,
} from "./js/storage.js";
 
import {
  hasMoreProducts,
 } from "./js/helpers.js";
 
let currentPage = 1;

initTheme();

// Choose theme
refs.themeToggleButton.addEventListener(
  "click",
  handleThemeToggle
);

// Choose Category (delegation).
refs.categoriesList.addEventListener(
  "click",
  handleCategoryClick);

// Choose Product (delegation).
refs.productsList.addEventListener(
  "click",
  handleProductClick
);

// Load more products button.
refs.loadMoreButton.addEventListener(
  "click",
  handleLoadMore
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
  showLoader();
  
  try {
      // Отримуємо категорії
    const categories = await getCategories();
        // Додаємо All на початок
    // categories.unshift("All");
        // Рендеримо категорії з додаванням "All"
    renderCategories(["All", ...categories]);
    
        // Make All buttons active initially
    const allButton = refs.categoriesList.querySelector(
      ".categories__btn"
    );

    allButton.classList.add("categories__btn--active");
    
    // Отримуємо товари
    const data = await getProducts(currentPage);

    // Рендеримо товари
    renderProducts(data.products);

    // Показуємо/приховуємо Load More залежно від є/немає товарів.
    if (
      hasMoreProducts(
        currentPage,
        PRODUCTS_PER_PAGE,
        data.total
      )
    ) {
      showLoadMore();
    } else {
      hideLoadMore();
    }
    
    // Кількість товарів у кошику & wishlist
    updateCartCount(getCart().length);
    updateWishlistCount(getWishlist().length);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  } finally {
    hideLoader();
  }
}

initHomePage();