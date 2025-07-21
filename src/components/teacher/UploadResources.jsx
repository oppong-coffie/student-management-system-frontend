import React, { useState } from "react";

export default function AddStudyMaterial() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected && selected.type.startsWith("video/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!title || !description || !subject || !file) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const response = await fetch("https://student-management-system-backend-production.up.railway.app/teachers/upload-resource", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Study material uploaded successfully!");
        // Reset fields
        setTitle("");
        setDescription("");
        setSubject("");
        setFile(null);
        setPreview(null);
      } else {
        alert("Upload failed: " + result.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred while uploading.", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-1 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Study Material</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded"
          rows="4"
        ></textarea>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Subject</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>

        <div className="border-dashed border-2 p-4 rounded text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.mp4"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4"
          />
          {file && (
            <p className="text-sm mt-2">Selected: {file.name}</p>
          )}
        </div>

        {preview && (
          <video controls className="w-full mt-4 rounded">
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Material
        </button>
      </form>
    </div>
  );
}
