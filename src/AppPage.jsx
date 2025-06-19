import { ArrowLeft, Send, Clock, Settings, User, Plus, CreditCard, History } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'

function AppPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20 max-w-md mx-auto">
      {/* Mobile Header */}
      <header className="bg-web-green-600 text-white px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="p-2 hover:bg-web-green-700 rounded-lg transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-web-green-600 font-bold text-sm">
              P
            </div>
            <span className="text-lg font-semibold">PayWise</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-web-green-700">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">Welcome back!</h1>
          <p className="text-neutral-600 text-sm">Ready to send money?</p>
        </div>

        {/* Available Balance Card */}
        <Card className="bg-gradient-to-br from-web-green-500 to-web-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-web-green-100 text-sm mb-2">Available Balance</p>
            <div className="text-3xl font-bold mb-4">$2,847.50</div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button className="flex flex-col items-center p-6 h-auto bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-sm">
            <Send className="h-6 w-6 mb-2" />
            <span className="text-xs font-medium">Send</span>
          </Button>
          <Button className="flex flex-col items-center p-6 h-auto bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-sm">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-xs font-medium">Add Money</span>
          </Button>
          <Button className="flex flex-col items-center p-6 h-auto bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 shadow-sm">
            <CreditCard className="h-6 w-6 mb-2" />
            <span className="text-xs font-medium">Cards</span>
          </Button>
        </div>

        {/* Send Money Section */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-web-green-600" />
              <CardTitle className="text-lg">Send Money</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Transfer money instantly using PayTag
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">
                Recipient PayTag
              </label>
              <div className="space-y-3">
                <Input 
                  placeholder="@username" 
                  className="text-base"
                />
                <Button className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-3">
                  Find Recipient
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-web-green-600" />
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-web-green-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <History className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-medium">No recent transactions</p>
              <p className="text-xs text-neutral-400 mt-1">Your activity will appear here</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-neutral-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button variant="ghost" className="flex flex-col items-center p-3 text-web-green-600">
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <Send className="h-5 w-5 mb-1" />
            <span className="text-xs">Send</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <History className="h-5 w-5 mb-1" />
            <span className="text-xs">History</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-3 text-neutral-500">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default AppPage