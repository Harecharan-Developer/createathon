// createathon-frontend/src/pages/Problems.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'
// Add this state
const [error, setError] = useState('')

// Update return statement
if (error) return (
  <div className="container mx-auto p-4 text-red-600">
    {error}
  </div>
)

export default function Problems() {
  const { user } = useAuth()
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/challenges/') // Add trailing slash
        if (!response.ok) throw new Error('Failed to fetch')
        const { data } = await response.json() // Destructure data
        setChallenges(data)
      } catch (error) {
        console.error(error)
        setError('Failed to load challenges')
      } finally {
        setLoading(false)
      }
    }
    fetchChallenges()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map(challenge => (
          <Link
            key={challenge.id}
            to={`/coding/${challenge.id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{challenge.title}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-gray-600">{challenge.description.slice(0, 100)}...</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600">★ {challenge.points} points</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

