import axios from 'axios';
import React, { useState, useEffect } from 'react';

const subjects = ['Math', 'English', 'Science'];

export default function EditableResultsTable() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, savedResultsRes] = await Promise.all([
          axios.get('student-management-system-backend-production.up.railway.app/teachers/students'),
          axios.get('student-management-system-backend-production.up.railway.app/teachers/results'),
        ]);

        const studentsData = studentsRes.data;
        const savedResultsData = savedResultsRes.data;

        setStudents(studentsData);

        // Map studentId => result object for easier lookup
        const resultsMap = {};
        savedResultsData.forEach(entry => {
          resultsMap[entry.studentId] = entry.results;
        });

        // Initialize results with saved values or empty defaults
        const init = {};
        studentsData.forEach(student => {
          init[student._id] = {};
          subjects.forEach(subject => {
            init[student._id][subject] = resultsMap[student._id]?.[subject] || {
              class_score: '',
              exam_score: '',
            };
          });
        });

        setResults(init);
        console.log(studentsData)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (studentId, subject, field, value) => {
    setResults(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: {
          ...prev[studentId][subject],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    const formattedResults = students.map(student => ({
      studentId: student._id,
      studentPhone: student.phone || '',
      parentPhone: student.parent?.phone || '',
      ...results[student._id],
    }));

    console.log('Saving this to backend:', formattedResults);

    try {
      const res = await fetch('student-management-system-backend-production.up.railway.app/teachers/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedResults),
      });

      if (!res.ok) throw new Error('Failed to save');
      alert('Results saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving results');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Results</h2>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">Student Name</th>
              {subjects.map(subject => (
                <th key={subject} colSpan="2" className="border p-2 bg-gray-100 text-center">
                  {subject}
                </th>
              ))}
            </tr>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {subjects.map(subject => (
                <React.Fragment key={subject}>
                  <th className="border p-2 text-sm bg-gray-100">Class Score</th>
                  <th className="border p-2 text-sm bg-gray-100">Exam Score</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td className="border p-2">{student.name}</td>
                {subjects.map(subject => (
                  <React.Fragment key={subject}>
                    <td className="border p-1">
                      <input
                        type="number"
                        value={results[student._id]?.[subject]?.class_score ?? ''}
                        className="w-full p-1 border rounded"
                        onChange={e =>
                          handleChange(student._id, subject, 'class_score', Number(e.target.value))
                        }
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="number"
                        value={results[student._id]?.[subject]?.exam_score ?? ''}
                        className="w-full p-1 border rounded"
                        onChange={e =>
                          handleChange(student._id, subject, 'exam_score', Number(e.target.value))
                        }
                      />
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Results
      </button>
    </div>
  );
}
