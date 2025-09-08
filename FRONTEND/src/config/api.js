// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/signup`,
  LOGIN: `${API_BASE_URL}/login`,
  ALL_PRODUCTS: `${API_BASE_URL}/allproducts`,
  NEW_COLLECTIONS: `${API_BASE_URL}/newcollections`,
  POPULAR_WOMEN: `${API_BASE_URL}/popular-women`,
  ADD_TO_CART: `${API_BASE_URL}/addtocart`,
  REMOVE_FROM_CART: `${API_BASE_URL}/removefromcart`,
  GET_CART_DATA: `${API_BASE_URL}/getcartdata`,
};

export default API_BASE_URL;
