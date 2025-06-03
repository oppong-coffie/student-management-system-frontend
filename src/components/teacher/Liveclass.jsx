import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LiveClassesPage() {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this live class?")) return;
    setDeletingId(id);

    try {
      await axios.delete(`https://student-management-system-backend-production.up.railway.app/teachers/live-classes/${id}`);
      setLiveClasses((prev) => prev.filter((cls) => cls._id !== id));
      alert("Live class deleted.");
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Failed to delete live class.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Live Classes</h1>
          <Link
            to="../addliveclass"
            className="bg-blue-700 text-yellow-200 font-semibold px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            + Create Live Class
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-blue-700">Loading...</p>
        ) : liveClasses.length === 0 ? (
          <p className="text-center text-gray-600">No live classes uploaded yet.</p>
        ) : (
          <div className="grid gap-6">
            {liveClasses.map((cls) => (
              <div key={cls._id} className="border border-blue-300 bg-white rounded-xl p-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700">{cls.title}</h2>
                <p className="text-gray-700 mt-2">{cls.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                  📅 <strong>{cls.date}</strong> | 🕒 <strong>{cls.time}</strong>
                </p>
                <a
                  href={cls.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline mt-2"
                >
                  🔗 Join Link
                </a>
                <button
                  onClick={() => handleDelete(cls._id)}
                  disabled={deletingId === cls._id}
                  className={`mt-4 px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition ${
                    deletingId === cls._id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {deletingId === cls._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
