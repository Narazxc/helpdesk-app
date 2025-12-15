// import axios, { AxiosInstance, AxiosResponse } from "axios";
import { tokenManager } from "@/features/auth/tokenManager";
import axios from "axios";
import { API_URL } from "@/config";
// Create axios instance - TypeScript will infer the type
//jsonplaceholder.typicode.com/posts

export const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoic3VwZXIuYWRtaW4iLCJ0b2tlbl92ZXJzaW9uIjowLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYyOTE3MjgwLCJleHAiOjE3NjI5MTgxODB9.gM_uwrWItJvGwlpYarI0-dYISouV3pKcJHvuV-Mw-q-hMuSnr2Isjm3LgtqjSO3ggFnF_DpSHBuGhXpULA00kA`,
    "Content-Type": "application/json",
  },
  // timeout: 10000,
});

// REQUEST INTERCEPTOR - Adds accessToken to every request
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// https://medium.com/@velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// api.interceptors.response.use(
//   (response) => response, // Directly return successful responses.
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
//       try {
//         const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
//         // Make a request to your auth server to refresh the token.
//         const response = await axios.post("https://your.auth.server/refresh", {
//           refreshToken,
//         });
//         const { accessToken, refreshToken: newRefreshToken } = response.data;
//         // Store the new access and refresh tokens.
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);
//         // Update the authorization header with the new access token.
//         api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest); // Retry the original request with the new access token.
//       } catch (refreshError) {
//         // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
//         console.error("Token refresh failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error); // For all other errors, return the error as is.
//   }
// );

// ============================================
// RESPONSE INTERCEPTOR
// Automatically handles token refresh on 401
// ============================================

api.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 (Unauthorized) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've tried to refresh

      try {
        // Call your refresh endpoint
        // The refreshToken cookie is sent automatically due to withCredentials: true
        const response = await axios.post(
          `${API_URL}/auth/refresh-token`, // Adjust this URL
          // {
          //   refreshToken:
          //     "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJGTUlTIEhlbHBkZXNrIFN5c3RlbSIsImF1ZCI6IkhlbHBkZXNrIFVzZXJzIiwic3ViIjoic3VwZXIuYWRtaW4iLCJ0b2tlbl92ZXJzaW9uIjowLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzYyOTM3NjkwLCJleHAiOjE3NjM1NDI0OTB9.UJQuIyH0o0a63IcpgFYm877sSVCBm7N6AgLWvksLGm5c3vwgyRArOVCepKalJ3fP0EiX0oSr13CgcvCtm28Vkg",
          // },
          {},
          { withCredentials: true }
        );

        console.log("inside refreshToken interceptor: ", response);

        const { accessToken } = response.data.data;

        // Store the new access token
        tokenManager.setAccessToken(accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear token and redirect to login
        tokenManager.clearAccessToken();

        // Redirect to login page
        window.location.href = "/signin";

        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

// const api: AxiosInstance = axios.create({
//   baseURL: "http://localhost:5173/",
// });
