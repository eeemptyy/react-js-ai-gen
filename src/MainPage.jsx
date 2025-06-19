import { Link } from 'react-router-dom'
import { Smartphone, Palette, Route, Puzzle, ArrowRight, Zap, Shield, Users } from 'lucide-react'

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-web-green-50 to-web-green-100 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="bg-web-green-600 text-white px-4 py-6 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-web-green-600 font-bold text-2xl mx-auto mb-3">
          P
        </div>
        <h1 className="text-2xl font-bold">PayWise</h1>
        <p className="text-web-green-100 text-sm mt-1">Send Money in Seconds</p>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium mb-4">
            <Zap className="h-3 w-3 mr-1" />
            New P2P Transfer Feature
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight">
            Send Money in Seconds with PayWise
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Fast, simple, and secure peer-to-peer transfers. Split bills, send money to family, or pay friends instantly using just their PayTag.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-8">
          <Link 
            to="/app" 
            className="flex items-center justify-center w-full bg-web-green-500 hover:bg-web-green-600 text-white rounded-xl p-4 font-medium shadow-sm transition-colors"
          >
            Start Transferring
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
          <button className="w-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-xl p-4 font-medium shadow-sm transition-colors">
            Watch Demo
          </button>
        </div>

        {/* Why Choose PayWise Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200 mb-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">Why Choose PayWise?</h3>
          <p className="text-neutral-600 text-sm text-center mb-6">
            Experience the future of peer-to-peer banking with features designed for modern life.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-web-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5 text-web-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 text-sm">Instant Transfers</h4>
                <p className="text-neutral-600 text-xs">Send money in seconds, not minutes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-web-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-web-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 text-sm">Bank-Level Security</h4>
                <p className="text-neutral-600 text-xs">Your money is protected with advanced encryption</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-web-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-web-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-800 text-sm">PayTag System</h4>
                <p className="text-neutral-600 text-xs">Send money using just a username</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 text-center">Built with Modern Tech</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-info text-white rounded-lg p-3 text-center">
              <Smartphone className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs font-medium">React.js</span>
            </div>
            <div className="bg-web-green-500 text-white rounded-lg p-3 text-center">
              <Palette className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs font-medium">Tailwind CSS</span>
            </div>
            <div className="bg-warning text-white rounded-lg p-3 text-center">
              <Route className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs font-medium">React Router</span>
            </div>
            <div className="bg-success text-white rounded-lg p-3 text-center">
              <Puzzle className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs font-medium">shadcn/ui</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-neutral-500">
            Secure • Fast • Reliable
          </p>
        </div>
      </main>
    </div>
  )
}

export default MainPage