import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AcademicReport() {
  const student = {
    name: "John Doe",
    id: "STU12345",
    class: "Grade 10",
    term: "Term 2",
  };

  const reportSummary = {
    totalSubjects: 6,
    averageScore: 85,
    grade: "A",
    remarks: "Excellent performance!",
  };

  const subjects = [
    { name: "Mathematics", score: 90, grade: "A", remarks: "Outstanding" },
    { name: "English", score: 85, grade: "A", remarks: "Very Good" },
    { name: "Science", score: 88, grade: "A", remarks: "Excellent" },
    { name: "History", score: 78, grade: "B+", remarks: "Good" },
    { name: "Geography", score: 82, grade: "B+", remarks: "Very Good" },
    { name: "ICT", score: 95, grade: "A+", remarks: "Exceptional" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Student Info */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Academic Report</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-lg"><strong>Student:</strong> {student.name}</p>
          <p className="text-lg"><strong>ID:</strong> {student.id}</p>
          <p className="text-lg"><strong>Class:</strong> {student.class}</p>
          <p className="text-lg"><strong>Term:</strong> {student.term}</p>
        </div>

        {/* Report Summary */}
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="text-lg"><strong>Total Subjects:</strong> {reportSummary.totalSubjects}</p>
          <p className="text-lg"><strong>Average Score:</strong> {reportSummary.averageScore}%</p>
          <p className="text-lg"><strong>Grade:</strong> {reportSummary.grade}</p>
          <p className="text-lg"><strong>Remarks:</strong> {reportSummary.remarks}</p>
        </div>

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Score</th>
                <th className="border border-gray-300 px-4 py-2">Grade</th>
                <th className="border border-gray-300 px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{subject.score}</td>
                  <td className="border border-gray-300 px-4 py-2">{subject.grade}</td>
                  <td className="border border-gray-300 px-4 py-2">{subject.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Chart */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Performance Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjects}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
