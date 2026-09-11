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