import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Profile() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: user, error } = await supabase.auth.getUser()
      if (error) return

      const { data, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profileError) setUserData(data)
    }

    fetchProfile()
  }, [])

  if (!userData) return <p>Loading...</p>

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{userData.username}</h1>
          <div className="text-gray-600">
            <p>Email: {userData.email}</p>
            <p>Joined: {userData.joined_at}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
