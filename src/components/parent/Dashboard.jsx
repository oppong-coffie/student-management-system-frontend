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


  return (
    <div className="flex flex-col bg-gray-50">


      {/* Welcome Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-white">
        <h1 className="text-3xl font-bold text-[#1C2D6B]">Welcome, Parent</h1>
        <p className="text-gray-600">Monitor your child's academic journey with ease.</p>
      </header>

      {/* Dashboard Overview */}
      <section className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <DashboardCard
          icon={<FileDoneOutlined />}
          title="Student Grades"
          description="View your child's academic performance."
          link="parentresult"
        />
        <DashboardCard
          icon={<CalendarOutlined />}
          title="Class Time Table"
          description="Check upcoming lessons & exams."
          link="parenttimetable"
        />
        <DashboardCard
          icon={<UserSwitchOutlined />}
          title="Attendance"
          description="Track your child's attendance record."
          link="parentattendance"
        />
        <DashboardCard
          icon={<MessageOutlined />}
          title="Resources"
          description="Read teacher and school Study Materials."
          link="resources"
        />
     <DashboardCard
  icon={<ExclamationCircleOutlined />}
  title="Assignments"
  description="View unsubmitted assignments by your child."
  link="parentassignments"
/>
      </section>

    </div>
  );
}

function DashboardCard({ icon, title, description, link }) {
  return (
    
    <Card className="shadow-lg rounded-xl text-center border-t-4 border-[#FFD700] bg-white hover:shadow-xl transition-all">
    <div className="flex justify-center">
      <div className="bg-[#FFD700] text-[#1C2D6B] p-3 rounded-full text-xl">
        {icon}
      </div>
    </div>
    <h2 className="text-lg font-semibold text-[#1C2D6B]">{title}</h2>
    <p className="text-gray-500">{description}</p>
    {link && (
      <Link to={link}>
        <Button className="mt-1 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] border-none transition">
          View
        </Button>
      </Link>
    )}
  </Card>
  );
}
