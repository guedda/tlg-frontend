import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Login } from "./pages/Login"
import Rounds from "./pages/Rounds"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div>Home</div>
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/rounds" element={<Rounds />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
