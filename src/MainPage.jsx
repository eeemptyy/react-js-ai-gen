import { Link } from 'react-router-dom'
import { Smartphone, Palette, Route, Puzzle } from 'lucide-react'

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-web-green-50 to-web-green-100 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="bg-web-green-600 text-white px-4 py-6 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-web-green-600 font-bold text-2xl mx-auto mb-3">
          H
        </div>
        <h1 className="text-2xl font-bold">Hello World!</h1>
        <p className="text-web-green-100 text-sm mt-1">Mobile-First React App</p>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="text-center">
          <p className="text-neutral-600 text-sm">
            Welcome to React.js with modern mobile design
          </p>
        </div>

        {/* Technology Stack */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-info text-white rounded-xl p-4 text-center shadow-sm">
            <Smartphone className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">React.js</span>
          </div>
          <div className="bg-web-green-500 text-white rounded-xl p-4 text-center shadow-sm">
            <Palette className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Tailwind CSS</span>
          </div>
          <div className="bg-warning text-white rounded-xl p-4 text-center shadow-sm">
            <Route className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">React Router</span>
          </div>
          <div className="bg-success text-white rounded-xl p-4 text-center shadow-sm">
            <Puzzle className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">shadcn/ui</span>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-3">
          <Link 
            to="/home" 
            className="block w-full bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-800">Home Page</h3>
                <p className="text-sm text-neutral-600">Explore the home section</p>
              </div>
              <div className="w-10 h-10 bg-web-green-100 rounded-full flex items-center justify-center">
                <span className="text-web-green-600">→</span>
              </div>
            </div>
          </Link>

          <Link 
            to="/app" 
            className="block w-full bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl p-4 shadow-sm transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-800">PayWise App</h3>
                <p className="text-sm text-neutral-600">Mobile banking experience</p>
              </div>
              <div className="w-10 h-10 bg-web-green-500 rounded-full flex items-center justify-center">
                <span className="text-white">P</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 pt-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-500">
            Built with modern mobile-first design principles
          </p>
        </div>
      </main>
    </div>
  )
}

export default MainPage