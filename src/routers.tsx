import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { Home } from "./pages/Home"
import { Products } from "./pages/Products"
import { Dashboard } from "./pages/Dashboard"
import { OneProduct } from "./pages/OneProduct"
import { LogIn } from "./pages/Login"
import { Register } from "./pages/Register"
import { Cart } from "./pages/Cart"
import { ProtectedRoute } from "./routes/ProtectedRoute"

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
        path: "/admin",
        element: <ProtectedRoute forAdmin={true} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          }
        ]
      },
      {
        path: "/login",
        element: <LogIn />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  }
])

export default router
