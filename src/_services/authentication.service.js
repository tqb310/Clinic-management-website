import axiosClient from "./axiosClient";
import { auth } from "_constants/apiUrl";
import decodeBase64String from "_helpers/decodeBase64String";

const authentication = {
  // LOGIN
  /**
   * 
   * @param {String} email 
   * @param {String} password 
   * @returns {Number} Status code
   */
  async login(email, password) {
    const url = auth.login;
    try {
      const data = await axiosClient.post(url, { username: email, password: password });
      localStorage.setItem("accessToken", JSON.stringify(data));
      return 0;
    } catch(err) {
      switch(err.response.status){
        case 404:return 1;
        case 401:return 2;
        default:return 3;
      }

    }
  },
  // LOGOUT
  logout() {
    localStorage.removeItem("accessToken");
    window.location.assign('/dang-nhap');
  },
   
  getCurrentUser() {
    const tokenString = localStorage.getItem("accessToken");
    if (tokenString) {
      try{
        const user = JSON.parse(decodeBase64String(tokenString.split(".")[1].replace(/-/g, '+')));
        return {
          ...user,
          token: JSON.parse(tokenString)["access_token"],
        };
      }catch {
          return null;
      }
    }
    // return null;
  }
};

export default authentication;
