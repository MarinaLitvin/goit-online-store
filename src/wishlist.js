//Логіка сторінки Wishlist
import { getProductById } from "./js/products-api.js";
import { getWishlist } from "./js/storage.js";
import { getProductsByIds } from "./js/helpers.js";
import {
  renderProducts,
  showNotFound,
  hideNotFound,
  updateWishlistCount,
} from "./js/render-function.js";

async function initWishlistPage() {
  try {
    const wishlistIds = getWishlist();

    updateWishlistCount(wishlistIds.length);

    if (wishlistIds.length === 0) {
      renderProducts([]);
      showNotFound();
      return;
    }

    const products = await getProductsByIds(
      wishlistIds,
      getProductById
    );

    hideNotFound();

    renderProducts(products);
  } catch (error) {
    console.error(error);
    
    iziToast.error({
    message: "Something went wrong. Please try again!",});
  }
}

initWishlistPage();