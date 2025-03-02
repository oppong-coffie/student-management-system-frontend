import { useState, useEffect } from "react";
import { Table, Input, Button, Modal, List, Select, Popconfirm, message } from "antd";
import axios from "axios";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issubmitModalOpen, setIssubmitModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create', 'edit'
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({ title: "", dueDate: "", questions: [] });
  const [newQuestion, setNewQuestion] = useState({ question: "", options: ["", "", "", ""], correctOption: "" });

  // Fetch Assignments from the database
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch("http://localhost:3000/teachers/getassignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      message.error("Failed to fetch assignments");
    }
  };

  const openCreateModal = () => {
    setModalType("create");
    setSelectedAssignment(null);
    setNewAssignment({ title: "", dueDate: "", questions: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (assignment) => {
    setModalType("edit");
    setSelectedAssignment(assignment);
    setNewAssignment({ ...assignment });
    setIsModalOpen(true);
  };

  const openSubmitModal = (assignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment({ ...assignment });
    setIssubmitModalOpen(true);
  };

  const addQuestion = () => {
    if (newQuestion.question.trim() !== "" && newQuestion.correctOption) {
      setNewAssignment({
        ...newAssignment,
        questions: [...newAssignment.questions, newQuestion]
      });
      // Reset for new question input
      setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
    }
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...newAssignment.questions];
    updatedQuestions[index][field] = value;
    setNewAssignment({ ...newAssignment, questions: updatedQuestions });
  };

  const handleSave = async () => {
    try {
      const method = modalType === "edit" ? "PUT" : "POST";
      const url = modalType === "edit" ? `http://localhost:3000/teachers/editassignments/${selectedAssignment._id}` : "http://localhost:3000/teachers/postassignments";
      
      await axios({
        method,
        url,
        data: newAssignment,
        headers: { "Content-Type": "application/json" }
      });

      message.success("Assignment saved successfully");
      fetchAssignments();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to save assignment");
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teachers/deleteassignments/${id}`);
      message.success("Assignment deleted successfully");
      fetchAssignments();
    } catch (error) {
      message.error("Failed to delete assignment");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assignments</h2>
        <Button type="primary" className="bg-[#1C2D6B]" onClick={openCreateModal}>
          + Create Assignment
        </Button>
      </div>

      <Table
        columns={[
          { title: "Title", dataIndex: "title", key: "title" },
          { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
          {
            title: "Submissions",
            dataIndex: "submissions",
            key: "submissions",
            render: (submissions, record) => (
              <span 
                className="text-blue-600 cursor-pointer"
                onClick={() => openSubmitModal(record)}
              >
                {submissions.length}
              </span>
            ),
          }
          
          ,
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex space-x-4">
                <Button type="link" onClick={() => openEditModal(record)} className="text-blue-600">
                  View
                </Button>
                <Button type="link" onClick={() => openEditModal(record)} className="text-blue-600">
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this assignment?"
                  onConfirm={() => deleteAssignment(record._id)}
                >
                  <Button type="link" danger>Delete</Button>
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={assignments}
        rowKey="_id"
      />

      <Modal
        title={modalType === "edit" ? "Edit Assignment" : "Create Assignment"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
      >
        <Input
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
        />
        <Input
          placeholder="Due Date (YYYY-MM-DD)"
          value={newAssignment.dueDate}
          onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          className="mt-2"
        />

        <h3 className="text-lg font-semibold mt-4">Questions:</h3>
        <List
          bordered
          dataSource={newAssignment.questions}
          renderItem={(q, index) => (
            <List.Item key={index}>
              <div>
                <Input
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) => updateQuestion(index, "question", e.target.value)}
                  className="mt-2"
                />
                {q.options.map((opt, i) => (
                  <Input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const updatedOptions = [...q.options];
                      updatedOptions[i] = e.target.value;
                      updateQuestion(index, "options", updatedOptions);
                    }}
                    className="mt-2"
                  />
                ))}
                <Select
                  placeholder="Correct Option"
                  value={q.correctOption}
                  onChange={(value) => updateQuestion(index, "correctOption", value)}
                  className="mt-2 w-full"
                >
                  {q.options.map((opt, i) => (
                    <Select.Option key={i} value={opt}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </List.Item>
          )}
        />

        <h3 className="text-lg font-semibold mt-4">Add New Question</h3>
        <Input
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          className="mt-2"
        />
        {newQuestion.options.map((opt, index) => (
          <Input
            key={index}
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...newQuestion.options];
              newOptions[index] = e.target.value;
              setNewQuestion({ ...newQuestion, options: newOptions });
            }}
            className="mt-2"
          />
        ))}
        <Select
          placeholder="Correct Option"
          value={newQuestion.correctOption}
          onChange={(value) => setNewQuestion({ ...newQuestion, correctOption: value })}
          className="mt-2 w-full"
        >
          {newQuestion.options.map((opt, i) => (
            <Select.Option key={i} value={opt}>
              {opt}
            </Select.Option>
          ))}
        </Select>

        <Button onClick={addQuestion} className="bg-blue-500 text-white w-full mt-2">
          Add Another Question
        </Button>
      </Modal>

{/* START:: Submission modal */}
<Modal
  title="Submission List"
  open={issubmitModalOpen}
  onCancel={() => setIssubmitModalOpen(false)}
  onOk={() => setIssubmitModalOpen(false)}
>
  <Table
    columns={[
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Score", dataIndex: "score", key: "score" },
    ]}
    dataSource={assignments.flatMap((assignment) => 
      assignment.submissions.map((submission) => ({
        key: submission._id, // Ensure each row has a unique key
        name: submission.studentName,
        score: submission.score,
      }))
    )}
    rowKey="key"
  />
</Modal>


    </div>
  );
}
