import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar";

export default function AddNote() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/notes/create",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Note created successfully");

      navigate("/dashboard");

    } catch (error) {

        if (error.response?.status === 401) {
            toast.error("Session expired. Please login again");
                navigate("/login");
        } else {

      toast.error(
        error.response?.data?.message || "Failed to create note"
      );
    }

    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <Sidebar />

      <main className="ml-64 p-8">

        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl font-bold">
            Create New Note
          </h1>

          <p className="text-gray-400 mt-2 mb-8">
            Capture your thoughts and ideas.
          </p>


          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >

            <label className="block text-gray-300 mb-2"  htmlFor="note-title">
              Title
            </label>

            <input
              id="note-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 mb-6"
            />


            <label className="block text-gray-300 mb-2"  htmlFor="note-content">
              Content
            </label>

            <textarea
              id="note-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your note..."
              rows="10"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 resize-none"
            />


            <div className="flex gap-4 mt-6">

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition"
              >
                Create Note
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}