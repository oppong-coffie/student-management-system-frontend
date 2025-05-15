import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  BookOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../images/logo1.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 transition ${
      isActive ? "text-[#FFD700] underline font-bold" : "hover:text-[#FFD700]"
    }`;

  return (
    <nav className="bg-[#1C2D6B] text-white py-3 px-6 flex justify-between items-center relative">
      {/* Logo & Title */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" width={40} height={40} />
        <span className="ml-2 text-xl font-bold text-[#FFD700]">Teacher Dashboard</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <NavLink to="/dashboard/teacher" end className={linkClasses}>
          <HomeOutlined /> Home
        </NavLink>
        <NavLink to="/dashboard/teacher/manageclass" className={linkClasses}>
          <BookOutlined /> Class List
        </NavLink>
        <NavLink to="/dashboard/teacher/assignments" className={linkClasses}>
          <FileTextOutlined /> Assignments
        </NavLink>
        <NavLink to="/dashboard/teacher/resources" className={linkClasses}>
          <FolderOpenOutlined /> Resources
        </NavLink>
        <NavLink to="/logout" className={linkClasses}>
          <LogoutOutlined /> Logout
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseOutlined className="text-2xl" /> : <MenuOutlined className="text-2xl" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1C2D6B] flex flex-col items-center space-y-4 py-4 md:hidden z-10">
          <NavLink to="/dashboard/teacher" end className={linkClasses} onClick={() => setMenuOpen(false)}>
            <HomeOutlined /> Home
          </NavLink>
          <NavLink to="/classes" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <BookOutlined /> Classes
          </NavLink>
          <NavLink to="/dashboard/teacher/assignments" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <FileTextOutlined /> Assignments
          </NavLink>
          <NavLink to="/resources" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <FolderOpenOutlined /> Resources
          </NavLink>
          <NavLink to="/logout" className={linkClasses} onClick={() => setMenuOpen(false)}>
            <LogoutOutlined /> Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
}
