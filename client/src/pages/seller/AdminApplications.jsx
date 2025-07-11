import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/producer/applications');
        setApplications(res.data.filter((app) => app.status === 'pending'));
      } catch (err) {
        console.error('Error fetching applications:', err);
      }
    };
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:4000/api/producer/status/${id}`, { status });
      const updated = await axios.get('http://localhost:4000/api/producer/applications');
      setApplications(updated.data.filter((app) => app.status === 'pending'));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Producer Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Country</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Story</th>
              <th className="p-2 border">Profile URL</th>
              <th className="p-2 border">Cover URL</th>
              <th className="p-2 border">Years</th>
              <th className="p-2 border">Specialties</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 border">{app.name}</td>
                <td className="p-2 border">{app.location}</td>
                <td className="p-2 border">{app.country}</td>
                <td className="p-2 border">{app.email}</td>
                <td className="p-2 border">{app.mobileNumber}</td>
                <td className="p-2 border text-xs">{app.story}</td>
                <td className="p-2 border text-blue-600 underline break-all">{app.profileImageUrl}</td>
                <td className="p-2 border text-blue-600 underline break-all">{app.coverImageUrl}</td>
                <td className="p-2 border">{app.yearsInBusiness}</td>
                <td className="p-2 border">{app.specialties.join(', ')}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => updateStatus(app._id, 'approved')}
                    className="text-green-600 border px-2 py-1 rounded hover:bg-green-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, 'rejected')}
                    className="text-red-600 border px-2 py-1 rounded hover:bg-red-100"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No pending applications available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
