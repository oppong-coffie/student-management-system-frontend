import { Button } from "antd";
import React, { useEffect, useState } from 'react';
import {
  VideoCameraOutlined,
  FileTextOutlined,
  ReadOutlined,
  CalendarOutlined,
  SolutionOutlined,
  FileDoneOutlined,
  BellOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";



export default function StudentHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  
  return (
    <div className=" flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-3 bg-gray-100">
        <h1 className="text-3xl font-bold text-[#1C2D6B]">Welcome to Wood Bridge</h1>
        <p className=" text-gray-600">
          Manage your academic records, timetable, resources, and live classes.
        </p>
        <Button
          style={{ backgroundColor: "#FFD700", color: "#1C2D6B" }}
          className="mt-5 hover:bg-[#FFC107] transition"
        >
  {user?.name ? <p>Hello, {user.name}</p> : <p>Loading user...</p>}

  </Button>
      </header>

      {/* Quick Actions */}
      <section className="py-1 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={<FileDoneOutlined />} title="Academic Results" description="View your grades and performance reports." link="studentresult" />
        <FeatureCard icon={<CalendarOutlined />} title="Class Timetable" description="Check your scheduled classes and exams." link="studenttimetable" />
        <FeatureCard icon={<ReadOutlined />} title="Study Materials" description="Download lecture notes and resources." link="materials" />
        <FeatureCard icon={<VideoCameraOutlined />} title="Join Classroom" description="Attend live video conferences with your lecturers." link="classroom" />
        <FeatureCard icon={<FileTextOutlined />} title="Submit Assignments" description="Upload and submit your assignments." link="assignments" />
        <FeatureCard icon={<BellOutlined />} title="Notifications" description="Stay updated with announcements and news." link="studentnotifications" />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <div className="p-3 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
      <h2 className="text-lg font-semibold flex items-center justify-center">
        {icon} <span className="ml-2">{title}</span>
      </h2>
      <p className="text-gray-500">{description}</p>
      <Link to={link}>
        <Button
          style={{ backgroundColor: "#FFD700", color: "#1C2D6B" }}
          className="mt-2 hover:bg-[#FFC107] transition"
        >
          Open
        </Button>
      </Link>
    </div>
  );
}
