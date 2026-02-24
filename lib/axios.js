import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
})

// Optional: Response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || "Request failed"
      })
    }

    if (error.request) {
      return Promise.reject({
        status: 500,
        message: "Server not responding"
      })
    }

    return Promise.reject({
      status: 500,
      message: error.message
    })
  }
)

export default axiosInstance