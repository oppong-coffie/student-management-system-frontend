import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Input,
  Button,
  DatePicker,
  List,
  message,
  Card,
  Divider,
  Space,
  Typography,
} from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Theory = () => {
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

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const fetchAssignments = async () => {
    console.log("Fetching assignments...");
  };

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
    let assignmentToSave = { ...newAssignment };

    if (newQuestion.question.trim() && newQuestion.correctAnswer.trim()) {
      assignmentToSave.questions = [
        ...assignmentToSave.questions,
        newQuestion,
      ];
    }

    try {
      const method = selectedAssignment ? "PUT" : "POST";
      const url = selectedAssignment
        ? `https://student-management-system-backend-production.up.railway.app/teachers/editassignments/${selectedAssignment._id}`
        : "https://student-management-system-backend-production.up.railway.app/teachers/postassignments";

      await axios({
        method,
        url,
        data: assignmentToSave,
        headers: { "Content-Type": "application/json" },
      });

      message.success("Assignment saved successfully");
      fetchAssignments();

      setNewAssignment({
        title: "",
        dueDate: "",
        questions: [],
        submissions: [],
      });
      setNewQuestion({
        question: "",
        correctAnswer: "",
      });
    } catch (error) {
      console.error("Error saving assignment:", error);
      message.error("Failed to save assignment");
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
              {selectedAssignment ? "Edit Assignment" : "Create Assignment"}
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

      <Button type="primary" onClick={handleSave} block>
        Save Assignment
      </Button>
    </div>
  );
};

export default Theory;
    