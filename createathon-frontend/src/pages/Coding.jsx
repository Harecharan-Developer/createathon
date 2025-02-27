// createathon-frontend/src/pages/Coding.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Coding() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState('// Start coding here...')
  const [challenge, setChallenge] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`/api/challenges/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        setChallenge(data)
      } catch (error) {
        console.error(error)
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchChallenge()
  }, [id])

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/challenges/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ code })
      })
      const result = await response.json()
      setResult(result)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
          <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: challenge.description }} />
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Code Editor</h3>
            <Editor
              height="400px"
              defaultLanguage="javascript"
              defaultValue={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
            />
          </div>
          
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Solution
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Submission Results</h2>
          {result ? (
            <div className={`p-4 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                {result.success ? '✅ Success!' : '❌ Try Again'}
              </p>
              <p>Attempts: {result.attempts}</p>
            </div>
          ) : (
            <p className="text-gray-500">Submit your code to see results</p>
          )}
        </div>
      </div>
    </div>
  )
}