import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../../Components/Sidebar";

export default function EditNote() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const getNote = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/notes/specificNote/${id}`,
        {
          withCredentials: true,
        }
      );

      setFormData({
        title: response.data.note.title,
        content: response.data.note.content,
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Unable to fetch note"
      );

      navigate("/dashboard");
    }
  };

  useEffect(() => {
    getNote();
  }, [id]);


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

      await axios.put(
        `http://localhost:5000/api/notes/edit/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Note updated successfully");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to update note"
      );

    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white">

      <Sidebar />

      <main className="ml-64 p-8">

        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl font-bold">
            Edit Note
          </h1>

          <p className="text-gray-400 mt-2 mb-8">
            Update your note.
          </p>


          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >

            <label className="block text-gray-300 mb-2"  htmlFor="edit-note-title">
              Title
            </label>

            <input
              id="edit-note-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-400 mb-6"
            />


            <label className="block text-gray-300 mb-2"  htmlFor="edit-note-content">
              Content
            </label>

            <textarea
              id="edit-note-content"
              name="content"
              value={formData.content}
              onChange={handleChange}
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
                Save Changes
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}