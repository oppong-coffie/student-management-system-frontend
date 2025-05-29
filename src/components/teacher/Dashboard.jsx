import { Button } from "antd";
import logo from '../../images/logo1.jpg';
import { Link } from "react-router-dom";

export default function TeachersDashboard() {
  return (
    <div className="">
      {/* Dashboard Actions */}
      <section className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">📚 Manage Class</h2>
          <p className="text-gray-500">Enroll and manage your classroom members.</p>
          <Link to="manageclass">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">View</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">📂 Assignments</h2>
          <p className="text-gray-500">Create and review assignments.</p>
          <Link to="assignments">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Manage</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">🎥 Live Classes</h2>
          <p className="text-gray-500">Host and schedule live video sessions.</p>
          <Link to="liveclass">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Start</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">📚 Study Materials</h2>
          <p className="text-gray-500">Upload and manage study resources.</p>
          <Link to="resources">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold"> 🗓️  Time Table</h2>
          <p className="text-gray-500">Upload and manage class schedules.</p>
          <Link to="teachertimetable">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">🔔 Notifications</h2>
          <p className="text-gray-500">Send and manage announcements or alerts.</p>
          <Link to="notifications">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">📊 Results</h2>
          <p className="text-gray-500">Upload and manage student academic results.</p>
          <Link to="results">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold"> 📊  Attendance</h2>
          <p className="text-gray-500">Upload and manage student attendance records.</p>
          <Link to="attendance">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
