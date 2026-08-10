import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Signup from "./pages/AuthPages/SignUp";
import Login from "./pages/AuthPages/Login";
import Dashboard from "./pages/NotesPages/NotesDashboard";
import AddNote from "./pages/NotesPages/AddNote";
import EditNote from "./pages/NotesPages/EditNote";
import UserProfile from "./pages/NotesPages/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
function App() {

  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/add-note" element={<ProtectedRoute><AddNote /></ProtectedRoute>}/>
        <Route path="/edit-note/:id" element={<ProtectedRoute><EditNote /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </BrowserRouter>

  );
}

export default App;