// createathon-frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Dashboard() {
  const { user } = useAuth()
  const [progress, setProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/progress', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
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
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progress.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{item.challenge.title}</h3>
            <p>Status: {item.status}</p>
            <p>Attempts: {item.attempts}</p>
          </div>
        ))}
      </div>
    </div>
  )
}