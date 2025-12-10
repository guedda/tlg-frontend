import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Login } from "./pages/Login"

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
        <Route 
          path="/rounds" 
          element={
            <ProtectedRoute>
              <div>Rounds</div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
