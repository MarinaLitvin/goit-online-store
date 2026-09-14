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
    updateLoadMoreButton,
    appendProducts,
    showNotFound,
    hideNotFound,
    hideLoadMore,
    renderModalProduct,
    updateCartButton,
    updateCartCount,
    updateWishlistButton,
    updateWishlistCount,
    showLoader,
    hideLoader,
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
  
  // Clear the search
  currentSearchQuery = "";
  refs.searchInput.value = "";
  refs.searchClearButton.classList.remove("is-visible");  

  // Active category
  document
    .querySelectorAll(".categories__btn")
    .forEach(btn => {
      btn.classList.remove("categories__btn--active");
    });

  button.classList.add("categories__btn--active");

  // Hide "No Products Found" & Show loader
  hideNotFound();
  showLoader();

  try {
    let data;

    if (category === "All") {
      data = await getProducts(currentPage);
    } else {
      data = await getProductsByCategory(category, currentPage);
    }

    if (data.products.length === 0) {
      renderProducts([]);
      hideLoadMore();
      showNotFound();
      return;
    }

    renderProducts(data.products);
    updateLoadMoreButton(currentPage, data.total);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  } finally {
    hideLoader();
  }
}

export async function handleProductClick(event) {
  const product = event.target.closest(".products__item");

  if (!product) {
    return;
  }

  const productId = Number(product.dataset.id);

  currentProductId = productId;
  
  showLoader();

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
  } finally {
    hideLoader();
  }
}

export async function handleLoadMore() {
  const card =
    refs.productsList.querySelector(".products__item");

  const cardHeight =
    card.getBoundingClientRect().height;

    const nextPage = currentPage + 1;

    showLoader();

  try {
    let data;

    if (currentSearchQuery) {
      data = await getProductsBySearch(
        currentSearchQuery,
        nextPage
      );
    } else if (currentCategory === "All") {
      data = await getProducts(nextPage);
    } else {
      data = await getProductsByCategory(
        currentCategory,
        nextPage
      );
    }

    if (data.products.length === 0) {
      hideLoadMore();

      iziToast.info({
        message: "No more products available.",
      });
        
      return;
    }

    appendProducts(data.products);
    
    currentPage = nextPage;

    updateLoadMoreButton(currentPage, data.total);

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  } catch (error) {
    console.error(error);

    currentPage -= 1;

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  } finally {
    hideLoader();
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
  // Prevent page reload
  event.preventDefault();

  // Get search text and remove extra spaces
  const query = refs.searchInput.value.trim();

  // Do not send request for empty string or spaces
  if (!query) {
    return;
  }

  // Start from the first page for every new search
  currentPage = 1;

  // Save current search query
  currentSearchQuery = query;
  
  // Clear selected category
  currentCategory = "All";
    
  // Show clear button
  refs.searchClearButton.classList.add("is-visible");

  // Hide "No Products Found" & show loader
    hideNotFound();
    showLoader();

  try {
    // Request products by search query
    const data = await getProductsBySearch(
      currentSearchQuery,
      currentPage
    );

    // Check if products were found
    if (data.products.length === 0) {
      renderProducts([]);
      hideLoadMore();
      showNotFound();
      return;
    }

    // Render found products
    renderProducts(data.products);
    
    // Показати/сховати Load More button.
    updateLoadMoreButton(currentPage, data.total);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  } finally {
    hideLoader();
  }
}

export async function handleSearchClear() {
  // Clear search input
  refs.searchInput.value = "";
  
  // Hide clear button
  refs.searchClearButton.classList.remove("is-visible");

  // Reset page
  currentPage = 1;

  // Reset search query
  currentSearchQuery = "";

  // Hide "No Products Found" and show loader
  hideNotFound();
  showLoader();

  try {
    // Get all products without filtering
    const data = await getProducts(currentPage);

    // Render products
    renderProducts(data.products);
    
    // Load More button
    updateLoadMoreButton(currentPage, data.total);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: "Something went wrong. Please try again!",
    });
  } finally {
    hideLoader();
  }
}

// Add/remove product to a card.
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

// Add/remove product to a wishlist.
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

export function handleScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function handleWindowScroll() {
  if (window.scrollY > 300) {
    refs.scrollTopButton.classList.add(
      "is-visible"
    );
  } else {
    refs.scrollTopButton.classList.remove(
      "is-visible"
    );
  }
}