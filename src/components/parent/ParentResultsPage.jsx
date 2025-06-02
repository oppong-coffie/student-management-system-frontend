import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function StudentResultsPage() {
  const { studentId: paramStudentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = paramStudentId || user?.id;

    if (!studentId) {
      setError("Student ID not found.");
      setLoading(false);
      return;
    }

    fetch(`student-management-system-backend-production.up.railway.app/students/${studentId}`)
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
  }, [paramStudentId]);

  const getGradeRemarkEmoji = (total) => {
    if (total >= 80) return { grade: 'A', remark: 'Excellent 🌟' };
    if (total >= 70) return { grade: 'B', remark: 'Very Good 👏' };
    if (total >= 60) return { grade: 'C', remark: 'Good 👍' };
    if (total >= 50) return { grade: 'D', remark: 'Pass 🙂' };
    if (total >= 40) return { grade: 'E', remark: 'Weak 😕' };
    return { grade: 'F', remark: 'Fail ❌' };
  };

  const generateTeacherComment = (average) => {
    if (average >= 80) return "Outstanding performance. Keep it up!";
    if (average >= 70) return "Great job! A little more effort can take you to the top.";
    if (average >= 60) return "Good work. Keep striving for excellence.";
    if (average >= 50) return "Fair performance. You can do better with more dedication.";
    if (average >= 40) return "Needs improvement. Encourage more practice and reading.";
    return "Student is struggling. Parental guidance and support are needed.";
  };

  if (loading) return <div className="p-6 text-blue-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!student) return <div className="p-6 text-blue-600">No data found.</div>;

  const resultsEntries = Object.entries(student.results || {});
  const totals = resultsEntries.map(([_, scores]) => (scores.class_score ?? 0) + (scores.exam_score ?? 0));
  const overallTotal = totals.reduce((a, b) => a + b, 0);
  const average = (totals.length > 0) ? (overallTotal / totals.length).toFixed(2) : 0;
  const { grade: overallGrade } = getGradeRemarkEmoji(average);
  const comment = generateTeacherComment(average);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 border border-blue-200">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
          Hello, Parent! 🎓
        </h2>
        <p className="mb-6 text-gray-600">
          Below are the academic results for <span className="font-semibold text-blue-700">{student.name}</span>.
        </p>

        <table className="w-full border border-blue-300 text-sm md:text-base mb-6">
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
            {resultsEntries.map(([subject, scores]) => {
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

        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-bold text-lg text-yellow-700">Summary</h3>
          <p><strong>Subjects Taken:</strong> {resultsEntries.length}</p>
          <p><strong>Total Score:</strong> {overallTotal}</p>
          <p><strong>Average Score:</strong> {average}</p>
          <p><strong>Overall Grade:</strong> {overallGrade}</p>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <h3 className="font-bold text-lg text-green-700">Teacher's Comment</h3>
          <p className="italic">{comment}</p>
        </div>
      </div>
    </div>
  );
}
