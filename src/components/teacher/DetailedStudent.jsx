import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    indexnumber: '',
    email: '',
    phone: '',
    parent: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`https://student-management-system-backend-production.up.railway.app/teachers/students/${id}`);
        setStudent(res.data);
        setFormData({
          name: res.data.name || '',
          indexnumber: res.data.indexnumber || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          parent: {
            name: res.data.parent?.name || '',
            email: res.data.parent?.email || '',
            phone: res.data.parent?.phone || ''
          }
        });
      } catch (err) {
        console.error('Error fetching student:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`https://student-management-system-backend-production.up.railway.app/teachers/students/${id}`);
      alert("Student deleted.");
      navigate("../manageclass");
    } catch (error) {
      alert("Failed to delete student.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('parent.')) {
      const parentField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          [parentField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        parent: {
          ...formData.parent
        }
      };
      const res = await axios.put(`https://student-management-system-backend-production.up.railway.app/teachers/students/${id}`, updatedData);
      setStudent(res.data);
      setIsEditing(false);
      alert("Student details updated successfully.");
    } catch (error) {
      console.error("Error updating student:", error.message);
      alert("Failed to update student details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 p-8">
      {loading ? (
        <p className="text-blue-700 text-center text-lg">🔄 Loading student details...</p>
      ) : !student ? (
        <p className="text-red-600 text-center text-lg">❌ Student not found.</p>
      ) : (
        <div className="max-w-xl mx-auto bg-white border border-yellow-300 p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0D8ABC&color=fff&size=128`}
              alt="Profile"
              className="w-24 h-24 rounded-full shadow-md"
            />
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-blue-800"
                />
              ) : (
                <h2 className="text-3xl font-bold text-blue-800">🎓 {student.name}</h2>
              )}
              {isEditing ? (
                <input
                  type="text"
                  name="indexnumber"
                  value={formData.indexnumber}
                  onChange={handleInputChange}
                  className="text-sm text-gray-600"
                />
              ) : (
                <p className="text-sm text-gray-600">🆔 Index No: {student.indexnumber}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 text-gray-800">
            <p>
              <span className="font-semibold">📧 Email:</span>{' '}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                student.email
              )}
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                student.phone
              )}
            </p>
          </div>

          <hr className="my-6 border-blue-200" />

          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">👨‍👩‍👧 Parent Info</h3>
            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-semibold">👤 Name:</span>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="parent.name"
                    value={formData.parent.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  student.parent?.name || 'N/A'
                )}
              </p>
              <p>
                <span className="font-semibold">📧 Email:</span>{' '}
                {isEditing ? (
                  <input
                    type="email"
                    name="parent.email"
                    value={formData.parent.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  student.parent?.email || 'N/A'
                )}
              </p>
              <p>
                <span className="font-semibold">📞 Phone:</span>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="parent.phone"
                    value={formData.parent.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  student.parent?.phone || 'N/A'
                )}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
