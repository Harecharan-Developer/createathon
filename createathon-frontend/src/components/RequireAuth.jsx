// createathon-frontend/src/components/RequireAuth.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth() {
  const { user } = useAuth()
  
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
