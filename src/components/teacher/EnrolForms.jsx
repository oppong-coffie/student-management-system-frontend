import React, { useState } from 'react';
import axios from 'axios';

export default function EnrollStudentForm({ classId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    parent: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('parent.')) {
      const parentField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          [parentField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const response = await axios.post(
        `https://student-management-system-backend-production.up.railway.app/teachers/students`,
        formData
      );
      setSuccessMsg('Student enrolled successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        parent: {
          name: '',
          phone: '',
          email: '',
          password: '',
        },
      });
    } catch (error) {
      setErrorMsg('Failed to enroll student. Please try again.');
      console.error('Enrollment error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white border border-yellow-300 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">📥 Enroll New Student</h1>

        {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Parent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="parent.name"
                placeholder="Parent's Name"
                value={formData.parent.name}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="email"
                name="parent.email"
                placeholder="Parent's Email"
                value={formData.parent.email}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                name="parent.phone"
                placeholder="Parent's Phone Number"
                value={formData.parent.phone}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
              <input
                type="password"
                name="parent.password"
                placeholder="Parent's Password"
                value={formData.parent.password}
                onChange={handleChange}
                required
                className="border border-blue-300 rounded px-4 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-700 text-yellow-100 font-semibold py-3 rounded-lg hover:bg-blue-800 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Enrolling...' : 'Enroll Student'}
          </button>
        </form>
      </div>
    </div>
  );
}
