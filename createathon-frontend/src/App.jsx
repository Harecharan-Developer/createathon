// createathon-frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Coding from './pages/Coding'
import Profile from './pages/Profile'
import Problems from './pages/Problem'  // Add this import
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coding/:id" element={<Coding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/problems" element={<Problems />} />  {/* Add this route */}
        </Route>
      </Routes>
    </AuthProvider>
  )
}