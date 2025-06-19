import { ArrowLeft, Send, Clock, Settings, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'

function AppPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-800">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Landing</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-web-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-semibold text-neutral-800">PayWise</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back!</h1>
          <p className="text-neutral-600">Ready to send money with PayWise?</p>
        </div>

        {/* Available Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-web-green-600 to-web-green-700 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Available Balance</CardTitle>
            <CardDescription className="text-web-green-100">
              Your current account balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">$2,847.50</div>
            <Button variant="secondary" className="bg-web-green-500 hover:bg-web-green-400 text-white border-0">
              View Account Details
            </Button>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Money Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-neutral-600" />
                <CardTitle>Send Money</CardTitle>
              </div>
              <CardDescription>
                Transfer money instantly using PayTag
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">
                  Recipient PayTag
                </label>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="@username" 
                    className="flex-1"
                  />
                  <Button className="bg-web-green-500 hover:bg-web-green-600">Find</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-neutral-600" />
                <CardTitle>Transaction History</CardTitle>
              </div>
              <CardDescription>
                View your recent transfers and receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No recent transactions</p>
                <p className="text-sm text-neutral-400">Your transaction history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AppPage