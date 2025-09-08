// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/upload`,
  ADD_PRODUCT: `${API_BASE_URL}/addproduct`,
  ALL_PRODUCTS: `${API_BASE_URL}/allproducts`,
  REMOVE_PRODUCT: `${API_BASE_URL}/removeproduct`,
};

export default API_BASE_URL;
