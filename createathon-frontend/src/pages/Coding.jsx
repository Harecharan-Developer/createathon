import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '@uiw/react-textarea-code-editor'

export default function Coding() {
  const { id } = useParams()
  const [code, setCode] = useState('')
  const [problem, setProblem] = useState(null)

  useEffect(() => {
    // Mock problem data
    setProblem({
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers...',
      difficulty: 'Easy',
      starterCode: 'function twoSum(nums, target) {\n  // Your code here\n}'
    })
    setCode('function twoSum(nums, target) {\n  // Your code here\n}')
  }, [id])

  const handleSubmit = () => {
    console.log('Submitted code:', code)
    // Add API call here
  }

  return (
    <div className="container mx-auto p-4">
      {problem && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
            <div className="space-y-4">
              <p>{problem.description}</p>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <CodeEditor
              value={code}
              language="javascript"
              onChange={(e) => setCode(e.target.value)}
              padding={15}
              style={{ fontSize: 14, fontFamily: 'monospace' }}
              className="rounded"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}