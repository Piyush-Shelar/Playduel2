import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#040506] text-white overflow-hidden">

      {/* ============ MOBILE BACKDROP ============ */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        />
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static z-40
          h-full w-64
          bg-[#070b16] border-r border-white/10 p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* LOGO */}
        <h2 className="text-2xl font-extrabold text-[#1f5cff] mb-10">
          SkillDuels
        </h2>

        {/* NAV */}
        <nav className="space-y-3">
          {[
            { to: "/add-category", label: "➕ Add Category" },
            { to: "/category-management", label: "🗂 Category Management" },
             { to: "/question-management", label: "⁉️ Question Management" },
            { to: "/view-players", label: "👥 View Players" },
            { to: "/analytics", label: "📊 Analytics" },
             
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-semibold transition ${
                  isActive
                    ? "bg-[#1f5cff] text-black"
                    : "bg-white/5 hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">

        {/* ================= TOP NAVBAR ================= */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-[#070b16] border-b border-white/10">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* HAMBURGER — MOBILE ONLY */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>

            <h1 className="text-lg font-bold tracking-wide">
              Admin Dashboard
            </h1>
          </div>

          {/* RIGHT — ADMIN */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-xs text-white/50">Administrator</p>
            </div>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#1f5cff] overflow-hidden group-hover:scale-105 transition">
              <img
                src="https://api.dicebear.com/7.x/identicon/svg?seed=admin"
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
