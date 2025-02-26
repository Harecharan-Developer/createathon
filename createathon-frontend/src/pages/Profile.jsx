// src/pages/Profile.jsx
import { useEffect, useState } from 'react'

export default function Profile() {
  const [userData] = useState({
    username: 'Coder123',
    email: 'coder@example.com',
    joined: 'January 2023',
    solved: {
      easy: 27,
      medium: 15,
      hard: 8
    },
    submissions: [
      { problem: 'Two Sum', date: '2024-02-15', status: 'Accepted' },
      { problem: 'Add Two Numbers', date: '2024-02-14', status: 'Accepted' },
      { problem: 'Longest Substring', date: '2024-02-13', status: 'Failed' }
    ]
  })

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{userData.username}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>{userData.email}</span>
            <span>•</span>
            <span>Joined {userData.joined}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">{userData.solved.easy}</div>
            <div className="text-gray-600">Easy Solved</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">{userData.solved.medium}</div>
            <div className="text-gray-600">Medium Solved</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <div className="text-2xl font-bold">{userData.solved.hard}</div>
            <div className="text-gray-600">Hard Solved</div>
          </div>
        </div>

        {/* Submission History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Submissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Problem</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {userData.submissions.map((sub, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{sub.problem}</td>
                    <td className="p-3">{sub.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded ${sub.status === 'Accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}