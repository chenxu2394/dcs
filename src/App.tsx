import { Outlet } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { useState } from "react"

function App() {
  const [navBarHeight, setNavBarHeight] = useState(0)

  return (
    <div className="App">
      <NavBar setNavBarHeight={setNavBarHeight} />
      <div className="flex-1 overflow-auto" style={{ height: `calc(100vh - ${navBarHeight}px)` }}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
