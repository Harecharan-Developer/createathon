import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth()
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Createathon</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <Link to="/problems" className="text-white">Problems</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">Login</Link>
              <Link to="/signup" className="text-white">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}