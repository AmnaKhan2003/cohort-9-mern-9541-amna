import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Plus,
  FileText,
  Edit3,
  Trash2,
  Clock3,
  Search,
  StickyNote,
} from "lucide-react";

import Sidebar from "../../Components/Sidebar";

export default function NotesDashboard() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const getNotes = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/notes/allNotes",
        {
          withCredentials: true,
        }
      );

      setNotes(response.data.notes);

    } catch (error) {

      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Unable to fetch notes");
      }

    }

  };


  useEffect(() => {
    getNotes();
  }, []);


  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/notes/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      setNotes((currentNotes) =>
      currentNotes.filter((note) => note._id !== id)
    );

      toast.success("Note deleted successfully");

    } catch (error) {

  if (error.response?.status === 401) {
    toast.error("Session expired. Please login again");
    navigate("/login");
    return;
  }

  toast.error(
    error.response?.data?.message ||
    "Failed to delete note"
  );
}

  };


  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div className="min-h-screen bg-[#0b1120] text-white">

      <Sidebar />
      <main className="ml-72 min-h-screen px-10 py-9">

        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Manage and organize your thoughts in one place.
            </p>

          </div>

          <button
            onClick={() => navigate("/add-note")}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold shadow-lg shadow-blue-500/20 transition hover:bg-blue-600 hover:shadow-blue-500/30"
          >
            <Plus size={19} />

            Add Note
          </button>

        </div>

        <div className="mt-9 grid grid-cols-3 gap-5">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total Notes
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {notes.length}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FileText size={21} />
              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Your Workspace
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  Personal
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <StickyNote size={21} />
              </div>

            </div>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <h2 className="mt-2 text-lg font-semibold text-emerald-400">
                  Active
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Clock3 size={21} />
              </div>

            </div>

          </div>

        </div>

        <div className="mt-9 flex items-center justify-between">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-305 rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/50"
            />

          </div>

        </div>

        {filteredNotes.length === 0 ? (

          <div className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">

              <StickyNote size={30} />

            </div>

            <h3 className="mt-5 text-xl font-semibold">
              {search ? "No notes found" : "Your workspace is empty"}
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm text-gray-500">
              {search
                ? "Try searching with a different keyword."
                : "Start capturing your ideas by creating your first note."}
            </p>

          </div>

        ) : (

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredNotes.map((note) => (

              <div
                key={note._id}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06]"
              >

                <div className="mb-5 flex items-start justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <FileText size={19} />
                  </div>

                  <span className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-500">
                    Note
                  </span>

                </div>

                <h3 className="line-clamp-1 text-xl font-semibold">
                  {note.title}
                </h3>

                <p className="mt-3 line-clamp-4 min-h-[96px] text-sm leading-6 text-gray-400">
                   <div
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">

                  <span className="text-xs text-gray-600">
                    Your note
                  </span>


                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        navigate(`/edit-note/${note._id}`)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                      title="Edit note"
                    >
                      <Edit3 size={16} />
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(note._id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition hover:bg-red-500 hover:text-white"
                      title="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );
}