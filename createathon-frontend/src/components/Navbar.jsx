import { Link } from 'react-router-dom'

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/problem/1" className="hover:text-gray-300">Problems</Link>
        </div>
        
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            <button onClick={() => setIsLoggedIn(false)} className="hover:text-gray-300">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        )}
      </div>
    </nav>
  )
}