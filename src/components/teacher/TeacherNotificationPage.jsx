import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  List,
  Modal,
  Popconfirm,
} from "antd";
import axios from "axios";

const { TextArea } = Input;

export default function TeacherNotificationPage() {
  const [form] = Form.useForm();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("student-management-system-backend-production.up.railway.app/teachers/notifications");
      setNotifications(res.data);
    } catch (err) {
      message.error("Failed to fetch notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `student-management-system-backend-production.up.railway.app/teachers/notifications/${editingId}`,
          values
        );
        message.success("Notification updated!");
      } else {
        await axios.post("student-management-system-backend-production.up.railway.app/teachers/notifications", values);
        message.success("Notification posted!");
      }
      form.resetFields();
      setEditingId(null);
      fetchNotifications();
    } catch (err) {
      message.error("Action failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    form.setFieldsValue({
      title: item.title,
      message: item.message,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`student-management-system-backend-production.up.railway.app/api/notifications/${id}`);
      message.success("Notification deleted");
      fetchNotifications();
    } catch (err) {
      message.error("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FC] p-6 flex flex-col items-center space-y-6">
    {/* Form Card */}
    <Card className="w-full max-w-xl shadow-xl border-t-4 border-[#FFD700]">
  <h1 className="text-2xl font-bold text-center text-[#1C2D6B] mb-4">
    📝 {editingId ? "Edit Notification" : "Post New Notification"}
  </h1>

  <Form layout="vertical" form={form} onFinish={onFinish}>
    {/* Flex container for Title and Message */}
    <div className="flex flex-col md:flex-row md:space-x-4">
      {/* Title input */}
      <div className="flex-1">
        <Form.Item
          label="🔖 Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
      </div>

      {/* Message input */}
      <div className="flex-1">
        <Form.Item
          label="💬 Message"
          name="message"
          rules={[{ required: true, message: "Please enter a message" }]}
        >
          <TextArea rows={4} placeholder="Enter message" />
        </Form.Item>
      </div>
    </div>

    {/* Buttons */}
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="bg-[#1C2D6B] hover:bg-[#0f1e4c] text-[#FFD700] font-semibold"
        loading={loading}
        block
      >
        {editingId ? "🔁 Update Notification" : "📢 Post Notification"}
      </Button>
      {editingId && (
        <Button
          block
          onClick={() => {
            form.resetFields();
            setEditingId(null);
          }}
          className="mt-2 bg-gray-200 hover:bg-gray-300"
        >
          ❌ Cancel Edit
        </Button>
      )}
    </Form.Item>
  </Form>
</Card>

  
    {/* Notification List Card */}
    <Card className="w-full max-w-4xl shadow-md border-l-4 border-[#1C2D6B] bg-white">
      <h2 className="text-xl font-bold text-[#1C2D6B] mb-4">
        📚 Saved Notifications
      </h2>
      <List
        bordered
        dataSource={notifications}
        locale={{ emptyText: "🚫 No notifications yet" }}
        renderItem={(item) => (
          <List.Item
            className="bg-[#F9FBFF]"
            actions={[
              <Button
                type="link"
                className="text-[#1C2D6B]"
                onClick={() => handleEdit(item)}
              >
                ✏️ Edit
              </Button>,
              <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="link">
                  🗑️ Delete
                </Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={<span className="font-semibold text-[#1C2D6B]">📌 {item.title}</span>}
              description={<span className="text-gray-700">{item.message}</span>}
            />
            <span className="text-sm text-gray-500">
              🗓️ {new Date(item.date).toLocaleDateString()}
            </span>
          </List.Item>
        )}
      />
    </Card>
  </div>
  
  );
}
