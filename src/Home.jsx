import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Home Page
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is the Home page with React Router
        </p>
        <div className="space-x-4 mb-8">
          <span className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg">
            Home Route
          </span>
          <span className="inline-block px-6 py-2 bg-emerald-500 text-white rounded-lg shadow-lg">
            /home
          </span>
        </div>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors"
          >
            Back to Main Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home