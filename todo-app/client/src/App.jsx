import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8002'

function App() {
  const [timestamp, setTimestamp] = useState(() => Date.now())
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, value: 'Clean the car' },
    { id: 2, value: 'Re-Clean the car' },
  ])

  const handleFormSubmit = () => {
    if (!todo.trim()) return
    setTodos([...todos, { id: Date.now(), value: todo.trim() }])
    setTodo('')
  }

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(Date.now()), 600000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">My todos</h1>
        <p className="text-sm text-gray-400 mt-1">
          {todos.length} items remaining
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border border-gray-200 mb-6 aspect-video bg-gray-100">
        <img
          src={`${API_URL}/images?t=${timestamp}`}
          alt="Daily"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Add a new todo item…(max 140 characters)"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFormSubmit()}
          maxLength={140}
          className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleFormSubmit}
          className="h-11 px-5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
        >
          + Add
        </button>
      </div>

      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        Tasks
      </p>

      <ul className="flex flex-col gap-2">
        {todos.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 bg-white"
          >
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
            <span className="text-sm text-gray-800 flex-1">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
