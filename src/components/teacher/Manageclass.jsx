import { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm } from "antd";

export default function ManageClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [classes, setClasses] = useState([
    { key: "1", name: "Math 101", grade: "Grade 9", subject: "Mathematics" },
    { key: "2", name: "Science 202", grade: "Grade 10", subject: "Physics" },
  ]);

  // Function to handle adding a new class
  const handleAddClass = () => {
    form.validateFields().then(values => {
      const newClass = { key: (classes.length + 1).toString(), ...values };
      setClasses([...classes, newClass]);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // Function to handle deleting a class
  const handleDelete = (key) => {
    setClasses(classes.filter(cls => cls.key !== key));
  };

  const columns = [
    { title: "Class Name", dataIndex: "name", key: "name" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.key)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>
      
      <Button type="primary" onClick={() => setIsModalOpen(true)} className="mb-4">
        + Add New Class
      </Button>

      <Table columns={columns} dataSource={classes} bordered />

      {/* Add Class Modal */}
      <Modal
        title="Add New Class"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddClass}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Class Name" rules={[{ required: true }]}>
            <Input placeholder="Enter class name" />
          </Form.Item>
          <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
            <Select placeholder="Select grade">
              <Select.Option value="Grade 9">Grade 9</Select.Option>
              <Select.Option value="Grade 10">Grade 10</Select.Option>
              <Select.Option value="Grade 11">Grade 11</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
            <Input placeholder="Enter subject" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
