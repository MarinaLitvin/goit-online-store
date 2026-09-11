import iziToast from "izitoast";

import {
    getProducts,
    getProductsByCategory,
} from "./products-api.js";

import {
    renderProducts,
    showNotFound,
    hideNotFound,
} from "./render-function.js";

let currentCategory = "All";
let currentPage = 1;

export async function handleCategoryClick(event) {
  const button = event.target.closest(".categories__btn");

  if (!button) {
    return;
  }

  const category = button.textContent.trim();

  currentCategory = category;
  currentPage = 1;

  // Active category
  document
    .querySelectorAll(".categories__btn")
    .forEach(btn => {
      btn.classList.remove("categories__btn--active");
    });

  button.classList.add("categories__btn--active");

  // Hide "No Products Found"
  hideNotFound();

  try {
    let data;

    if (category === "All") {
      data = await getProducts(currentPage);
    } else {
      data = await getProductsByCategory(category, currentPage);
    }

    if (data.products.length === 0) {
      renderProducts([]);
      showNotFound();
      return;
    }

    renderProducts(data.products);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}
