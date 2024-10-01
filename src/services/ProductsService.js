import axios from "axios";

// apiService.js
const API_URL = process.env.REACT_APP_PRODUCT_BACKEND;

const ProductsService = {
  async getAll(queryParam = '') {
    try {
      const response = await axios.get(`${API_URL}products${queryParam}`);
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  },

  async getCategories() {
    try {
      const response = await axios.get(`${API_URL}categories`);
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  },

  async create(body) {
    try {
      const response = await axios.post(`${API_URL}products`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  },

  async update(id, body) {
    try {
      const response = await axios.put(`${API_URL}products/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al traer los productos:", error);
      throw error;
    }
  },
};

export default ProductsService;
