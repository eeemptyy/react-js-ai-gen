import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-web-green-50 to-web-green-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-800 mb-4">
          Hello World!
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Welcome to React.js with Tailwind CSS and React Router
        </p>
        <div className="space-x-4 mb-8">
          <span className="inline-block px-6 py-2 bg-info text-white rounded-lg shadow-lg">
            React.js
          </span>
          <span className="inline-block px-6 py-2 bg-web-green-500 text-white rounded-lg shadow-lg">
            Tailwind CSS
          </span>
          <span className="inline-block px-6 py-2 bg-warning text-white rounded-lg shadow-lg">
            React Router
          </span>
          <span className="inline-block px-6 py-2 bg-success text-white rounded-lg shadow-lg">
            shadcn/ui
          </span>
        </div>
        <div className="space-x-4">
          <Link 
            to="/home" 
            className="inline-block px-6 py-3 bg-web-green-600 text-white rounded-lg shadow-lg hover:bg-web-green-700 transition-colors"
          >
            Go to Home Page
          </Link>
          <Link 
            to="/app" 
            className="inline-block px-6 py-3 bg-web-green-500 text-white rounded-lg shadow-lg hover:bg-web-green-600 transition-colors"
          >
            Go to PayWise App
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage