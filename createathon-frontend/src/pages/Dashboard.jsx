import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Dashboard() {
  const { user } = useAuth()
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  // Hardcoded leaderboard data
  const leaderboardData = [
    { rank: 1, username: 'Alice', score: 1200 },
    { rank: 2, username: 'Bob', score: 1100 },
    { rank: 3, username: 'Charlie', score: 1000 },
    { rank: 4, username: 'Diana', score: 900 },
    { rank: 5, username: 'Eve', score: 800 },
  ]

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        const data = await response.json()
        setProgress(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgress()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="container mx-auto p-4">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: User Progress */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold">{item.challenge.title}</h3>
                <p>Status: {item.status}</p>
                <p>Attempts: {item.attempts}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
          <table className="w-full bg-white p-4 rounded-lg shadow text-sm">
            <thead className="border-b">
              <tr>
                <th className="py-2 text-left">Rank</th>
                <th className="py-2 text-left">Username</th>
                <th className="py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.rank} className="border-b">
                  <td className="py-2">{entry.rank}</td>
                  <td className="py-2">{entry.username}</td>
                  <td className="py-2">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}