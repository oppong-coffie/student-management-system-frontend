import { Outlet } from "react-router-dom";
import logo from "../../images/logo1.jpg";
import { BellOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu } from "antd";

export default function ParentLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C2D6B] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
          <span className="ml-2 text-xl font-bold text-[#FFD700]">TTU Parent Portal</span>
        </div>
        <Dropdown overlay={<Menu><Menu.Item>No notifications</Menu.Item></Menu>} trigger={["click"]}>
          <div className="relative cursor-pointer">
            <Badge count={0} size="small" offset={[5, -3]}>
              <BellOutlined className="text-3xl text-[#FFD700] hover:text-yellow-400 transition-all" />
            </Badge>
          </div>
        </Dropdown>
      </nav>

      {/* Render nested child routes here */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-[#1C2D6B] text-white text-center py-4 mt-10">
        <span className="text-[#FFD700]">©2025 Takoradi Technical University.</span> All rights reserved.
      </footer>
    </div>
  );
}
