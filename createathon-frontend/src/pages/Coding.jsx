import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { supabase } from '../supabase'

export default function Coding() {
  const { id } = useParams()
  const [code, setCode] = useState('')
  const [problem, setProblem] = useState(null)

  useEffect(() => {
    const fetchProblem = async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) {
        setProblem(data)
        setCode(data.starter_code)
      }
    }

    fetchProblem()
  }, [id])

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('submissions')
      .insert([{ problem_id: id, code, status: 'submitted' }])

    if (error) console.error(error)
    else alert('Submission received!')
  }

  return (
    <div className="container mx-auto p-4">
      {problem && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
            <p>{problem.description}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <CodeEditor
              value={code}
              language="javascript"
              onChange={(e) => setCode(e.target.value)}
              padding={15}
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
