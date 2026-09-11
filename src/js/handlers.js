import iziToast from "izitoast";
import { refs } from "./refs.js";

import {
    getProducts,
    getProductsByCategory,
    getProductById,
} from "./products-api.js";

import {
    renderProducts,
    showNotFound,
    hideNotFound,
    renderModalProduct,
} from "./render-function.js";

import {
  openModal,
  closeModal,
} from "./modal.js";

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

export async function handleProductClick(event) {
  const product = event.target.closest(".products__item");

  if (!product) {
    return;
  }

  const productId = product.dataset.id;

  try {
    const data = await getProductById(productId);

    renderModalProduct(data);

    openModal();
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}

export function handleModalClick(event) {
  // Click on close button
  if (event.target.closest(".modal__close-btn")) {
    closeModal();
    return;
  }

  // Click on backdrop
  if (event.target === refs.modal) {
    closeModal();
  }
}
