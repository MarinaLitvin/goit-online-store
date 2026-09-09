// import axios to make requests

import axios from "axios";

import { BASE_URL } from "./constants.js";

// Requests to the backend:

export async function getCategories() {
  const response = await axios.get(`${BASE_URL}/category-list`);

  return response.data;
}

export async function getProducts(page) {
  const limit = 12;

  const skip = (page - 1) * limit;

  const response = await axios.get(BASE_URL, {
    params: {
      limit,
      skip,
    },
  });

  return response.data;
}