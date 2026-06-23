import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002'

function App() {
  const [timestamp, setTimestamp] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now())
    }, 600000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <h1>TodoApp</h1>
      <img src={`${API_URL}/images?t=${timestamp}`} alt="Todo App" />
    </div>
  )
}

export default App
