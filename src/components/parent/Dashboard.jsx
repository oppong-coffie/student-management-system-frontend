import { useState } from "react";
import { Button, Card, Badge, Dropdown, Menu, Modal } from "antd";
import {
  MessageOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  BellOutlined,
  UserSwitchOutlined,
  ReadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import logo from "../../images/logo1.jpg";
import { Link } from "react-router-dom";

export default function ParentDashboard() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Announcement", message: "School will be closed on March 10th for maintenance." },
    { id: 2, title: "Parent-Teacher Meeting", message: "Your meeting is scheduled for March 15th at 2 PM." },
    { id: 3, title: "Assignment Deadline", message: "Math assignment is due on March 12th." },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleNotificationClick = (notificationId) => {
    const selected = notifications.find((n) => n.id === notificationId);
    setSelectedNotification(selected);
    setModalVisible(true);
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const notificationMenu = (
    <Menu className="w-64">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Menu.Item key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
            📢 {notification.title}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No new notifications</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C2D6B] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
          <span className="ml-2 text-xl font-bold text-[#FFD700]">TTU Parent Portal</span>
        </div>

        {/* Notification Bell */}
        <Dropdown overlay={notificationMenu} trigger={["click"]}>
          <div className="relative cursor-pointer">
            <Badge count={notifications.length} size="small" offset={[5, -3]}>
              <BellOutlined className="text-3xl text-[#FFD700] hover:text-yellow-400 transition-all" />
            </Badge>
          </div>
        </Dropdown>

        {/* Navigation */}
        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-[#FFD700] transition">Dashboard</a>
          <a href="#" className="hover:text-[#FFD700] transition">Messages</a>
          <a href="#" className="hover:text-[#FFD700] transition">Logout</a>
        </div>
      </nav>

      {/* Welcome Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-[#1C2D6B]">Welcome, Parent</h1>
        <p className="mt-2 text-gray-600">Monitor your child's academic journey with ease.</p>
      </header>

      {/* Dashboard Overview */}
      <section className="py-10 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<FileDoneOutlined />}
          title="Student Grades"
          description="View your child's academic performance."
        />
        <DashboardCard
          icon={<CalendarOutlined />}
          title="Class Schedule"
          description="Check upcoming lessons & exams."
        />
        <DashboardCard
          icon={<UserSwitchOutlined />}
          title="Attendance"
          description="Track your child's attendance record."
        />
        <DashboardCard
          icon={<ReadOutlined />}
          title="Student Activities"
          description="See extracurricular and school event participation."
        />
        <DashboardCard
          icon={<MessageOutlined />}
          title="Messages"
          description="Read teacher and school messages."
        />
     <DashboardCard
  icon={<ExclamationCircleOutlined />}
  title="Assignments"
  description="View unsubmitted assignments by your child."
  link="parentassignments"
/>
      </section>

      {/* Notification Modal */}
      <Modal
        title={selectedNotification?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>Close</Button>
        ]}
      >
        <p>{selectedNotification?.message}</p>
      </Modal>

      {/* Footer */}
      <footer className="bg-[#1C2D6B] text-white text-center py-4 mt-10">
        <span className="text-[#FFD700]">©2025 Takoradi Technical University.</span> All rights reserved.
      </footer>
    </div>
  );
}

function DashboardCard({ icon, title, description, link }) {
  return (
    
    <Card className="shadow-lg rounded-xl text-center border-t-4 border-[#FFD700] p-6 bg-white hover:shadow-xl transition-all">
    <div className="flex justify-center mb-4">
      <div className="bg-[#FFD700] text-[#1C2D6B] p-3 rounded-full text-3xl">
        {icon}
      </div>
    </div>
    <h2 className="text-lg font-semibold text-[#1C2D6B]">{title}</h2>
    <p className="text-gray-500">{description}</p>
    {link && (
      <Link to={link}>
        <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] border-none transition">
          View
        </Button>
      </Link>
    )}
  </Card>
  );
}
