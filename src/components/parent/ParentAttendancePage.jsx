import React, { useEffect, useState } from "react";

export default function ParentAttendancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [childId, setChildId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const studentId = user?.childId || user?.id;

    if (!studentId) {
      setError("Student ID not found.");
      setLoading(false);
      return;
    }

    setChildId(studentId);
  }, []);

  useEffect(() => {
    if (childId) {
      fetchAttendance();
    }
  }, [childId]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const query = selectedDate ? `?date=${selectedDate}` : "";
      const res = await fetch(
        `student-management-system-backend-production.up.railway.app/parents/attendance/${childId}${query}`
      );
      const data = await res.json();

      if (res.ok) {
        setRecords(data);
        setError("");
      } else {
        setRecords([]);
        setError(data.message || "Error fetching data");
      }
    } catch (error) {
      setError("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilter = () => {
    fetchAttendance();
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          📅 My Child's Attendance
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <input
            type="date"
            className="border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button
            onClick={handleFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
          >
            Filter by Date
          </button>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="text-center text-blue-600 font-medium">Loading attendance records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Check-In</th>
                  <th className="py-3 px-4 text-left">Check-Out</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  records.map((rec, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-yellow-50 transition duration-150"
                    >
                      <td className="py-3 px-4">{rec.date}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">
                        {rec.checkInTime
                          ? new Date(rec.checkInTime).toLocaleTimeString()
                          : "--"}
                      </td>
                      <td className="py-3 px-4 text-red-600 font-medium">
                        {rec.checkOutTime
                          ? new Date(rec.checkOutTime).toLocaleTimeString()
                          : "--"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            rec.checkInTime && rec.checkOutTime
                              ? "bg-green-100 text-green-800"
                              : rec.checkInTime
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {rec.checkInTime && rec.checkOutTime
                            ? "✅ Present"
                            : rec.checkInTime
                            ? "⏱️ Not Checked Out"
                            : "❌ Absent"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
