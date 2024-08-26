import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { Home } from "./pages/home"
import { Products } from "./pages/Products"
import { Dashboard } from "./pages/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])

export default router
