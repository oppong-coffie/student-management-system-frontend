import { Button } from "antd";
import logo from '../../images/logo1.jpg';
import { Link } from "react-router-dom";

export default function TeachersDashboard() {
  return (
    <div className="">
      {/* Navbar */}

      {/* Dashboard Actions */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border-t-4 border-[#FFD700]">
          <h2 className="text-lg font-semibold">📚 Manage Classes</h2>
          <p className="text-gray-500">Create and manage your classroom schedules.</p>
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
          <h2 className="text-lg font-semibold">📖 Study Materials</h2>
          <p className="text-gray-500">Upload and manage study resources.</p>
          <Link to="resources">
            <Button className="mt-4 bg-[#FFD700] text-[#1C2D6B] hover:bg-[#FFC107] transition">Upload</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
