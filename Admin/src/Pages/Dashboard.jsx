import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-[#040506] text-white">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#070b16] border-r border-white/10 p-6">
        <h2 className="text-2xl font-extrabold text-[#1f5cff] mb-10">
          SkillDuels
        </h2>

        <nav className="space-y-3">
          <NavLink
            to="/add-questions"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-semibold transition ${
                isActive
                  ? "bg-[#1f5cff] text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`
            }
          >
            ➕ Add Questions
          </NavLink>

          <NavLink
            to="/question-management"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-semibold transition ${
                isActive
                  ? "bg-[#1f5cff] text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`
            }
          >
            🗂 Question Management
          </NavLink>

          <NavLink
            to="/view-players"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-semibold transition ${
                isActive
                  ? "bg-[#1f5cff] text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`
            }
          >
            👥 View Players
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl font-semibold transition ${
                isActive
                  ? "bg-[#1f5cff] text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`
            }
          >
            📊 Analytics
          </NavLink>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        
        {/* ================= TOP NAVBAR ================= */}
        <header className="h-16 flex items-center justify-between px-6 bg-[#070b16] border-b border-white/10">
          
          {/* LEFT */}
          <h1 className="text-lg font-bold tracking-wide">
            Admin Dashboard
          </h1>

          {/* RIGHT — ADMIN ICON (REPLACED LOGOUT) */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-white/50">Administrator</p>
            </div>

            <div className="w-10 h-10 rounded-full border-2 border-[#1f5cff] overflow-hidden group-hover:scale-105 transition">
              <img
                src="https://api.dicebear.com/7.x/identicon/svg?seed=admin"
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
