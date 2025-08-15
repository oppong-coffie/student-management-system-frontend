  import React, { useState, useEffect } from "react";
  import { useParams, useSearchParams, useNavigate } from "react-router-dom";
  import { Card, Typography, Input, Button, message, Space, Spin, Modal } from "antd";
  import axios from "axios";
  import moment from "moment";

  const { Title, Text } = Typography;

  const DoTheory = () => {
    const { theoryid } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const studentid = searchParams.get("studentid");

    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [studentname, setStudentName] = useState("");
    const [score, setScore] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showResultModal, setShowResultModal] = useState(false);

    // Fetch assignment details
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://student-management-system-backend-production.up.railway.app/teachers/theory/${theoryid}`);
        setAssignment(data);
      } catch (error) {
        console.error("Error fetching assignment:", error);
        message.error("Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };

    // Fetch student details
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`https://student-management-system-backend-production.up.railway.app/students/${studentid}`);
        setStudentName(data.name); // ✅ just the name string
      } catch (error) {
        console.error("Error fetching student:", error);
        message.error("Failed to load student info");
      }
    };
    

    useEffect(() => {
      if (theoryid) fetchAssignment();
      if (studentid) fetchStudent();
    }, [theoryid, studentid]);

    const handleAnswerChange = (index, value) => {
      setAnswers((prev) => ({ ...prev, [index]: value }));
    };

    const handleSubmit = async () => {
      if (!assignment) return;

      // Ensure all questions are answered
      if (assignment.questions.some((_, idx) => !answers[idx] || !answers[idx].trim())) {
        message.error("Please answer all questions before submitting.");
        return;
      }

      // Calculate score
      let correctCount = 0;
      assignment.questions.forEach((q, idx) => {
        if (answers[idx].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
          correctCount++;
        }
      });

      const calculatedScore = (correctCount / assignment.questions.length) * 100;
      setScore(calculatedScore);

      try {
        // Send score to backend
        await axios.post("https://student-management-system-backend-production.up.railway.app/students/theorysubmit", {
          theoryId: theoryid,
          studentName: studentname,
          studentId: studentid,
          score: calculatedScore,
        });

        setShowResultModal(true);
      } catch (error) {
        console.error("Error submitting answers:", error);
        message.error("Failed to submit your answers.");
      }
    };

    const handleCloseModal = () => {
      setShowResultModal(false);
      navigate(-1); // Go back to the previous page
    };

    if (loading) {
      return <div style={{ textAlign: "center", paddingTop: 100 }}><Spin size="large" /></div>;
    }

    if (!assignment) {
      return <p style={{ textAlign: "center", marginTop: 50 }}>Assignment not found</p>;
    }

    return (
      <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
        kkk {studentname}
        <Card bordered style={{ marginBottom: 20 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={3}>{assignment.title}</Title>
            <Text type="secondary">
              Due Date: {assignment.dueDate ? moment(assignment.dueDate).format("MMMM Do YYYY") : "No due date"}
            </Text>
          </Space>
        </Card>

        <Card bordered title="Questions">
          {assignment.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: 20 }}>
              <Text strong>Q{index + 1}: {q.question}</Text>
              <Input.TextArea
                rows={2}
                placeholder="Type your answer here"
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}
        </Card>

        <Button
          type="primary"
          block
          style={{ marginTop: 20 }}
          onClick={handleSubmit}
        >
          Submit All Answers
        </Button>

        <Modal
          title="Test Result"
          visible={showResultModal}
          onOk={handleCloseModal}
          onCancel={handleCloseModal}
          okText="Close"
        >
          <Title level={4}>Your Score: {score?.toFixed(2)}%</Title>
          <Text>You answered {Math.round((score / 100) * assignment.questions.length)} out of {assignment.questions.length} questions correctly.</Text>
        </Modal>
      </div>
    );
  };

  export default DoTheory;
