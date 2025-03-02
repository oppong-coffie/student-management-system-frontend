import React, { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Mathematics assignment due on Feb 28!", type: "warning" },
    { id: 2, message: "Physics assignment is overdue! Submit ASAP.", type: "error" },
    { id: 3, message: "Your English essay has been submitted successfully.", type: "success" },
  ]);

  // Function to remove notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      {notifications.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-2">Notifications</h2>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex justify-between items-center p-3 rounded ${
                  notif.type === "success" ? "bg-green-100 border-l-4 border-green-500" :
                  notif.type === "error" ? "bg-red-100 border-l-4 border-red-500" :
                  "bg-yellow-100 border-l-4 border-yellow-500"
                }`}
              >
                <span>{notif.message}</span>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => dismissNotification(notif.id)}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}