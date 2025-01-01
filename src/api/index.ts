import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "http://localhost:8080/api"

if (!isDevelopment) {
  // Update this later when you have a working backend server
  // baseURL = "https://fs18-java-backend-tzc4.onrender.com/api"
  baseURL = "https://dcstest.azurewebsites.net/api"
}

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export default api
