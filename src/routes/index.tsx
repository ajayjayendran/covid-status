import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export { AppRoutes }
