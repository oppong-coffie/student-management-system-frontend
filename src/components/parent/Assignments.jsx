import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/teachers/getassignments");
        setAssignments(response.data);
      } catch (error) {
        message.error("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Filter assignments not yet submitted by the user
  const filteredAssignments = assignments.filter(
    (assignment) => !assignment.submissions?.some((sub) => sub.studentId === user?.id)
  );

  return (
    <div className="p-11 bg-gradient-to-br from-blue-50 to-yellow-50">
    <h1 className="text-3xl font-bold text-blue-900 mb-8">📘 My Child's Assignments</h1>
  
    {loading ? (
      <div className="flex justify-center items-center h-60">
        <Spin size="large" />
      </div>
    ) : filteredAssignments.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl border-t-4 border-blue-400 transition duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-blue-800">{assignment.title}</h2>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-md">
                  📅 {assignment.dueDate}
                </span>
              </div>
  
              <div className="mt-4 text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full w-fit">
                ⏳ Not Submitted
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center mt-24 text-blue-800">
        <h2 className="text-2xl font-semibold mb-2">🎉 You're All Set!</h2>
        <p className="text-sm text-blue-600">You have no pending assignments right now.</p>
      </div>
    )}
  </div>
  
  );
}
