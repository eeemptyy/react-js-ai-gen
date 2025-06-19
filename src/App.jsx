function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Hello World!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to React.js with Tailwind CSS 4
        </p>
        <div className="space-x-4">
          <span className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg">
            React.js
          </span>
          <span className="inline-block px-6 py-2 bg-purple-500 text-white rounded-lg shadow-lg">
            Tailwind CSS 4
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
