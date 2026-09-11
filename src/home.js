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
} from "./js/render-function.js";

import {
  handleCategoryClick,
} from "./js/handlers.js"

import { refs } from "./js/refs.js";
 
let currentPage = 1;

refs.categoriesList.addEventListener("click", handleCategoryClick);

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
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}

initHomePage();