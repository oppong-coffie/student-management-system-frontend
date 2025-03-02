import React from "react";

export default function ClassTimetable() {
  const timetable = {
    Monday: ["Mathematics", "English", "Break", "Science", "History", "Lunch", "ICT"],
    Tuesday: ["Physics", "Chemistry", "Break", "Geography", "P.E", "Lunch", "Music"],
    Wednesday: ["Biology", "Literature", "Break", "Economics", "Art", "Lunch", "French"],
    Thursday: ["Algebra", "Social Studies", "Break", "Computer Science", "Drama", "Lunch", "Civic Education"],
    Friday: ["Business Studies", "Statistics", "Break", "Chemistry Lab", "Sports", "Lunch", "Debate"],
  };

  const timeSlots = [
    "8:00 - 9:00 AM",
    "9:00 - 10:00 AM",
    "10:00 - 10:30 AM",
    "10:30 - 11:30 AM",
    "11:30 - 12:30 PM",
    "12:30 - 1:00 PM",
    "1:00 - 2:00 PM",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Class Timetable</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Day</th>
                {timeSlots.map((time, index) => (
                  <th key={index} className="border border-gray-300 px-4 py-2">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(timetable).map(([day, subjects], index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 font-bold bg-blue-100">{day}</td>
                  {subjects.map((subject, i) => (
                    <td
                      key={i}
                      className={`border border-gray-300 px-4 py-2 ${
                        subject === "Break" || subject === "Lunch" ? "font-bold text-red-600 bg-gray-100" : ""
                      }`}
                    >
                      {subject}
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
}
