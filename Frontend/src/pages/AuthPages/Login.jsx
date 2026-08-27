import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
            withCredentials: true
         }
      );

      console.log(response.data);

      toast.success(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <p className="text-gray-300 text-center mt-2">
          Welcome back to NoteFlow
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-blue-400"
          />

          <button
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-400 ml-2"
          >
            Sign Up
          </button>

        </p>

      </div>
    </div>
  );
}