import { useEffect, useState } from "react";
import { Button } from "antd";
import { 
  VideoCameraOutlined, 
  FileTextOutlined, 
  ReadOutlined, 
  CalendarOutlined, 
  SolutionOutlined, 
  FileDoneOutlined 
} from "@ant-design/icons";
import logo from "../../images/logo1.jpg";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom"; // ✅ Import this

export default function StudentHome() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // ✅ Get user from localStorage
    const storedUser = localStorage.getItem("user");
    console.log(storedUser.role);
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
}, []);
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <Outlet /> {/* ✅ This will render nested routes */}

      {/* Footer */}
      <footer className="bg-[#1C2D6B] text-white text-center py-4">
        <span className="text-[#FFD700]">©2025 Wood Bridge International School.</span> All rights reserved.
      </footer>
    </div>
  );
}
