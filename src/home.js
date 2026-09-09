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
 
let currentPage = 1;

async function initHomePage() {
    try {
      // Отримуємо категорії
    const categories = await getCategories();
        // Додаємо All на початок
    categories.unshift("All");
        // Рендеримо категорії
    renderCategories(categories);
    
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