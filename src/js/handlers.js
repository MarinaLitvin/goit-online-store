import iziToast from "izitoast";
import { refs } from "./refs.js";

import {
    getProducts,
    getProductsByCategory,
    getProductById,
    getProductsBySearch,
} from "./products-api.js";

import {
    renderProducts,
    showNotFound,
    hideNotFound,
    renderModalProduct,
    updateCartButton,
    updateCartCount,
    updateWishlistButton,
    updateWishlistCount,
} from "./render-function.js";

import {
  openModal,
  closeModal,
} from "./modal.js";

import {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  isInCart,
  isInWishlist,
} from "./storage.js";

let currentCategory = "All";
let currentPage = 1;
let currentSearchQuery = "";
let currentProductId = null;

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

  const productId = Number(product.dataset.id);

  currentProductId = productId;

  try {
    const data = await getProductById(productId);

    renderModalProduct(data);
    
    updateCartButton(isInCart(productId));
    updateWishlistButton(isInWishlist(productId));

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
    
  // Click on Add/Remove buttons
  if (event.target.closest(".modal-product__btn--cart")) {
    handleCartButtonClick();
    return;
  }
    
  if (
    event.target.closest(".modal-product__btn--wishlist")) {
    handleWishlistButtonClick();
    return;
  }

  // Click on backdrop
  if (event.target === refs.modal) {
    closeModal();
  }
}

export async function handleSearchSubmit(event) {
  // 1. Prevent page reload
  event.preventDefault();

  // 2. Get search text and remove extra spaces
  const query = refs.searchInput.value.trim();

  // 3. Do not send request for empty string or spaces
  if (!query) {
    return;
  }

  // 4. Start from the first page for every new search
  currentPage = 1;

  // 5. Save current search query
  currentSearchQuery = query;
    
  // Show clear button
  refs.searchClearButton.classList.add("is-visible");

  // 6. Hide "No Products Found"
  hideNotFound();

  try {
    // 7. Request products by search query
    const data = await getProductsBySearch(
      currentSearchQuery,
      currentPage
    );

    // 8. Check if products were found
    if (data.products.length === 0) {
      renderProducts([]);
      showNotFound();
      return;
    }

    // 9. Render found products
    renderProducts(data.products);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}

export async function handleSearchClear() {
  // 1. Clear search input
  refs.searchInput.value = "";
  
  // Hide clear button
  refs.searchClearButton.classList.remove("is-visible");

  // 2. Reset page
  currentPage = 1;

  // 3. Reset search query
  currentSearchQuery = "";

  // 4. Hide "No Products Found"
  hideNotFound();

  try {
    // 5. Get all products without filtering
    const data = await getProducts(currentPage);

    // 6. Render products
    renderProducts(data.products);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  }
}

export function handleCartButtonClick() {
  if (currentProductId === null) {
    return;
  }

  const productIsInCart = isInCart(currentProductId);

  if (productIsInCart) {
    const cart = removeFromCart(currentProductId);

    updateCartButton(false);
    updateCartCount(cart.length);
  } else {
    const cart = addToCart(currentProductId);

    updateCartButton(true);
    updateCartCount(cart.length);
  }
}

export function handleWishlistButtonClick() {
  if (currentProductId === null) {
    return;
  }

  const productIsInWishlist =
    isInWishlist(currentProductId);

  if (productIsInWishlist) {
    const wishlist = removeFromWishlist(
      currentProductId
    );

    updateWishlistButton(false);
    updateWishlistCount(wishlist.length);
  } else {
    const wishlist = addToWishlist(
      currentProductId
    );

    updateWishlistButton(true);
    updateWishlistCount(wishlist.length);
  }
}