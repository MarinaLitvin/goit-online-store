// references to DOM elements

export const refs = {
  categoriesList: document.querySelector(".categories"),
  productsList: document.querySelector(".products"),
  loadMoreButton: document.querySelector(".load-more-btn"),
  notFound: document.querySelector(".not-found"),

  modal: document.querySelector(".modal"),
  modalProduct: document.querySelector(".modal-product"),

  searchForm: document.querySelector(".search-form"),
  searchInput: document.querySelector(".search-form__input"),
  searchClearButton: document.querySelector(".search-form__btn-clear"),

  modalAddToCartButton: document.querySelector(".modal-product__btn--cart"),

  wishlistButton: document.querySelector(".modal-product__btn--wishlist"),
  cartCount: document.querySelector("[data-cart-count]"),
  wishlistCount: document.querySelector("[data-wishlist-count]"),

  itemsCount: document.querySelector("[data-count]"),
  totalPrice: document.querySelector("[data-price]"),
  buyProductsButton: document.querySelector(".cart-summary__btn"),

  itemsCount: document.querySelector(
    "[data-count]"),
  totalPrice: document.querySelector(
    "[data-price]"),
  buyProductsButton: document.querySelector(".cart-summary__btn"),
};