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

export function getWishlist() {
  return JSON.parse(localStorage.getItem(LS_KEYS.wishlist)) || [];
}

export function saveWishlist(wishlist) {
  localStorage.setItem(
    LS_KEYS.wishlist,
    JSON.stringify(wishlist)
  );
}

export function addToWishlist(id) {
  const wishlist = getWishlist();

  if (!wishlist.includes(id)) {
    wishlist.push(id);
    saveWishlist(wishlist);
  }

  return wishlist;
}

export function removeFromWishlist(id) {
  const wishlist = getWishlist();

  const updatedWishlist = wishlist.filter(
    productId => productId !== id
  );

  saveWishlist(updatedWishlist);

  return updatedWishlist;
}

export function isInWishlist(id) {
  const wishlist = getWishlist();

  return wishlist.includes(id);
}