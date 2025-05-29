import React, { useEffect, useState } from 'react';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'];

const ParentTimetablePage = () => {
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState('');
  const [timetable, setTimetable] = useState({});

  // Fetch timetable when child changes
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/teachers/timetable`);
        setTimetable(res.data.timetable || {});
      } catch (err) {
        console.error('Failed to fetch timetable:', err);
        setTimetable({});
      }
    };
    fetchTimetable();
  },[]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl border border-indigo-200">
        <div className="">
          <h1 className="text-4xl font-bold text-indigo-800 text-center">🧒🏽 Your Child’s Timetable</h1>
          <p className="text-center text-indigo-600 text-lg">Monitor academic schedules effortlessly</p>
        </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-indigo-300 text-center rounded-md shadow-md">
              <thead className="bg-indigo-100 text-indigo-800 text-lg">
                <tr>
                  <th className="border border-indigo-200 px-6 py-3 font-semibold">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border border-indigo-200 px-6 py-3 font-semibold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((time, rowIndex) => (
                  <tr key={time} className="hover:bg-indigo-50 transition">
                    <td className="border border-indigo-200 px-4 py-2 bg-indigo-50 font-medium text-indigo-700">
                      {time}
                    </td>
                    {days.map((day) => (
                      <td key={day} className="border border-indigo-200 px-4 py-2 text-gray-800 font-medium">
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

export default ParentTimetablePage;