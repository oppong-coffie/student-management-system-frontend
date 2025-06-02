import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ManageStudentsPage({ classId }) {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`student-management-system-backend-production.up.railway.app/teachers/students`);
        setStudents(res.data);
      } catch (err) {
        console.error('Error fetching students:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  },[]);

  const filteredStudents = students.filter((student) =>
    student?.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    student?.indexnumber?.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-6 md:p-10">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">👨‍🎓 Enrolled Students</h1>
        <button
          onClick={() => navigate('../addstudent')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Student
        </button>
      </div>
  
      <input
        type="text"
        placeholder="Search by name or index number..."
        className="w-full mb-6 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  
      {loading ? (
        <p className="text-center text-blue-700">Loading students...</p>
      ) : filteredStudents.length === 0 ? (
        <p className="text-center text-gray-600">No matching students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-yellow-300 rounded-xl shadow-md">
            <thead>
              <tr className="bg-yellow-100 text-blue-800">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Index Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-t border-gray-200 hover:bg-yellow-50 cursor-pointer"
                  onClick={() => navigate(`../studentdetails/${student._id}`)}
                >
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.indexnumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  
  );
}
