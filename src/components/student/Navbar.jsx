import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo1.jpg";

const Navbar = () => {
  return (
    <nav className="bg-[#1C2D6B] text-white py-4 px-6 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <img className="w-10 h-10" src={logo} alt="Logo" />
        <span className="ml-2 text-xl font-bold text-[#FFD700]">Wood Bridge</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/dashboard/student" className="hover:text-[#FFD700] transition">Dashboard</Link>
        <Link to="/dashboard/student/materials" className="hover:text-[#FFD700] transition">Resources</Link>
        <Link to="/dashboard/student/results" className="hover:text-[#FFD700] transition">Results</Link>
        <Link to="/dashboard/student/timetable" className="hover:text-[#FFD700] transition">Timetable</Link>
        <Link to="/dashboard/student/assignments" className="hover:text-[#FFD700] transition">Assignments</Link>
        <Link to="/" className="hover:text-[#FFD700] transition">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
