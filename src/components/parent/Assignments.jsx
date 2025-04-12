import { useEffect, useState } from "react";
import { Button, Modal, Radio, Spin, message } from "antd";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [scoreModalVisible, setScoreModalVisible] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // ✅ Get user from localStorage
    const storedUser = localStorage.getItem("user");
    console.log(storedUser.role);
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
}, []);

  const student = {
    id: user?.id || "Unknown",
    name: user?.name || "Unknown",
    indexnumber: user?.indexnumber
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

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
    
 
  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold text-[#1C2D6B] mb-4">Assignments</h1>
   

      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.length > 0 ? (
          assignments
            .filter(assignment => !assignment.submissions.some(sub => sub.studentId === user?.id)) // ✅ Filter out submitted assignments
            .map((assignment) => (
              <div key={assignment._id} className="p-4 border rounded-lg shadow">
                <h2 className="text-lg font-semibold">{assignment.title}</h2>
                <p className="text-gray-500">Due: {assignment.dueDate}</p>
                <Button
                  type="primary"
                  className="mt-4 bg-[#FFD700] text-[#1C2D6B]"
                  onClick={() => openAssignment(assignment)}
                >
                  Open
                </Button>
              </div>
            ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
      
      )}
    
    </div>
  );
}
