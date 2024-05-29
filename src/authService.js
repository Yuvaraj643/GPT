import CryptoJS from 'crypto-js';

const SECRET_KEY = "your_strong_secret_key";
const HARDCODED_PASSWORD = "123456";

const authService = {
  login: async (password) => {
    try {
      if (password === HARDCODED_PASSWORD) {
        const encryptedToken = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
        localStorage.setItem("authToken", encryptedToken);
        return true;
      } else {
        console.error("Invalid password");
        return false;
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  isAuthenticated: () => {
    const encryptedToken = localStorage.getItem("authToken");
    if (!encryptedToken) return false;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const token = bytes.toString(CryptoJS.enc.Utf8);
      return token === HARDCODED_PASSWORD;
    } catch (error) {
      console.error("Token decryption failed", error);
      return false;
    }
  },
};

export default authService;
