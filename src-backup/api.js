import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Attach JWT token to every request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("sendit_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
 * Handle authentication errors.
 */
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || "";

      /*
       * Don't immediately remove the token when the login
       * request itself returns 401. Login needs to display
       * "Invalid email or password".
       */
      const isAuthRequest =
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/register");

      if (!isAuthRequest) {
        localStorage.removeItem("sendit_token");
        localStorage.removeItem("sendit_user");
      }
    }

    return Promise.reject(error);
  }
);

export default api;