import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import {
  Input,
  Button,
  DatePicker,
  List,
  message,
  Card,
  Space,
  Typography,
} from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Text } = Typography;


const Theory = () => {
    const navigate = useNavigate();

  const { id } = useParams(); // ✅ Get assignment ID from URL
  const [loading, setLoading] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    questions: [],
    submissions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    correctAnswer: "",
  });

  // ✅ Fetch the assignment data by ID
  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://student-management-system-backend-production.up.railway.app/teachers/theory/${id}`);
      setNewAssignment(res.data); // Set fetched data into state
    } catch (error) {
      console.error("Error fetching assignment:", error);
      message.error("Failed to fetch assignment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAssignment();
    }
  }, [id]);

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...newAssignment.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setNewAssignment({ ...newAssignment, questions: updatedQuestions });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = newAssignment.questions.filter(
      (_, i) => i !== index
    );
    setNewAssignment({ ...newAssignment, questions: updatedQuestions });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
  
      // Merge state-based changes
      let updatedQuestions = [...newAssignment.questions];
      if (newQuestion.question.trim() && newQuestion.correctAnswer.trim()) {
        updatedQuestions.push(newQuestion);
      }
  
      updatedQuestions = updatedQuestions.filter(
        q => q.question.trim() && q.correctAnswer.trim()
      );
  
      const assignmentToSave = {
        ...newAssignment,
        questions: updatedQuestions,
      };
  
      await axios.put(
        `https://student-management-system-backend-production.up.railway.app/teachers/theory/${newAssignment._id}`,
        assignmentToSave,
        { headers: { "Content-Type": "application/json" } }
      );
  
      
    message.success("Assignment updated successfully");

    // ✅ Redirect after save
    navigate("/dashboard/teacher/assignments");

    } catch (error) {
      console.error("Error updating assignment:", error);
      message.error("Failed to update assignment");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <Card
        bordered
        style={{ marginBottom: 20 }}
        title={
          <Space>
            <FormOutlined />
            <Text strong style={{ fontSize: 16 }}>
              Edit Assignment
            </Text>
          </Space>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Assignment Title"
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
          />
          <DatePicker
            style={{ width: "100%" }}
            value={newAssignment.dueDate ? moment(newAssignment.dueDate) : null}
            onChange={(date, dateString) =>
              setNewAssignment({ ...newAssignment, dueDate: dateString })
            }
          />
        </Space>
      </Card>

      <Card bordered style={{ marginBottom: 20 }} title="Questions">
        <List
          bordered
          dataSource={newAssignment.questions}
          locale={{ emptyText: "No questions added yet" }}
          renderItem={(q, index) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteQuestion(index)}
                />,
              ]}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, "question", e.target.value)
                  }
                />
                <Input
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(index, "correctAnswer", e.target.value)
                  }
                />
              </Space>
            </List.Item>
          )}
        />
      </Card>

      <Card bordered style={{ marginBottom: 20 }} title="Add New Question">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Question"
            value={newQuestion.question}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
          />
          <Input
            placeholder="Correct Answer"
            value={newQuestion.correctAnswer}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
            }
          />
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              if (
                newQuestion.question.trim() &&
                newQuestion.correctAnswer.trim()
              ) {
                setNewAssignment((prev) => ({
                  ...prev,
                  questions: [...prev.questions, newQuestion],
                }));
                setNewQuestion({ question: "", correctAnswer: "" });
              } else {
                message.error(
                  "Please complete the question and correct answer."
                );
              }
            }}
          >
            Add Another Question
          </Button>
        </Space>
      </Card>

      <Button type="primary" onClick={handleSave} block loading={loading}>
        Save Assignment
      </Button>
    </div>
  );
};

export default Theory;
