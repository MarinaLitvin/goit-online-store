export function getProductsByIds(ids, getProductById) {
  return Promise.all(ids.map(id => getProductById(id)));
}

export function calculateCartItems(products) {
  return products.length;
}

export function calculateCartTotal(products) {
  return products.reduce(
    (total, product) => total + product.price,
    0
  );
}