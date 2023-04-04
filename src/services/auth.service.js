import axios from "axios";
import { API } from "../utils/constants";

class AuthService {
  login(email, password) {
    return axios
      .post(`${API}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("invalidEmailOrPassword");
        } else if (response.status !== 200) {
          const errorResult = response.json();
          throw new Error(errorResult?.error);
        }
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios
      .post(`${API}/user`, {
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.status !== 201) {
          const errorResult = response.data;
          throw new Error(errorResult?.error);
        }
        
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
