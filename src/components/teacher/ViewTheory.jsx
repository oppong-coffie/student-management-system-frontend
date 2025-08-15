import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, List, Typography, Space, Spin, Button, message } from "antd";
import axios from "axios";
import moment from "moment";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ViewTheory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState(null);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://student-management-system-backend-production.up.railway.app/teachers/theory/${id}`);
      setAssignment(data);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      message.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAssignment();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!assignment) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Assignment not found</p>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/dashboard/teacher/assignments")}
        style={{ marginBottom: 20 }}
      >
        Back to Assignments
      </Button>

      <Card bordered>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3}>{assignment.title}</Title>
          <Text type="secondary">
            Due Date:{" "}
            {assignment.dueDate ? moment(assignment.dueDate).format("MMMM Do YYYY") : "No due date"}
          </Text>
        </Space>
      </Card>

      <Card
        bordered
        title={<Text strong>Questions</Text>}
        style={{ marginTop: 20 }}
      >
        <List
          bordered
          dataSource={assignment.questions}
          locale={{ emptyText: "No questions available" }}
          renderItem={(q, index) => (
            <List.Item>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>
                  Q{index + 1}: {q.question}
                </Text>
                <Text type="secondary">Correct Answer: {q.correctAnswer}</Text>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ViewTheory;
