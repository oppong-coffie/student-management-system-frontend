import React, { useEffect, useState } from 'react';
import axios from 'axios';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
];

const EditableTimetablePage = () => {
  const [timetable, setTimetable] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const [subjectsRes, timetableRes] = await Promise.all([
          axios.get('student-management-system-backend-production.up.railway.app/teachers/subjects'),
          axios.get('student-management-system-backend-production.up.railway.app/teachers/timetable')
        ]);

        setSubjects(subjectsRes.data);

        if (timetableRes.data?.timetable) {
          // Use stored timetable
          setTimetable(timetableRes.data.timetable);
        } else {
          // If no data, initialize empty timetable
          const initial = {};
          days.forEach((day) => {
            initial[day] = Array(times.length).fill('');
          });
          setTimetable(initial);
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        alert('Failed to load timetable or subjects.');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const handleChange = (day, index, value) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].map((subject, i) => (i === index ? value : subject)),
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post('student-management-system-backend-production.up.railway.app/teachers/timetable', { timetable });
      alert('Timetable saved successfully ✅');
    } catch (error) {
      console.error('Error saving timetable:', error);
      alert('Failed to save timetable ❌');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the timetable?')) {
      const reset = {};
      days.forEach((day) => {
        reset[day] = Array(times.length).fill('');
      });
      setTimetable(reset);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-blue-700">
        Loading timetable...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-1">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-yellow-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">📅 Editable Timetable</h1>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              💾 Save
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              ♻️ Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-blue-200 text-center">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="border border-blue-300 px-4 py-2">Time</th>
                {days.map((day) => (
                  <th key={day} className="border border-blue-300 px-4 py-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, rowIndex) => (
                <tr key={time}>
                  <td className="border border-blue-200 px-4 py-2 font-medium bg-yellow-100 text-blue-900">
                    {time}
                  </td>
                  {days.map((day) => (
                    <td key={`${day}-${rowIndex}`} className="border border-blue-200 px-2 py-2">
                      <select
                        className="w-full px-2 py-1 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={timetable[day]?.[rowIndex] || ''}
                        onChange={(e) => handleChange(day, rowIndex, e.target.value)}
                      >
                        <option value="">-- Select --</option>
                        {subjects.map((subject, idx) => (
                          <option key={idx} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
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

export default EditableTimetablePage;