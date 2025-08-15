import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Table,
  Input,
  Button,
  Modal,
  List,
  Select,
  Popconfirm,
  message,
  DatePicker
} from "antd";
import axios from "axios";
import moment from "moment";

export default function Assignments() {
  const { Option } = Select;

  const [assignments, setAssignments] = useState([]);
  const [theory, setTheory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issubmitModalOpen, setIssubmitModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    dueDate: "",
    questions: []
  });
  
  const [newQuestion, setNewQuestion] = useState(
    {
      question: "Sample?",
      options: ["A", "B", "C", "D "],
      correctOption: null // not ""
    }
);
  
  useEffect(() => {
    fetchAssignments();
    fetchTheory();
  }, []);

  // START:: get THEORIES  
  const fetchTheory = async () => {
    try {
      const response = await fetch("https://student-management-system-backend-production.up.railway.app/teachers/theory", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setTheory(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      message.error("Failed to fetch assignments");
    }
  };
  

  // START:: get Assignments  
   const fetchAssignments = async () => {
    try {
      const response = await fetch("https://student-management-system-backend-production.up.railway.app/teachers/getassignments");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      message.error("Failed to fetch assignments");
    }
  };
    // END:: get Assignments  

  const openCreateModal = () => {
    setModalType("create");
    setSelectedAssignment(null);
    setNewAssignment({ title: "", dueDate: "", questions: [] });
    setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
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
    setIssubmitModalOpen(true);
  };

  const addQuestion = () => {
    if (
      newQuestion.question.trim() !== "" &&
      newQuestion.correctOption &&
      newQuestion.options.every(opt => opt.trim() !== "")
    ) {
      setNewAssignment({
        ...newAssignment,
        questions: [...newAssignment.questions, newQuestion]
      });
      setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
    }
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...newAssignment.questions];
    updatedQuestions[index][field] = value;
    setNewAssignment({ ...newAssignment, questions: updatedQuestions });
  };

// START:: Edit/Create Assignment
const handleSave = async () => {
  console.log('saving');
  // ✅ Construct the full assignment payload manually
  let assignmentToSave = { ...newAssignment };

  if (
    newQuestion.question.trim() &&
    newQuestion.correctOption &&
    newQuestion.options.every(opt => opt.trim())
  ) {
    assignmentToSave.questions = [
      ...assignmentToSave.questions,
      newQuestion
    ];
  }

  console.log("Payload to send:", assignmentToSave); // ✅ See final payload

  try {
    const method = modalType === "edit" ? "PUT" : "POST";
    const url = modalType === "edit"
      ? `https://student-management-system-backend-production.up.railway.app/teachers/editassignments/${selectedAssignment._id}`
      : "https://student-management-system-backend-production.up.railway.app/teachers/postassignments";

    const response = await axios({
      method,
      url,
      data: assignmentToSave,
      headers: { "Content-Type": "application/json" }
    });

    console.log("Axios response:", response.data);
    message.success("Assignment saved successfully");

    fetchAssignments();
    setIsModalOpen(false);

    // Clear form
    setNewAssignment({ title: "", dueDate: "", questions: [], submissions: [] });
    setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });

  } catch (error) {
    console.error("❌ Error saving assignment:", error);
    message.error("Failed to save assignment");
  }
};

// START:: Delete Assignment
  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`https://student-management-system-backend-production.up.railway.app/teachers/deleteassignments/${id}`);
      message.success("Assignment deleted successfully");
      fetchAssignments();
    } catch (error) {
      message.error("Failed to delete assignment");
    }
  };
// END:: Delete Assignment

// START:: Delete Theory
  const deleteTheory = async (id) => {
    try {
      await axios.delete(`https://student-management-system-backend-production.up.railway.app/teachers/theory/${id}`);
      message.success("Assignment deleted successfully");
      setTheory(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      message.error("Failed to delete assignment");
    }
  };
// END:: Delete Theory




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
          {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (date) => new Date(date).toLocaleDateString()
          },
          {
            title: "Submissions",
            dataIndex: "submissions",
            key: "submissions",
            render: (_, record) => (
              <span className="text-blue-600 cursor-pointer" onClick={() => openSubmitModal(record)}>
                {record.submissions?.length || 0}
              </span>
            )
          },
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
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={assignments}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      <h1>Theory Assigments</h1>
      <Table
        columns={[
          { title: "Title", dataIndex: "title", key: "title" },
          {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (date) => new Date(date).toLocaleDateString()
          },
          {
            title: "Submissions",
            dataIndex: "submissions",
            key: "submissions",
            render: (_, record) => (
              <span className="text-blue-600 cursor-pointer" onClick={() => openSubmitModal(record)}>
                {record.submissions?.length || 0}
              </span>
            )
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex space-x-4">
                
                <Link to={`/dashboard/teacher/viewtheory/${record._id}`}>
  <Button type="link" className="text-blue-600">
    View
  </Button>
</Link>
                <Link to={`/dashboard/teacher/edittheory/${record._id}`}>
  <Button type="link" className="text-blue-600">
    Edit
  </Button>
</Link>

                <Popconfirm
                  title="Are you sure to delete this assignment?"
                  onConfirm={() => deleteTheory(record._id)}
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            )
          }
        ]}
        dataSource={theory}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      {/* CREATE ASSIGNMENTS MODAL */}
      <Modal
        title={modalType === "edit" ? "Edit Assignment" : "Create Assignment"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
        }}
        onOk={handleSave}
        width={800}
      >
        <div className="text-end mb-5">
          <Link to="/dashboard/teacher/theory">
            <Button type="primary" className="hover:bg-[#FFC107] transition text-end ">Create Theory Questions</Button>
          </Link>
        </div>
        
        <Input
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
        />
        <DatePicker
          className="mt-2 w-full"
          value={newAssignment.dueDate ? moment(newAssignment.dueDate) : null}
          onChange={(date, dateString) =>
            setNewAssignment({ ...newAssignment, dueDate: dateString })
          }
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
  value={q.correctOption || undefined} // important
  onChange={(value) => updateQuestion(index, "correctOption", value)}
>
  {q.options.map((opt, i) => (
    <Option key={i} value={opt}>
      {opt}
    </Option>
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
            <Option key={i} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>

        <Button
  onClick={() => {
    if (
      newQuestion.question.trim() !== "" &&
      newQuestion.correctOption &&
      newQuestion.options.every(opt => opt.trim() !== "")
    ) {
      setNewAssignment(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));
      setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: "" });
    } else {
      message.error("Please complete the question and all options.");
    }
  }}
>
  Add Another Question
</Button>

      </Modal>

      {/* Submission Modal */}
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
          dataSource={
            selectedAssignment?.submissions?.map((submission) => ({
              key: submission._id,
              name: submission.studentName,
              score: submission.score,
            })) || []
          }
          rowKey="key"
          pagination={false}
        />
      </Modal>
    </div>
  );
}
