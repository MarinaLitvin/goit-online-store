//Логіка сторінки Cart
import iziToast from "izitoast";

import { getProductById } from "./js/products-api.js";
import { getCart } from "./js/storage.js";
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
} from "./js/render-function.js";

import { refs } from "./js/refs.js";

async function initCartPage() {
  try {
    const cartIds = getCart();

    updateCartCount(cartIds.length);

    if (cartIds.length === 0) {
      renderProducts([]);
      showNotFound();

      refs.itemsCount.textContent = "0";
      refs.totalPrice.textContent = "$0";

      return;
    }

    const products = await getProductsByIds(
      cartIds,
      getProductById
    );

    hideNotFound();

    renderProducts(products);

    refs.itemsCount.textContent =
      calculateCartItems(products);

    refs.totalPrice.textContent =
      `$${calculateCartTotal(products)}`;
  } catch (error) {
    console.error(error);
    
    iziToast.error({
    message: "Something went wrong. Please try again!",});
  }
}

initCartPage();