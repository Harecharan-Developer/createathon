import { Link } from 'react-router-dom'

const problems = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: '45%' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', acceptance: '34%' },
]

const leaderboard = [
  { rank: 1, name: 'User1', score: 1500 },
  { rank: 2, name: 'User2', score: 1400 },
]

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problems List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Problems</h2>
          <div className="space-y-2">
            {problems.map(problem => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="block p-4 bg-white rounded shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span>{problem.title}</span>
                  <span className={`badge ${problem.difficulty === 'Easy' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
          <div className="bg-white rounded shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(user => (
                  <tr key={user.rank} className="border-b">
                    <td className="p-3">{user.rank}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.score}</td>
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