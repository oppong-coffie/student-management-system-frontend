import { useState } from "react";
import axios from "axios";

export default function AddLiveClassPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("https://student-management-system-backend-production.up.railway.app/teachers/live-classes", formData);
      alert("Live class created successfully!");
      console.log(response.data);
  
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        link: "",
      });
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Failed to create live class.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-yellow-50 flex items-center justify-center px-4 py-1">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-1 border border-yellow-300">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Add Live Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-1" htmlFor="title">Class Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full border border-blue-300 focus:ring-2 focus:ring-yellow-400 rounded px-4 py-2"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-1" htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="w-full border border-blue-300 focus:ring-2 focus:ring-yellow-400 rounded px-4 py-2"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1" htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                className="w-full border border-blue-300 focus:ring-2 focus:ring-yellow-400 rounded px-4 py-2"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-1" htmlFor="time">Time</label>
              <input
                type="time"
                name="time"
                id="time"
                className="w-full border border-blue-300 focus:ring-2 focus:ring-yellow-400 rounded px-4 py-2"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-800 mb-1" htmlFor="link">Meeting Link</label>
            <input
              type="url"
              name="link"
              id="link"
              placeholder="https://meet.google.com/abc-defg-hij"
              className="w-full border border-blue-300 focus:ring-2 focus:ring-yellow-400 rounded px-4 py-2"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full font-bold py-2 px-4 rounded transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-700 text-yellow-200 hover:bg-blue-800"
  }`}
>
  {loading ? "Creating..." : "Create Live Class"}
</button>

        </form>
      </div>
    </div>
  );
}
