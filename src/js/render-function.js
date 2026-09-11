import { refs } from "./refs.js";

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

export function renderProducts(products) {
  const markup = products
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

  refs.productsList.innerHTML = markup;
}

export function showNotFound() {
  refs.notFound.classList.add("not-found--visible");
}

export function hideNotFound() {
  refs.notFound.classList.remove("not-found--visible");
}