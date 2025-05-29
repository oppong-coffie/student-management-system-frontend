import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo1.jpg";
import {
  BellOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Modal, Dropdown, Menu, Badge } from "antd";

export default function ParentLayout() {
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/dashboard/parent", label: "Dashboard" },
    { path: "/dashboard/parent/parentattendance", label: "Attendance" },
    { path: "/dashboard/parent/parentresult", label: "Result" },
    { path: "/dashboard/parent/resources", label: "Resources" },
    { path: "/dashboard/parent/parentassignments", label: "Assignments" },
    { path: "/", label: "Logout" },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:3000/parents/notification");
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = (notificationId) => {
    const selected = notifications.find((n) => n._id === notificationId);
    setSelectedNotification(selected);
    setModalVisible(true);
    setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
  };

  const notificationMenu = (
    <Menu className="w-64">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Menu.Item
            key={notification._id}
            onClick={() => handleNotificationClick(notification._id)}
          >
            📢 {notification.title}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No new notifications</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="flex flex-col bg-gray-50">
      <nav className="bg-[#1C2D6B] text-white px-4 py-3 shadow-md flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-yellow-400">Wood Bridge Parent Portal</span>
        </div>
 <Dropdown overlay={notificationMenu} trigger={["click"]}>
            <div className="relative cursor-pointer">
              <Badge count={notifications.length} size="small" offset={[5, -3]}>
                <BellOutlined className="text-2xl text-yellow-400 hover:text-yellow-300 transition" />
              </Badge>
            </div>
          </Dropdown>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
         

          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`transition hover:text-yellow-400 ${
                location.pathname === link.path ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-[#1C2D6B] text-white flex flex-col space-y-2 py-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`hover:text-yellow-400 ${
                location.pathname === link.path ? "text-yellow-400 font-semibold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <main className="flex-grow p-4">
        <Outlet />
      </main>

      <footer className="bg-[#1C2D6B] text-white text-center py-4 mt-1">
        <span className="text-yellow-400">©2025 Wood Bridge International School</span>. All rights reserved.
      </footer>

      <Modal
        open={modalVisible}
        title={<span className="text-blue-800">{selectedNotification?.title}</span>}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <p className="text-gray-700">{selectedNotification?.message}</p>
      </Modal>
    </div>
  );
}
