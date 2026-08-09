import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  Plus,
  User,
  LogOut,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {

  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");


  const handleNavigation = (name, path) => {
    setActive(name);
    navigate(path);
  };


  const handleLogout = async () => {

    try {

      await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out successfully");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Logout failed"
      );

    }

  };


  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Note",
      path: "/add-note",
      icon: Plus,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];


  return (

    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-[#0d1424] text-white">

      <div className="border-b border-white/10 px-7 py-7">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">

            <FileText size={23} />

          </div>
          <div>

            <h1 className="text-2xl font-bold tracking-tight"> Note<span className="text-blue-400">Flow</span></h1>
            <p className="text-xs text-gray-500">Your ideas, organized.</p>

          </div>

        </div>

      </div>

      <div className="flex-1 px-4 py-8">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Workspace</p>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <button
                key={item.path}
                onClick={() =>
                  handleNavigation(item.name, item.path)
                }
                className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >

                <div className="flex items-center gap-3">

                  <Icon size={19} />

                  <span className="font-medium">
                    {item.name}
                  </span>

                </div>


                {isActive && (
                  <ChevronRight size={17} />
                )}

              </button>

            );

          })}

        </div>

      </div>
      <div className="border-t border-white/10 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 bg-red-900 text-white transition bg-red-500/10 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />
          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>

    </aside>

  );
}