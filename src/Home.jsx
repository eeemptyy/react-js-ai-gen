import { Link } from 'react-router-dom'
import { ArrowLeft, Home as HomeIcon, Sparkles } from 'lucide-react'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-web-green-50 to-web-green-100 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="bg-web-green-600 text-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="p-2 hover:bg-web-green-700 rounded-lg transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Home</span>
          </div>
          <div className="w-10"></div> {/* Spacer for center alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-web-green-600 mx-auto mb-4 shadow-lg">
            <Sparkles className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Home Page
          </h1>
          <p className="text-neutral-600">
            This is the Home page with React Router
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-web-green-100 rounded-full flex items-center justify-center">
                <HomeIcon className="h-6 w-6 text-web-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">Home Route</h3>
                <p className="text-sm text-neutral-600">Current page location</p>
              </div>
            </div>
            <div className="inline-block px-3 py-1 bg-web-green-500 text-white rounded-full text-xs font-medium">
              /home
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="font-semibold text-neutral-800 mb-2">Navigation Features</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-web-green-500 rounded-full"></div>
                <span>React Router integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-web-green-500 rounded-full"></div>
                <span>Mobile-first design</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-web-green-500 rounded-full"></div>
                <span>Responsive layout</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="pt-4">
          <Link 
            to="/" 
            className="block w-full bg-web-green-500 hover:bg-web-green-600 text-white rounded-xl p-4 text-center font-medium shadow-sm transition-colors"
          >
            Back to Main Page
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/app"
            className="bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center shadow-sm transition-colors"
          >
            <div className="text-web-green-600 font-medium text-sm">Visit PayWise</div>
          </Link>
          <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-4 text-center">
            <div className="text-neutral-500 font-medium text-sm">More Soon</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home