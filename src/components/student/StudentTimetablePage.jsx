import React, { useEffect, useState } from 'react';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'];

const StudentTimetablePage = () => {
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get('student-management-system-backend-production.up.railway.app/teachers/timetable');
        setTimetable(res.data.timetable || {});
      } catch (error) {
        console.error('Failed to fetch timetable:', error);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl border border-blue-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-6 px-8">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-wide">
            📚 Weekly Timetable
          </h1>
          <p className="text-center text-blue-100 mt-2 text-lg">Stay organized and never miss a class</p>
        </div>

        <div className="overflow-x-auto p-6 animate-fade-in">
          <table className="min-w-full table-auto border border-blue-200 text-center shadow-inner rounded-lg">
            <thead className="bg-blue-100 text-blue-700 text-lg">
              <tr>
                <th className="border border-blue-300 px-6 py-4 font-semibold">Time</th>
                {days.map((day) => (
                  <th key={day} className="border border-blue-300 px-6 py-4 font-semibold">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, rowIndex) => (
                <tr key={time} className="hover:bg-blue-50 transition duration-200">
                  <td className="border border-blue-200 px-4 py-3 font-medium bg-blue-50 text-blue-800">
                    {time}
                  </td>
                  {days.map((day) => (
                    <td key={day} className="border border-blue-200 px-4 py-3 text-gray-800 font-medium">
                      {timetable[day]?.[rowIndex] || <span className="text-gray-400">--</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentTimetablePage;
