import axios from "axios";

// apiService.js
const API_URL = process.env.REACT_APP_AUTH_BACKEND;

const AuthService = {
  async register(body) {
    try {
      const response = await axios.post(`${API_URL}users/register`,body);
      return response.data;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  },

  async login(body) {
    try {
      const response = await axios.post(`${API_URL}users/login`,body);
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },


  async checkAdmin() {
    try {
      const response = await axios.post(`${API_URL}users/validate-token-admin`,{},{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      return response.data;
    } catch (error) {
      console.error("Error al traer validar admin:", error);
      throw error;
    }
  },
};

export default AuthService;
