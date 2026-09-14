import { PRODUCTS_PER_PAGE } from "./constants.js";

export function getProductsByIds(ids, getProductById) {
  return Promise.all(ids.map(id => getProductById(id)));
}

export function createProductsMarkup(products) {
  return products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
        <li class="products__item" data-id="${id}">
          <img
            class="products__image"
            src="${thumbnail}"
            alt="${title}"
          />

          <p class="products__title">${title}</p>

          <p class="products__brand">
            <span class="products__brand--bold">Brand:</span>
            ${brand ?? "Unknown"}
          </p>

          <p class="products__category">
            Category: ${category}
          </p>

          <p class="products__price">
            Price: $${price}
          </p>
        </li>
      `
    )
    .join("");
}

// Total price.
export function calculateCartTotal(products) {
  return products.reduce(
    (total, product) => total + product.price,
    0
  );
}

// Check if there are more products.
export function hasMoreProducts(
  currentPage,
  total
) {
  return currentPage * PRODUCTS_PER_PAGE < total;
}

// Check/set theme 
export function isDarkTheme() {
  return document.body.dataset.theme === "dark";
}
export function setTheme(theme) {
  document.body.dataset.theme = theme;
}