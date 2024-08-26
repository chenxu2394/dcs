import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { Dashboard } from "./pages/Dashboard"
import { OneProduct } from "./pages/OneProduct"

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
        path: "/products/:id",
        element: <OneProduct />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  }
])

export default router
