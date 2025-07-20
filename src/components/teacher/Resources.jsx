import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "", subject: "" });

  const fetchMaterials = async () => {
    const res = await axios.get("https://student-management-system-backend-production.up.railway.app/teachers/study-materials");
    console.log("API response:", res.data);
    setMaterials(res.data);
  };  

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this material?")) {
      await axios.delete(`https://student-management-system-backend-production.up.railway.app/teachers/study-materials/${id}`);
      fetchMaterials();
    }
  };

  const startEdit = (material) => {
    setEditingId(material._id);
    setEditData({
      title: material.title,
      description: material.description,
      subject: material.subject,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ title: "", description: "", subject: "" });
  };

  const handleUpdate = async (id) => {
    await axios.put(`https://student-management-system-backend-production.up.railway.app/teachers/study-materials/${id}`, editData);
    setEditingId(null);
    fetchMaterials();
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
<div className="max-w-6xl mx-auto px-6 py-10">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-blue-800">All Study Materials</h2>
    <Link to='../addresource'>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 py-2 rounded-md shadow-md transition"
      >
        + Add Study Material
      </button>
    </Link>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {materials.map((mat) => (
      <div
        key={mat._id}
        className="bg-white border border-yellow-300 rounded-xl p-5 shadow hover:shadow-lg transition"
      >
        {editingId === mat._id ? (
          <div className="space-y-3">
            <input
              className="border border-blue-200 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={editData.title}
              placeholder="Title"
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <textarea
              className="border border-blue-200 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={editData.description}
              placeholder="Description"
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
            <input
              className="border border-blue-200 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={editData.subject}
              placeholder="Subject"
              onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => handleUpdate(mat._id)}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-4 py-1.5 rounded-md font-medium"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-4 py-1.5 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-blue-800 mb-1">{mat.title}</h3>
            <p className="text-sm text-yellow-700 font-medium mb-1">Subject: {mat.subject}</p>
            <p className="text-gray-700 text-sm mb-3">{mat.description}</p>
            <a
              href={mat.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              📄 View File
            </a>
            <div className="mt-4 flex gap-4 text-sm font-medium">
              <button
                onClick={() => startEdit(mat)}
                className="text-yellow-600 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(mat._id)}
                className="text-red-500 hover:underline"
              >
                🗑️ Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</div>

  );
}
