// createathon-frontend/src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = [
    "Learn Coding",
    "Solve Challenges",
    "Track Progress",
    "Earn Badges"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to Createathon
          <span className="ml-2 border-r-2 border-black animate-blink">|</span>
        </h1>
        <div className="text-4xl mb-8 h-16">
          {slides[slideIndex]}
        </div>
        <Link 
          to="/signup" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}