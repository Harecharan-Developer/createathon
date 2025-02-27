// createathon-frontend/src/pages/Profile.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Profile() {
  const { user, logout } = useAuth()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/achievements`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        setAchievements(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Security</h2>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="bg-blue-50 p-4 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <h3 className="font-semibold">{achievement.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Awarded on {new Date(achievement.awarded_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}