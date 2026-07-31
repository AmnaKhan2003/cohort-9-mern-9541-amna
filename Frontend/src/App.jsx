import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Signup from "./pages/AuthPages/SignUp";
import Login from "./pages/AuthPages/Login";
import NotesDashboard from "./pages/NotesPages/NotesDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><NotesDashboard /></ProtectedRoute>} />
      </Routes>

    <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;