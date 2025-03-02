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

  const openAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setAnswers({});
    setScore(0);
  };

  const calculateScore = (updatedAnswers) => {
    let newScore = 0;
    selectedAssignment.questions.forEach((q, index) => {
      if (updatedAnswers[index] === q.correctOption) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    const updatedAnswers = { ...answers, [questionIndex]: selectedOption };
    setAnswers(updatedAnswers);
    calculateScore(updatedAnswers);
  };

  const isCompleted = selectedAssignment
    ? Object.keys(answers).length === selectedAssignment.questions.length
    : false;

    const submitAssignment = async () => {
      if (!selectedAssignment) {
        message.error("No assignment selected.");
        return;
      }
    
      if (!isCompleted) {
        message.warning("Please answer all questions before submitting.");
        return;
      }
    
      setSubmitting(true);
    
      try {
        console.log("Submitting assignment..."); // Debugging
        console.log("Student ID:", student.id);
        console.log("Assignment ID:", selectedAssignment._id);
        console.log("Score:", score);
    
        await axios.post("http://localhost:3000/students/submit", {
          studentId: student.id,
          studentName: student.name,
          assignmentId: selectedAssignment._id,
          score,
        });
    
        message.success("Assignment submitted successfully!");
        
        setTotalQuestions(selectedAssignment.questions.length);
        setScoreModalVisible(true);
      } catch (error) {
        console.error("Submission error:", error); // Debugging
        message.error("Error submitting the assignment.");
      } finally {
        setSubmitting(false);
        setSelectedAssignment(null); 
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

      {/* Assignment Modal */}
      <Modal
        title={selectedAssignment?.title}
        open={!!selectedAssignment}
        onCancel={() => setSelectedAssignment(null)}
        footer={[
          <Button key="cancel" onClick={() => setSelectedAssignment(null)}>
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            onClick={submitAssignment}
            disabled={!isCompleted}
          >
            Submit
          </Button>,
        ]}
      >
        {selectedAssignment?.questions.map((q, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{q.question}</h3>
            <Radio.Group
              onChange={(e) => handleAnswerSelect(index, e.target.value)}
              value={answers[index]}
            >
              {q.options.map((option, idx) => (
                <Radio key={idx} value={option} className="block">
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        ))}
      </Modal>

      {/* Score Modal */}
      <Modal
        title="Assignment Submitted!"
        open={scoreModalVisible}
        onCancel={() => setScoreModalVisible(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setScoreModalVisible(false)}>
            OK
          </Button>,
        ]}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your Score: {score}/{totalQuestions}</h2>
          {score === totalQuestions ? (
            <p className="text-green-600 font-semibold mt-2">🎉 Excellent! You got everything right!</p>
          ) : score > 0 ? (
            <p className="text-blue-600 font-semibold mt-2">👍 Good job! Try improving next time.</p>
          ) : (
            <p className="text-red-600 font-semibold mt-2">😔 Don't worry, keep practicing!</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
