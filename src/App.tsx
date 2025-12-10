import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { Login } from "./pages/Login"
import Rounds from "./pages/Rounds"
import Round from "./pages/Round"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/rounds" replace />} />
          <Route path="/rounds" element={<Rounds />} />
          <Route path="/rounds/:id" element={<Round />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
