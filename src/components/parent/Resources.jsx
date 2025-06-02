import React, { useState, useEffect } from 'react'

export default function ParentStudyMaterials() {
  const [materials, setMaterials] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")

  // Fetch materials from API
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch('student-management-system-backend-production.up.railway.app/teachers/study-materials')
        const data = await res.json()
        setMaterials(data)
        setFiltered(data)
      } catch (error) {
        console.error("Failed to fetch study materials:", error)
      }
    }

    fetchMaterials()
  }, [])

  // Filter materials when search changes
  useEffect(() => {
    const lower = search.toLowerCase()
    const filteredResults = materials.filter(
      item =>
        item.title.toLowerCase().includes(lower) ||
        item.subject.toLowerCase().includes(lower)
    )
    setFiltered(filteredResults)
  }, [search, materials])

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-9">
          <span className="text-yellow-500">📚</span> Study Materials <span className="text-yellow-400">👨‍👩‍👧</span>
        </h1>
      </div>
  
      {/* Search Bar */}
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="🔍 Search by title or subject..."
          className="w-full pl-4 pr-10 py-3 border border-yellow-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute right-4 top-3 text-yellow-500 text-xl">🔎</span>
      </div>
  
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {filtered.length > 0 ? (
          filtered.map((material) => (
            <div
              key={material.id}
              className="bg-white border border-yellow-300 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-900">📘 {material.title}</h3>
              <p className="text-gray-700"><strong>📖 Subject:</strong> {material.subject}</p>
              <p className="text-gray-700"><strong>📂 Description:</strong> {material.description}</p>
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-1 bg-yellow-400 text-blue-900 font-semibold rounded hover:bg-yellow-500 transition"
              >
                📥 View / Download
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">😞 No study materials found.</p>
        )}
      </div>
    </div>
  </div>
  
  )
}
