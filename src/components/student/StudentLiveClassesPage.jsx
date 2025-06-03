import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentLiveClassesPage() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const res = await axios.get("https://student-management-system-backend-production.up.railway.app/teachers/live-classes");
        setLiveClasses(res.data);
      } catch (error) {
        console.error("Error fetching live classes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-6 md:p-10">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center">
        📚 Upcoming Live Classes
      </h1>
  
      {loading ? (
        <p className="text-center text-blue-700 text-lg font-medium">Loading...</p>
      ) : liveClasses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No live classes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {liveClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white border border-yellow-300 rounded-2xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-2">{cls.title}</h2>
              <p className="text-gray-700 mb-3">{cls.description}</p>
              <p className="text-sm text-gray-600 mb-1">
                📅 <strong>{cls.date}</strong>
              </p>
              <p className="text-sm text-gray-600">
                🕒 <strong>{cls.time}</strong>
              </p>
              <a
                href={cls.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-5 text-center bg-blue-700 text-yellow-100 font-semibold py-3 rounded-lg hover:bg-blue-800 transition"
              >
                Join Class
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  
  );
}