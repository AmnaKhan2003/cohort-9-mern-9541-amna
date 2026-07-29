import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
\
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
 
        <div className="text-2xl font-bold tracking-wide"> Note<span className="text-blue-400">Flow</span> </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-lg border border-blue-400 text-blue-300 
            hover:bg-blue-400 hover:text-white transition duration-300"
          >
            Login
          </button>


          <button
            onClick={() => navigate('/signup')}
            className="px-5 py-2 rounded-lg bg-blue-500 
            hover:bg-blue-600 transition duration-300 shadow-lg shadow-blue-500/30"
          >
            Create Account
          </button>

        </div>

      </nav>


      <section className="flex flex-col items-center justify-center text-center px-6 pt-20">

        <div className="max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

            Organize Your Ideas.
            <span className="text-blue-400">
              {" "}Create Amazing Notes.
            </span>

          </h1>


          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">

            A powerful note management platform designed to help you capture
            ideas, manage tasks, and stay productive anywhere, anytime.

          </p>


          <div className="mt-10 flex justify-center gap-5">

            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 rounded-xl bg-blue-500 text-lg font-semibold
              hover:bg-blue-600 transition shadow-xl shadow-blue-500/30"
            >
              Get Started Free
            </button>


            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-xl bg-white/10 backdrop-blur
              border border-white/20 hover:bg-white/20 transition"
            >
              Sign In
            </button>

          </div>


        </div>



        {/* Dashboard Preview Card */}
        <div className="mt-20 w-full max-w-5xl">

          <div
            className="rounded-3xl border border-white/10 
            bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
          >

            <div className="grid md:grid-cols-3 gap-6">


              <div className="rounded-xl bg-white/10 p-6 text-left">
                <h3 className="text-xl font-semibold">
                  📝 Smart Notes
                </h3>
                <p className="mt-3 text-gray-300">
                  Create and manage your notes with an intuitive interface.
                </p>
              </div>



              <div className="rounded-xl bg-white/10 p-6 text-left">
                <h3 className="text-xl font-semibold">
                  🔒 Secure Access
                </h3>
                <p className="mt-3 text-gray-300">
                  Your personal notes stay protected with authentication.
                </p>
              </div>



              <div className="rounded-xl bg-white/10 p-6 text-left">
                <h3 className="text-xl font-semibold">
                  ⚡ Productivity
                </h3>
                <p className="mt-3 text-gray-300">
                  Organize your workflow and boost your productivity.
                </p>
              </div>


            </div>

          </div>

        </div>


      </section>



      {/* Footer */}
      <footer className="text-center text-gray-400 py-10 mt-20">
        © 2026 NoteFlow. All rights reserved.
      </footer>


    </div>
  );
}