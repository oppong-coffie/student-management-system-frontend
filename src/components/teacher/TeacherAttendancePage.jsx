import React, { useEffect, useState } from 'react';

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: { checkIn: true, checkOut: false } }
  const [loading, setLoading] = useState(true);
  const [today] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetch('student-management-system-backend-production.up.railway.app/teachers/students') // Replace with your actual students endpoint
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      });

    fetch(`student-management-system-backend-production.up.railway.app/teachers/attendance?date=${today}`)
      .then(res => res.json())
      .then(data => {
        const status = {};
        data.forEach(entry => {
          status[entry.studentId] = {
            checkIn: !!entry.checkInTime,
            checkOut: !!entry.checkOutTime
          };
        });
        setAttendance(status);
      });
  }, [today]);

  const handleAction = async (studentId, action) => {
    try {
      const endpoint =
        action === 'checkin'
          ? 'student-management-system-backend-production.up.railway.app/teachers/attendance/check-in'
          : 'student-management-system-backend-production.up.railway.app/teachers/attendance/check-out';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId }),
      });

      const data = await res.json();
      alert(data.message);

      setAttendance(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [action === 'checkin' ? 'checkIn' : 'checkOut']: true
        }
      }));
    } catch (error) {
      alert('Error performing action');
    }
  };

  if (loading) return <div className="p-6 text-blue-600">Loading students...</div>;

  return (
    <div className="p-6 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          📋 Student Attendance for <span className="text-yellow-500">{today}</span>
        </h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-blue-200 text-blue-900">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Check-In</th>
                <th className="border p-3 text-left">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const status = attendance[student._id] || {};
                return (
                  <tr key={student._id} className="hover:bg-yellow-50">
                    <td className="border p-3">{student.name}</td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleAction(student._id, 'checkin')}
                        className={`px-3 py-1 rounded text-white ${
                          status.checkIn ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={status.checkIn}
                      >
                        {status.checkIn ? 'Checked In' : 'Check In'}
                      </button>
                    </td>
                    <td className="border p-3">
                      <button
                        onClick={() => handleAction(student._id, 'checkout')}
                        className={`px-3 py-1 rounded text-white ${
                          status.checkOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                        }`}
                        disabled={status.checkOut}
                      >
                        {status.checkOut ? 'Checked Out' : 'Check Out'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
