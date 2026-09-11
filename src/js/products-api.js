import axios from "axios";

import {
  BASE_URL,
  PRODUCTS_PER_PAGE,
} from "./constants.js";

// Get categories
export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/category-list`);

  return response.data;
}

// Get all products with pagination
export async function getProducts(page) {
  
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const response = await axios.get(BASE_URL, {
    params: {
      limit: PRODUCTS_PER_PAGE,
      skip,
    },
  });

  return response.data;
}

// Get products by category with pagination
export async function getProductsByCategory(category, page) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const response = await axios.get(
    `${BASE_URL}/category/${category}`,
    {
      params: {
        limit: PRODUCTS_PER_PAGE,
        skip,
      },
    }
  );

  return response.data;
}