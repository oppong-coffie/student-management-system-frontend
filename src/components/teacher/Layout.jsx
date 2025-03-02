import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../../images/logo1.jpg";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Dynamic Content */}
      <div className="flex-1">
        <Outlet /> {/* This will render either Dashboard or Assignments */}
      </div>

      {/* Footer */}
      <footer className="bg-[#1C2D6B] text-white text-center py-4">
        <span className="text-[#FFD700]">©2025 Takoradi Technical University.</span> All rights reserved.
      </footer>
    </div>
  );
}
