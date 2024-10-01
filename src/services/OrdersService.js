import axios from "axios";

// apiService.js
const API_URL = process.env.REACT_APP_ORDER_BACKEND;

const OrdersService = {
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}order`);
      return response.data;
    } catch (error) {
      console.error("Error al traer las ordenes:", error);
      throw error;
    }
  },


  async filter() {
    try {
      const response = await axios.get(`${API_URL}order/byUser`,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      return response.data;
    } catch (error) {
      console.error("Error al traer las ordenes:", error);
      throw error;
    }
  },

  async create(body) {
    try {
      const response = await axios.post(`${API_URL}order`, body, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      return response.data;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  },
};

export default OrdersService;
