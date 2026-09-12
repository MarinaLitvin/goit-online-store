import { LS_KEYS } from "./constants.js";

export function getCart() {
  return JSON.parse(localStorage.getItem(LS_KEYS.cart)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(LS_KEYS.cart, JSON.stringify(cart));
}

export function addToCart(id) {
  const cart = getCart();

  if (!cart.includes(id)) {
    cart.push(id);
    saveCart(cart);
  }

  return cart;
}

export function removeFromCart(id) {
  const cart = getCart();

  const updatedCart = cart.filter(productId => productId !== id);

  saveCart(updatedCart);

  return updatedCart;
}

export function isInCart(id) {
  const cart = getCart();

  return cart.includes(id);
}