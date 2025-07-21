import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentStudyResources = () => {
  const [materials, setMaterials] = useState([]);
 // START:: Fetch all study resources
 const fetchMaterials = async () => {
  try {
    const res = await axios.get("https://student-management-system-backend-production.up.railway.app/teachers/study-materials");
    console.log("API response:", res.data);
    setMaterials(res.data);
  } catch (err) {
    console.error("Failed to fetch materials:", err);
    setError("Failed to load study materials. Please try again later.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMaterials();
}, []);
// END:: Fetch all study resources

  return (
    <div className="bg-blue-50 py-1 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-5 text-center">
          📚 Study Resources
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="bg-white border border-yellow-300 rounded-xl shadow-md p-5 transition hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-1">
                {mat.title}
              </h2>
              <p className="text-sm text-yellow-700 font-medium mb-2">
                Subject: {mat.subject}
              </p>
              <p className="text-gray-700 text-sm mb-4">{mat.description}</p>

              <div className="w-full flex justify-center">
  <a
    href={mat.fileUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-md shadow transition duration-200"
  >
    View Resource
  </a>
</div>

            </div>
          ))}
        </div>

        {materials.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No study materials available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentStudyResources;
