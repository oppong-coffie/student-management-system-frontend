import React, { useEffect, useState } from 'react';

export default function StudentResultsPage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("USER:", user); // Check this in browser console
    const studentId = user?.id;

    if (!studentId) {
      setError("Student ID not found in localStorage user data.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/students/${studentId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch results");
        return res.json();
      })
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getGradeRemarkEmoji = (total) => {
    if (total >= 80) return { grade: "A", remark: "Excellent 🌟" };
    if (total >= 70) return { grade: "B", remark: "Very Good 👏" };
    if (total >= 60) return { grade: "C", remark: "Good 👍" };
    if (total >= 50) return { grade: "D", remark: "Pass 🙂" };
    if (total >= 40) return { grade: "E", remark: "Weak 😕" };
    return { grade: "F", remark: "Fail ❌" };
  };

  if (loading) return <div className="p-6 text-blue-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!student) return <div className="p-6 text-blue-600">No data found.</div>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Results for <span className="text-yellow-500">{student.name}</span>
        </h2>

        <table className="min-w-full border border-blue-300 text-sm md:text-base">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="border p-2 text-left">Subject</th>
              <th className="border p-2 text-left">Class Score</th>
              <th className="border p-2 text-left">Exam Score</th>
              <th className="border p-2 text-left">Total</th>
              <th className="border p-2 text-left">Grade</th>
              <th className="border p-2 text-left">Remark</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(student.results).map(([subject, scores]) => {
              const classScore = scores.class_score ?? 0;
              const examScore = scores.exam_score ?? 0;
              const total = classScore + examScore;
              const { grade, remark } = getGradeRemarkEmoji(total);

              return (
                <tr key={subject} className="hover:bg-yellow-50">
                  <td className="border p-2">{subject}</td>
                  <td className="border p-2">{classScore}</td>
                  <td className="border p-2">{examScore}</td>
                  <td className="border p-2 font-semibold text-blue-700">{total}</td>
                  <td className="border p-2 font-medium text-yellow-600">{grade}</td>
                  <td className="border p-2">{remark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
