import { refs } from "./refs.js";

import {
  hasMoreProducts,
  createProductsMarkup,
} from "./helpers.js";

// Categories List markup
export function renderCategories(categories) {
  const markup = categories
    .map(
      category => `
        <li class="categories__item">
          <button 
            class="categories__btn"
            type="button"
          >
            ${category}
          </button>
        </li>
      `
    )
    .join("");

  refs.categoriesList.innerHTML = markup;
}

// Create Products List markup
export function renderProducts(products) {
  refs.productsList.innerHTML = createProductsMarkup(products);
}

// Add/Hide Load More button
export function updateLoadMoreButton(currentPage, total) {
  if (hasMoreProducts(currentPage, total)) {
    showLoadMore();
  } else {
    hideLoadMore();
  }
}

//Add to existing Products List markup
export function appendProducts(products) {
  refs.productsList.insertAdjacentHTML(
    "beforeend",
    createProductsMarkup(products)
  );
}

// Show/Hide not_found block.
export function showNotFound() {
  refs.notFound.classList.add("not-found--visible");
}
export function hideNotFound() {
  refs.notFound.classList.remove("not-found--visible");
}

// Show/Hide loader.
export function showLoader() {
  refs.loader.classList.add("is-visible");
}
export function hideLoader() {
  refs.loader.classList.remove("is-visible");
}

// Show/Hide load-more button.
export function showLoadMore() {
  refs.loadMoreButton.classList.remove("is-hidden");
}
export function hideLoadMore() {
  refs.loadMoreButton.classList.add("is-hidden");
}

// Render one product in modal
export function renderModalProduct(product) {
  const {
    thumbnail,
    title,
    tags,
    description,
    shippingInformation,
    returnPolicy,
    price,
  } = product;

  refs.modalProduct.innerHTML = `
    <img
      class="modal-product__img"
      src="${thumbnail}"
      alt="${title}"
    />

    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>

      <ul class="modal-product__tags">
        ${tags
          .map(tag => `<li>${tag}</li>`)
          .join("")}
      </ul>

      <p class="modal-product__description">
        ${description}
      </p>

      <p class="modal-product__shipping-information">
        Shipping: ${shippingInformation}
      </p>

      <p class="modal-product__return-policy">
        Return Policy: ${returnPolicy}
      </p>

      <p class="modal-product__price">
        Price: $${price}
      </p>

      <button
        class="modal-product__buy-btn"
        type="button"
      >
        Buy
      </button>
    </div>
  `;
}

// Change text of the buttons
export function updateCartButton(isProductInCart) {
  refs.modalAddToCartButton.textContent = isProductInCart
    ? "Remove from Cart"
    : "Add to Cart";
}

export function updateWishlistButton(isProductInWishlist) {
  refs.wishlistButton.textContent =
    isProductInWishlist
      ? "Remove from Wishlist"
      : "Add to Wishlist";
}

// Update number of products
export function updateCartCount(count) {
  refs.cartCount.textContent = count;
}

export function updateWishlistCount(count) {
  refs.wishlistCount.textContent = count;
}